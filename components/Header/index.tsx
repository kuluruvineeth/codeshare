"use client";
import { cn } from "@/lib/cn";
import { useSession } from "next-auth/react";
import Home from "./Home";
import Message from "./Message";
import Social from "./Social";
import Help from "./Help";
import Auth from "./Auth";

export default function Header() {
  const { status: sessionStatus } = useSession();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 items-center justify-between px-[18px] font-medium",
        "border-b border-white/20 bg-black shadow-xl shadow-black/40"
      )}
    >
      <Home />
      <Message />

      {sessionStatus !== "loading" && (
        <div className={cn("flex items-center justify-center")}>
          <Social />
          <Help />
          <Auth />
        </div>
      )}
    </header>
  );
}
