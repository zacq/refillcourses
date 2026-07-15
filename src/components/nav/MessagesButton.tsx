import { MessageSquare } from "lucide-react";

export function MessagesButton() {
  return (
    <button className="p-2 text-dim hover:text-brand-secondary transition-colors">
      <MessageSquare size={18} />
    </button>
  );
}
