"use client";

export function CreateLeadButton() {
  return (
    <button 
      onClick={() => {
        const event = new CustomEvent('open-chatbot', { 
          detail: 'I want to create a new lead. Help me create one.' 
        });
        window.dispatchEvent(event);
      }}
      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
    >
      Create Lead
    </button>
  );
}
