import { Bell } from "lucide-react";

interface NotificationBellProps {
  count?: number;
}

export function NotificationBell({ count = 0 }: NotificationBellProps) {
  return (
    <button className="relative p-2 text-white/50 hover:text-brand-secondary transition-colors">
      <Bell size={18} />
      {count > 0 && (
        <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center leading-none">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
