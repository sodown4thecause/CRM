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
    <div className="min-h-screen" style={{ background: '#0f172a' }}>
      {/* Header */}
      <header className="border-b sticky top-0 z-50" style={{ 
        borderColor: '#334155', 
        background: 'rgba(15, 23, 42, 0.8)', 
        backdropFilter: 'blur(12px)' 
      }}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#f59e0b' }}>
              <Database className="h-6 w-6" style={{ color: '#000' }} />
            </div>
            <span className="text-2xl font-bold" style={{ color: '#fff' }}>AI CRM</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="font-medium transition-colors"
              style={{ color: '#94a3b8' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="px-6 py-2.5 rounded-lg font-semibold shadow-lg transition-opacity hover:opacity-90"
              style={{ background: '#f59e0b', color: '#000' }}
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
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 border" style={{ 
              background: 'rgba(245, 158, 11, 0.1)', 
              borderColor: 'rgba(245, 158, 11, 0.3)' 
            }}>
              <Sparkles className="h-4 w-4" style={{ color: '#fbbf24' }} />
              <span className="text-sm font-medium" style={{ color: '#fbbf24' }}>AI-Powered Customer Management</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight" style={{ color: '#fff' }}>
              Manage Customers with{" "}
              <span style={{ color: '#f59e0b' }}>AI Intelligence</span>
            </h1>
            
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: '#cbd5e1' }}>
              Transform your customer relationships with an intelligent CRM powered by cutting-edge AI. 
              Search, create, and manage contacts using natural language—no complex interfaces needed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg shadow-2xl transition-all hover:scale-105 group"
                style={{ background: '#f59e0b', color: '#000' }}
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#features" 
                className="inline-flex items-center justify-center gap-2 border-2 px-8 py-4 rounded-lg font-semibold text-lg transition-colors hover:bg-opacity-10"
                style={{ borderColor: '#475569', color: '#fff', background: '#1e293b' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#334155'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
              >
                Learn More
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8 pt-8 border-t" style={{ borderColor: '#334155' }}>
              <div>
                <div className="text-3xl font-bold" style={{ color: '#f59e0b' }}>10K+</div>
                <div className="text-sm" style={{ color: '#94a3b8' }}>Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: '#f59e0b' }}>500K+</div>
                <div className="text-sm" style={{ color: '#94a3b8' }}>Contacts Managed</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: '#f59e0b' }}>99.9%</div>
                <div className="text-sm" style={{ color: '#94a3b8' }}>Uptime</div>
              </div>
            </div>
          </div>

          {/* AI Chat Demo */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl blur-3xl" style={{ background: 'rgba(245, 158, 11, 0.15)' }}></div>
            <div className="relative border rounded-2xl shadow-2xl overflow-hidden" style={{ background: '#1e293b', borderColor: '#334155' }}>
              {/* Window Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b" style={{ background: 'rgba(51, 65, 81, 0.3)', borderColor: '#334155' }}>
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5" style={{ color: '#f59e0b' }} />
                  <span className="font-semibold" style={{ color: '#fff' }}>AI Assistant</span>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
                    Live Demo
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(239, 68, 68, 0.8)' }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(234, 179, 8, 0.8)' }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(34, 197, 94, 0.8)' }}></div>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4" style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
                {chatMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-2">
                      <MessageSquare className="h-12 w-12 mx-auto opacity-50" style={{ color: '#64748b' }} />
                      <p style={{ color: '#64748b' }}>Watch the AI assistant in action...</p>
                    </div>
                  </div>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
                    >
                      <div
                        className="max-w-[85%] rounded-xl px-5 py-3 shadow-md"
                        style={msg.role === "user" 
                          ? { background: '#f59e0b', color: '#000' }
                          : { background: '#334155', color: '#e2e8f0', border: '1px solid #475569' }
                        }
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
      <section id="features" className="container mx-auto px-6 py-20" style={{ background: 'rgba(30, 41, 59, 0.3)' }}>
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold" style={{ color: '#fff' }}>
            Everything You Need
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#94a3b8' }}>
            Powerful features designed to streamline your customer relationship management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: MessageSquare, title: "AI Chat Assistant", description: "Interact with your CRM using natural language. No training required—just ask.", color: "#3b82f6" },
            { icon: Users, title: "Smart Contacts", description: "Organize and manage all your contacts with intelligent categorization and insights.", color: "#a855f7" },
            { icon: TrendingUp, title: "Lead Tracking", description: "Monitor lead status, probability, and close dates with AI-powered predictions.", color: "#22c55e" },
            { icon: Database, title: "Robust Database", description: "Built on PostgreSQL and Drizzle ORM for maximum reliability and performance.", color: "#f97316" },
            { icon: BarChart3, title: "Analytics & Insights", description: "Get real-time insights about your contacts, leads, and business metrics.", color: "#ec4899" },
            { icon: Zap, title: "Automation", description: "Automate repetitive tasks and workflows. Focus on what matters most.", color: "#06b6d4" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group border rounded-xl p-8 transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: '#1e293b', borderColor: '#334155' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#f59e0b88';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: '#334155' }}>
                <feature.icon className="h-7 w-7" style={{ color: feature.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#fff' }}>{feature.title}</h3>
              <p className="leading-relaxed" style={{ color: '#94a3b8' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="border rounded-3xl p-12 lg:p-16 text-center" style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(146, 64, 14, 0.2) 50%, rgba(245, 158, 11, 0.1) 100%)',
          borderColor: 'rgba(245, 158, 11, 0.3)'
        }}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#fff' }}>
            Ready to Transform Your CRM?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto" style={{ color: '#cbd5e1' }}>
            Join thousands of businesses using AI to manage customer relationships more effectively. 
            Start your free trial today—no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-lg font-bold text-lg shadow-2xl transition-opacity hover:opacity-90"
              style={{ background: '#f59e0b', color: '#000' }}
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center gap-2 border-2 px-10 py-5 rounded-lg font-bold text-lg transition-colors"
              style={{ borderColor: '#334155', background: '#1e293b', color: '#fff' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#334155'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: '#334155', background: 'rgba(30, 41, 59, 0.5)' }}>
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#f59e0b' }}>
                <Database className="h-5 w-5" style={{ color: '#000' }} />
              </div>
              <span className="text-lg font-bold" style={{ color: '#fff' }}>AI CRM</span>
            </div>
            <p className="text-center" style={{ color: '#94a3b8' }}>
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
