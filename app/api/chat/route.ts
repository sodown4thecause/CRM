import { createOpenAI } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { eq, ilike, or } from "drizzle-orm";

// Create Vercel AI Gateway client for DeepSeek
const aiGateway = createOpenAI({
  baseURL: process.env.AI_GATEWAY_BASE_URL,
  apiKey: process.env.AI_GATEWAY_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: aiGateway("deepseek/deepseek-v3.2"),
    system: `You are a helpful CRM assistant. You can help users manage their contacts and leads.
    When users ask about contacts, use the searchContacts tool to find them.
    Be concise and helpful in your responses.`,
    messages,
    tools: {
      searchContacts: tool({
        description: "Search for contacts by name, email, or company",
        parameters: z.object({
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
        parameters: z.object({}),
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
                c => new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length,
            };

            return stats;
          } catch (error) {
            console.error("Error getting stats:", error);
            return { total: 0, byStatus: {}, recent: 0, error: "Failed to get stats" };
          }
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
