"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare, Minimize2, Maximize2, Send } from "lucide-react";
import { useState, useEffect } from "react";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    api: "/api/chat",
  });

  // Listen for custom events to trigger chatbot
  useEffect(() => {
    const handleOpenChat = (e: any) => {
      console.log("Chatbot event received:", e.detail);
      setIsOpen(true);
      setIsMinimized(false);
      // Send the message directly
      sendMessage(e.detail);
    };
    
    window.addEventListener('open-chatbot', handleOpenChat);
    
    return () => {
      window.removeEventListener('open-chatbot', handleOpenChat);
    };
  }, [sendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const isLoading = status === "pending" || status === "streaming";

  return (
    <>
      {/* Floating button when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-4 shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Open AI Assistant"
        >
          <MessageSquare className="h-6 w-6 text-primary-foreground" />
        </button>
      )}

      {/* Main chatbot */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 shadow-xl border-border bg-card">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-card-foreground">AI Assistant</h3>
            </div>
            <div className="flex items-center gap-1">
              {error && (
                <span className="text-xs text-destructive">Connection Error</span>
              )}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="rounded p-1 hover:bg-muted transition-colors"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Minimize2 className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center text-sm text-muted-foreground">
                      <p className="mb-4">
                        Hi! I'm your AI assistant with full access to your CRM.
                      </p>
                      <p className="text-xs opacity-70 mb-4">
                        <strong>I can help you:</strong><br />
                        📊 View & search contacts<br />
                        ➕ Create new contacts<br />
                        ✏️ Update records<br />
                        📈 Get statistics
                      </p>
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs font-medium mb-2">Quick Actions:</p>
                        <button
                          onClick={() => {
                            const msg = "Create a new contact";
                            sendMessage(msg);
                          }}
                          className="w-full text-left text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded-md transition-colors mb-2"
                        >
                          ➕ Add a contact
                        </button>
                        <button
                          onClick={() => {
                            const msg = "Show me all contacts";
                            sendMessage(msg);
                          }}
                          className="w-full text-left text-xs bg-muted hover:bg-muted/70 px-3 py-2 rounded-md transition-colors mb-2"
                        >
                          📊 View all contacts
                        </button>
                        <button
                          onClick={() => {
                            const msg = "Get contact statistics";
                            sendMessage(msg);
                          }}
                          className="w-full text-left text-xs bg-muted hover:bg-muted/70 px-3 py-2 rounded-md transition-colors"
                        >
                          📈 Get statistics
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg bg-muted px-3 py-2">
                      <p className="text-sm text-muted-foreground">
                        Thinking...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about contacts, create leads..."
                    disabled={isLoading}
                    className="flex-1 bg-background"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </>
          )}
        </Card>
      )}
    </>
  );
}
