import { MessageSquare } from "lucide-react";

export function MessagesButton() {
  return (
    <button className="p-2 text-white/50 hover:text-cyan-300 transition-colors">
      <MessageSquare size={18} />
    </button>
  );
}
