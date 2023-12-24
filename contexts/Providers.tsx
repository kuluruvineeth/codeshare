"use client";

import { SessionProvider } from "next-auth/react";
import * as ToolTipPrimitive from "@radix-ui/react-tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToolTipPrimitive.Provider delayDuration={0}>
        {children}
      </ToolTipPrimitive.Provider>
    </SessionProvider>
  );
}
