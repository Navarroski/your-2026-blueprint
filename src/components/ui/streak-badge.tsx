import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface StreakBadgeProps {
  count: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-1.5",
  lg: "text-base px-4 py-2",
};

export function StreakBadge({ count, size = "md", className }: StreakBadgeProps) {
  const isActive = count > 0;
  
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium transition-all",
        isActive
          ? "bg-primary/20 text-primary streak-glow"
          : "bg-muted text-muted-foreground",
        sizes[size],
        className
      )}
    >
      <Flame
        className={cn(
          "h-4 w-4",
          isActive && "animate-pulse text-primary"
        )}
      />
      <span>{count}</span>
      <span className="hidden sm:inline">
        {count === 1 ? "día" : "días"}
      </span>
    </div>
  );
}
