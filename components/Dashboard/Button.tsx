"use client";
import { cn } from "@/lib/cn";
import { fetcher } from "@/lib/fetcher";
import { Check, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import useSWRMutation from "swr/mutation";
import Loader from "../ui/Loader";

type ButtonType = "DEFAULT" | "SUCCESS" | "ERROR";

interface Button {
  id: string;
  text: string;
  icon: JSX.Element;
  additionClasses: string;
}

const buttons: Record<ButtonType, Button> = {
  DEFAULT: {
    id: "default",
    text: "New",
    icon: <Plus size={16} aria-hidden="true" />,
    additionClasses:
      "border-white/20 bg-black hover:bg-white/20 hover:text-almost-white disabled:brightness-50",
  },
  SUCCESS: {
    id: "success",
    text: "Success",
    icon: <Check size={16} aria-hidden="true" />,
    additionClasses: "border-green-400/20 text-green-400 bg-green-500/20",
  },
  ERROR: {
    id: "error",
    text: "Error",
    icon: <X size={16} aria-hidden="true" />,
    additionClasses: "border-red-400/20 text-red-400 bg-red-500/20",
  },
};

export default function Button({ snippetCount }: { snippetCount: number }) {
  const [buttonState, setButtonState] = useState<ButtonType>("DEFAULT");

  const router = useRouter();

  const { trigger: createSnippet, isMutating: createLoading } = useSWRMutation(
    "/api/snippets",
    (url) =>
      fetcher(url, {
        method: "POST",
        body: JSON.stringify({ snippetCount }),
      })
  );

  const handleAction = async () => {
    try {
      const { id } = await createSnippet();
      setButtonState("SUCCESS");

      router.push(`/${id}`);
    } catch (e) {
      console.log(e);
      setButtonState("ERROR");
    } finally {
      const timer = setTimeout(() => setButtonState("DEFAULT"), 2500);

      return () => clearTimeout(timer);
    }
  };

  useHotkeys(
    "n",
    () => {
      if (!createLoading && buttons[buttonState].id === "default") {
        handleAction();
      }
    },
    {
      preventDefault: true,
    }
  );

  return (
    <button
      type="button"
      onClick={() => handleAction()}
      disabled={
        snippetCount >= 10 ||
        createLoading ||
        buttons[buttonState].id !== "default"
      }
      className={cn(
        "flex w-auto items-center gap-4 rounded-lg p-1 font-medium",
        "select-none outline-none",
        "border",
        "transition-all duration-100 ease-in-out",
        buttons[buttonState].additionClasses,
        "focus:border-amlost-white focus:text-amlost-white",
        "disabled:cursor-not-allowed"
      )}
    >
      <div className={cn("flex items-center gap-2 pl-0.5")}>
        {createLoading ? <Loader /> : buttons[buttonState].icon}
        {buttons[buttonState].text}
      </div>
    </button>
  );
}
