import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger" | "mpesa";
  size?: "sm" | "md";
}

const variants = {
  primary: "bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-[0_8px_30px_rgba(139,92,246,.35)] hover:-translate-y-0.5 hover:shadow-[0_12px_38px_rgba(236,72,153,.4)]",
  ghost:   "glass text-cream hover:border-brand-secondary/50",
  danger:  "bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25",
  mpesa:   "bg-mpesa text-[#04250F] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,200,83,.35)]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
};

export function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    />
  );
}
