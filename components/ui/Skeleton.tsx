import { cn } from "@/lib/cn";

export default function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "rounded-md",
        "bg-amlost-white/10",
        "animate-pulse",
        className
      )}
    />
  );
}
