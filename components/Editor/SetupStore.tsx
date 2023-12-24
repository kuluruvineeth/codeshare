"use client";
import { useStore } from "@/lib/store";
import type { Snippet } from "@prisma/client";
import { useRef } from "react";

export default function SetupStore({ snippet }: { snippet: Snippet }) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useStore.getState().setAppState(snippet);

    initialized.current = true;
  }

  return null;
}
