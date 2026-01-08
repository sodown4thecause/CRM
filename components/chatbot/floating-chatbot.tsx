"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare, X, Minimize2, Maximize2, Send } from "lucide-react";
import { useState } from "react";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-4 shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="h-6 w-6 text-primary-foreground" />
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-96 shadow-xl border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-card-foreground">AI Assistant</h3>
        </div>
        <div className="flex items-center gap-1">
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
          <button
            onClick={() => setIsOpen(false)}
            className="rounded p-1 hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-sm text-muted-foreground">
                  Hi! I'm your AI assistant. I can help you search contacts,
                  get stats, and manage your CRM.
                </p>
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
                    <p className="text-sm whitespace-pre-wrap">
                      {message.parts.map((part, index) =>
                        part.type === "text" ? part.text : null
                      ).join("")}
                    </p>
                  </div>
                </div>
              ))
            )}
            {(status === "submitted" || status === "streaming") && (
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
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                sendMessage({ text: input });
                setInput("");
              }
            }} 
            className="border-t border-border p-4"
          >
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about contacts, stats..."
                disabled={status !== "ready"}
                className="flex-1 bg-background"
              />
              <Button
                type="submit"
                size="icon"
                disabled={status !== "ready" || !input.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </>
      )}
    </Card>
  );
}
