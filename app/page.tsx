"use client";

import Link from "next/link";
import { MessageSquare, Users, TrendingUp, Sparkles, Database, Bot, ArrowRight, Zap, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; text: string }>>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const demoMessages = [
    { role: "user", text: "Show me all prospects in the system" },
    { role: "assistant", text: "I found 12 prospects. Here are the top 5:\n\n1. Sarah Johnson - Acme Corp\n2. Mike Chen - TechStart Inc\n3. Emily Davis - Global Solutions\n4. Robert Martinez - Innovation Labs\n5. Jessica Taylor - Future Tech" },
    { role: "user", text: "Create a new contact: John Doe, email: john@example.com" },
    { role: "assistant", text: "✅ Successfully created contact!\n\nName: John Doe\nEmail: john@example.com\nStatus: Lead\nContact ID: #42\nCreated: Just now" },
  ];

  useEffect(() => {
    if (currentMessageIndex < demoMessages.length) {
      const timer = setTimeout(() => {
        setChatMessages((prev) => [...prev, demoMessages[currentMessageIndex]]);
        setCurrentMessageIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setChatMessages([]);
        setCurrentMessageIndex(0);
      }, 4000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentMessageIndex]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm sticky top-0 z-50 bg-card/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Database className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">AI CRM</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:opacity-90 transition-all font-semibold shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-accent/50 border border-accent-foreground/20 rounded-full px-4 py-2">
              <Sparkles className="h-4 w-4 text-accent-foreground" />
              <span className="text-sm font-medium text-accent-foreground">AI-Powered Customer Management</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              Manage Customers with{" "}
              <span className="text-primary">AI Intelligence</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Transform your customer relationships with an intelligent CRM powered by cutting-edge AI. 
              Search, create, and manage contacts using natural language—no complex interfaces needed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:opacity-90 transition-all font-semibold text-lg shadow-xl group"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#features" 
                className="inline-flex items-center justify-center gap-2 border-2 border-border bg-card text-foreground px-8 py-4 rounded-lg hover:bg-accent/20 transition-colors font-semibold text-lg"
              >
                Learn More
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500K+</div>
                <div className="text-sm text-muted-foreground">Contacts Managed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* AI Chat Demo */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-muted/30 border-b border-border">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-primary" />
                  <span className="font-semibold">AI Assistant</span>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Live Demo</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-background/50">
                {chatMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-2">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
                      <p className="text-muted-foreground">Watch the AI assistant in action...</p>
                    </div>
                  </div>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-5 py-3 shadow-md ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground border border-border"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{msg.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20 bg-muted/30">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed to streamline your customer relationship management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards */}
          {[
            {
              icon: MessageSquare,
              title: "AI Chat Assistant",
              description: "Interact with your CRM using natural language. No training required—just ask.",
              color: "text-blue-500"
            },
            {
              icon: Users,
              title: "Smart Contacts",
              description: "Organize and manage all your contacts with intelligent categorization and insights.",
              color: "text-purple-500"
            },
            {
              icon: TrendingUp,
              title: "Lead Tracking",
              description: "Monitor lead status, probability, and close dates with AI-powered predictions.",
              color: "text-green-500"
            },
            {
              icon: Database,
              title: "Robust Database",
              description: "Built on PostgreSQL and Drizzle ORM for maximum reliability and performance.",
              color: "text-orange-500"
            },
            {
              icon: BarChart3,
              title: "Analytics & Insights",
              description: "Get real-time insights about your contacts, leads, and business metrics.",
              color: "text-pink-500"
            },
            {
              icon: Zap,
              title: "Automation",
              description: "Automate repetitive tasks and workflows. Focus on what matters most.",
              color: "text-cyan-500"
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group bg-card border border-border rounded-xl p-8 hover:shadow-xl hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div className={`w-14 h-14 bg-muted rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 border border-primary/20 rounded-3xl p-12 lg:p-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your CRM?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join thousands of businesses using AI to manage customer relationships more effectively. 
            Start your free trial today—no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-10 py-5 rounded-lg hover:opacity-90 transition-all font-bold text-lg shadow-2xl"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center gap-2 border-2 border-border bg-card text-foreground px-10 py-5 rounded-lg hover:bg-accent/20 transition-colors font-bold text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Database className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">AI CRM</span>
            </div>
            <p className="text-muted-foreground text-center">
              © 2026 AI CRM. Powered by AI SDK 6, Next.js, and Vercel.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
