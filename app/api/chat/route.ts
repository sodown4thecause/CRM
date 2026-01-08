import { createOpenAI } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import { db } from "@/db";
import { contacts, leads } from "@/db/schema";
import { eq, ilike, or, desc } from "drizzle-orm";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Create Vercel AI Gateway client
  const aiGateway = createOpenAI({
    baseURL: process.env.AI_GATEWAY_BASE_URL,
    apiKey: process.env.AI_GATEWAY_API_KEY,
  });

  const result = streamText({
    model: aiGateway("deepseek/deepseek-v3.2"),
    system: `You are an intelligent CRM assistant with full access to the customer relationship management database.
    
You can help users:
- Search, view, create, update, and delete contacts
- Manage leads and track their status
- Get statistics and insights about the CRM data
- Perform complex queries across contacts and leads

Always be helpful, concise, and accurate. When making changes to the database, confirm the action was successful.
Use the appropriate tools to access and modify the CRM data.`,
    messages,
    tools: {
      searchContacts: tool({
        description: "Search for contacts by name, email, or company",
        inputSchema: z.object({
          query: z.string().describe("The search query to find contacts"),
        }),
        execute: async ({ query }) => {
          try {
            const searchResults = await db
              .select()
              .from(contacts)
              .where(
                or(
                  ilike(contacts.name, `%${query}%`),
                  ilike(contacts.email, `%${query}%`),
                  ilike(contacts.company, `%${query}%`)
                )
              )
              .limit(5);

            return {
              contacts: searchResults.map((c) => ({
                id: c.id,
                name: c.name,
                email: c.email,
                company: c.company,
                status: c.status,
                phone: c.phone,
              })),
              count: searchResults.length,
            };
          } catch (error) {
            console.error("Error searching contacts:", error);
            return { contacts: [], count: 0, error: "Failed to search contacts" };
          }
        },
      }),
      getContactStats: tool({
        description: "Get statistics about contacts in the CRM",
        inputSchema: z.object({}),
        execute: async () => {
          try {
            const allContacts = await db.select().from(contacts);
            
            const stats = {
              total: allContacts.length,
              byStatus: allContacts.reduce((acc, c) => {
                acc[c.status] = (acc[c.status] || 0) + 1;
                return acc;
              }, {} as Record<string, number>),
              recent: allContacts.filter(
                c => c.createdAt && new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length,
            };

            return stats;
          } catch (error) {
            console.error("Error getting stats:", error);
            return { total: 0, byStatus: {}, recent: 0, error: "Failed to get stats" };
          }
        },
      }),
      getContactById: tool({
        description: "Get detailed information about a specific contact by ID",
        inputSchema: z.object({
          id: z.number().describe("The ID of the contact to retrieve"),
        }),
        execute: async ({ id }) => {
          try {
            const contact = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
            if (contact.length === 0) {
              return { error: `Contact with ID ${id} not found` };
            }
            return { contact: contact[0] };
          } catch (error) {
            console.error("Error getting contact:", error);
            return { error: "Failed to get contact" };
          }
        },
      }),
      createContact: tool({
        description: "Create a new contact in the CRM",
        inputSchema: z.object({
          name: z.string().describe("Full name of the contact"),
          email: z.string().email().describe("Email address"),
          phone: z.string().optional().describe("Phone number"),
          company: z.string().optional().describe("Company name"),
          status: z.enum(["lead", "prospect", "customer", "inactive"]).default("lead").describe("Contact status"),
          value: z.string().optional().describe("Potential value (e.g., '1000.00')"),
          notes: z.string().optional().describe("Additional notes"),
        }),
        execute: async ({ name, email, phone, company, status, value, notes }) => {
          try {
            const newContact = await db.insert(contacts).values({
              name,
              email,
              phone: phone || null,
              company: company || null,
              status,
              value: value || null,
              notes: notes || null,
            }).returning();
            
            return { 
              success: true, 
              contact: newContact[0],
              message: `Successfully created contact: ${name}` 
            };
          } catch (error: any) {
            console.error("Error creating contact:", error);
            if (error.code === '23505') {
              return { success: false, error: "A contact with this email already exists" };
            }
            return { success: false, error: "Failed to create contact" };
          }
        },
      }),
      updateContact: tool({
        description: "Update an existing contact's information",
        inputSchema: z.object({
          id: z.number().describe(" ID of the contact to update"),
          name: z.string().optional().describe("Updated name"),
          email: z.string().email().optional().describe("Updated email"),
          phone: z.string().optional().describe("Updated phone number"),
          company: z.string().optional().describe("Updated company name"),
          status: z.enum(["lead", "prospect", "customer", "inactive"]).optional().describe("Updated status"),
          value: z.string().optional().describe("Updated potential value"),
          notes: z.string().optional().describe("Updated notes"),
        }),
        execute: async ({ id, ...updates }) => {
          try {
            const updateData: any = {};
            Object.entries(updates).forEach(([key, value]) => {
              if (value !== undefined) {
                updateData[key] = value;
              }
            });

            if (Object.keys(updateData).length === 0) {
              return { success: false, error: "No fields to update" };
            }

            updateData.updatedAt = new Date();

            const updated = await db.update(contacts)
              .set(updateData)
              .where(eq(contacts.id, id))
              .returning();

            if (updated.length === 0) {
              return { success: false, error: `Contact with ID ${id} not found` };
            }

            return { 
              success: true, 
              contact: updated[0],
              message: `Successfully updated contact ID ${id}` 
            };
          } catch (error: any) {
            console.error("Error updating contact:", error);
            if (error.code === '23505') {
              return { success: false, error: "Email already exists for another contact" };
            }
            return { success: false, error: "Failed to update contact" };
          }
        },
      }),
      deleteContact: tool({
        description: "Delete a contact from the CRM",
        inputSchema: z.object({
          id: z.number().describe("The ID of the contact to delete"),
        }),
        execute: async ({ id }) => {
          try {
            const deleted = await db.delete(contacts)
              .where(eq(contacts.id, id))
              .returning();

            if (deleted.length === 0) {
              return { success: false, error: `Contact with ID ${id} not found` };
            }

            return { 
              success: true, 
              message: `Successfully deleted contact: ${deleted[0].name}` 
            };
          } catch (error) {
            console.error("Error deleting contact:", error);
            return { success: false, error: "Failed to delete contact" };
          }
        },
      }),
      listAllContacts: tool({
        description: "List all contacts in the CRM with optional filtering",
        inputSchema: z.object({
          status: z.enum(["lead", "prospect", "customer", "inactive"]).optional().describe("Filter by status"),
          limit: z.number().default(20).describe("Maximum number of contacts to return"),
        }),
        execute: async ({ status, limit }) => {
          try {
            let query = db.select().from(contacts);
            
            if (status) {
              query = query.where(eq(contacts.status, status)) as any;
            }

            const results = await query.orderBy(desc(contacts.createdAt)).limit(limit);

            return {
              contacts: results,
              count: results.length,
            };
          } catch (error) {
            console.error("Error listing contacts:", error);
            return { contacts: [], count: 0, error: "Failed to list contacts" };
          }
        },
      }),
      getLeadStats: tool({
        description: "Get statistics about leads in the CRM",
        inputSchema: z.object({}),
        execute: async () => {
          try {
            const allLeads = await db.select().from(leads);
            
            const stats = {
              total: allLeads.length,
              byStatus: allLeads.reduce((acc, l) => {
                acc[l.status] = (acc[l.status] || 0) + 1;
                return acc;
              }, {} as Record<string, number>),
            };

            return stats;
          } catch (error) {
            console.error("Error getting lead stats:", error);
            return { total: 0, byStatus: {}, error: "Failed to get lead stats" };
          }
        },
      }),
      createLead: tool({
        description: "Create a new lead for a contact",
        inputSchema: z.object({
          contactId: z.number().describe("The ID of the contact this lead is for"),
          source: z.string().optional().describe("Where the lead came from"),
          status: z.string().describe("Current status of the lead"),
          probability: z.string().optional().describe("Probability of closing (0-100)"),
        }),
        execute: async ({ contactId, source, status, probability }) => {
          try {
            const newLead = await db.insert(leads).values({
              contactId,
              source: source || null,
              status,
              probability: probability || null,
            }).returning();
            
            return { 
              success: true, 
              lead: newLead[0],
              message: `Successfully created lead for contact ID ${contactId}` 
            };
          } catch (error) {
            console.error("Error creating lead:", error);
            return { success: false, error: "Failed to create lead" };
          }
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
