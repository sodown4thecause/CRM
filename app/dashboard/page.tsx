export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome to CRM</h1>
        <p className="text-muted-foreground">
          Manage your contacts and leads with AI assistance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Contacts
          </h3>
          <p className="mt-2 text-3xl font-bold text-card-foreground">0</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Active Leads
          </h3>
          <p className="mt-2 text-3xl font-bold text-card-foreground">0</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Conversion Rate
          </h3>
          <p className="mt-2 text-3xl font-bold text-card-foreground">0%</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-card-foreground">
          Quick Actions
        </h2>
        <div className="mt-4 flex gap-4">
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Add Contact
          </button>
          <button className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">
            Import Contacts
          </button>
        </div>
      </div>
    </div>
  );
}
