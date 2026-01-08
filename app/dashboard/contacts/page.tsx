import { db } from "@/db";
import { contacts } from "@/db/schema";
import { desc } from "drizzle-orm";

async function getContacts() {
  try {
    const allContacts = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt));
    return allContacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}

export default async function ContactsPage() {
  const contactsList = await getContacts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground">
            Manage your customer contacts
          </p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Add Contact
        </button>
      </div>

      {/* Contacts Table */}
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contactsList.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-muted-foreground"
                  >
                    No contacts found. Add your first contact to get started.
                  </td>
                </tr>
              ) : (
                contactsList.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {contact.company || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary-foreground">
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
