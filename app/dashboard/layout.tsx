import Link from "next/link";
import { FloatingChatbot } from "@/components/chatbot/floating-chatbot";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-sidebar-border p-6">
            <h1 className="text-xl font-bold text-sidebar-foreground">CRM</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <Link
              href="/dashboard"
              className="block rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/contacts"
              className="block rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              Contacts
            </Link>
            <Link
              href="/dashboard/leads"
              className="block rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              Leads
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-card-foreground">
              Dashboard
            </h2>
            <div className="flex items-center gap-4">
              <button className="text-sm text-muted-foreground hover:text-foreground">
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>

      {/* AI Chatbot */}
      <FloatingChatbot />
    </div>
  );
}
