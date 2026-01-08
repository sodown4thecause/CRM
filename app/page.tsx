"use client";

import Link from "next/link";
import { MessageSquare, Users, TrendingUp, Sparkles, Database, Bot, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; text: string }>>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const demoMessages = [
    { role: "user", text: "Show me all prospects in the system" },
    { role: "assistant", text: "I found 12 prospects. Here are the top 5:\n\n1. Sarah Johnson - Acme Corp\n2. Mike Chen - TechStart Inc\n3. Emily Davis - Global Solutions" },
    { role: "user", text: "Create a new contact named John Doe with email john@example.com" },
    { role: "assistant", text: "✓ Successfully created contact: John Doe\nEmail: john@example.com\nStatus: Lead\nID: 42" },
  ];

  useEffect(() => {
    if (currentMessageIndex < demoMessages.length) {
      const timer = setTimeout(() => {
        setChatMessages((prev) => [...prev, demoMessages[currentMessageIndex]]);
        setCurrentMessageIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Reset after showing all messages
      const resetTimer = setTimeout(() => {
        setChatMessages([]);
        setCurrentMessageIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentMessageIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">AI CRM</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-300">AI-Powered CRM</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Manage Your Customers with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                AI Intelligence
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Transform your customer relationships with an intelligent CRM powered by AI. 
              Search, create, and manage contacts with natural language commands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all hover:scale-105 font-semibold text-lg"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center gap-2 border border-slate-600 text-white px-8 py-4 rounded-lg hover:bg-slate-800 transition-colors font-semibold text-lg"
              >
                Watch Demo
              </Link>
            </div>
          </div>

          {/* AI Chat Demo */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-700">
                <Bot className="h-6 w-6 text-blue-400" />
                <span className="font-semibold text-white">AI Assistant</span>
                <div className="ml-auto flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="h-96 overflow-y-auto space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-400 text-center">
                      Watch the AI assistant in action...
                    </p>
                  </div>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-700 text-slate-100"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
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
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need to Manage Customers
          </h2>
          <p className="text-xl text-slate-400">
            Powerful features designed to streamline your workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all hover:scale-105">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">AI Chat Assistant</h3>
            <p className="text-slate-400">
              Interact with your CRM using natural language. Search, create, and update contacts 
              just by chatting with the AI.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all hover:scale-105">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Contact Management</h3>
            <p className="text-slate-400">
              Organize and manage all your contacts in one place. Track leads, prospects, 
              and customers with detailed profiles.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all hover:scale-105">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Lead Tracking</h3>
            <p className="text-slate-400">
              Monitor lead status, probability, and expected close dates. Never miss 
              an opportunity with intelligent tracking.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all hover:scale-105">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Smart Database</h3>
            <p className="text-slate-400">
              Powered by PostgreSQL and Drizzle ORM. Fast, reliable, and scalable 
              database infrastructure.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all hover:scale-105">
            <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">AI Insights</h3>
            <p className="text-slate-400">
              Get intelligent insights about your contacts and leads. AI-powered 
              statistics and recommendations.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all hover:scale-105">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
              <Bot className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Automation</h3>
            <p className="text-slate-400">
              Automate repetitive tasks with AI. Focus on building relationships 
              while AI handles the rest.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your CRM?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using AI to manage their customer relationships more effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all hover:scale-105 font-semibold text-lg"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-6 w-6 text-blue-500" />
              <span className="text-lg font-semibold text-white">AI CRM</span>
            </div>
            <p className="text-slate-400">
              © 2026 AI CRM. Powered by AI SDK 6 and Vercel.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
