import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md";
}

const variants = {
  primary: "bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90",
  ghost:   "bg-white/5 text-white/80 hover:bg-white/10 border border-white/10",
  danger:  "bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
};

export function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    />
  );
}
