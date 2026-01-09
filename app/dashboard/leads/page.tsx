import { db } from "@/db";
import { leads, contacts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { CreateLeadButton } from "./client-button";

async function getLeads() {
  try {
    const allLeads = await db
      .select({
        id: leads.id,
        status: leads.status,
        source: leads.source,
        probability: leads.probability,
        expectedCloseDate: leads.expectedCloseDate,
        createdAt: leads.createdAt,
        contactId: leads.contactId,
        contactName: contacts.name,
        contactEmail: contacts.email,
        contactCompany: contacts.company,
      })
      .from(leads)
      .leftJoin(contacts, eq(leads.contactId, contacts.id))
      .orderBy(desc(leads.createdAt));
    return allLeads;
  } catch (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
}

export default async function LeadsPage() {
  const leadsList = await getLeads();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground">
            Track and manage your sales pipeline
          </p>
        </div>
        <CreateLeadButton />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Leads
          </h3>
          <p className="mt-2 text-3xl font-bold text-card-foreground">{leadsList.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            New
          </h3>
          <p className="mt-2 text-3xl font-bold text-card-foreground">
            {leadsList.filter(l => l.status === 'new').length}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            In Progress
          </h3>
          <p className="mt-2 text-3xl font-bold text-card-foreground">
            {leadsList.filter(l => l.status === 'in_progress').length}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Qualified
          </h3>
          <p className="mt-2 text-3xl font-bold text-card-foreground">
            {leadsList.filter(l => l.status === 'qualified').length}
          </p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Probability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Expected Close
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leadsList.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-muted-foreground"
                  >
                    No leads found. Ask the AI assistant to create your first lead!
                  </td>
                </tr>
              ) : (
                leadsList.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {lead.contactName || `Contact #${lead.contactId}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {lead.contactEmail || ''}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {lead.contactCompany || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {lead.source || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        lead.status === 'qualified' ? 'bg-green-100 text-green-800' :
                        lead.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {lead.probability ? `${lead.probability}%` : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {lead.expectedCloseDate 
                        ? new Date(lead.expectedCloseDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString()}
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
