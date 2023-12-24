import { memo, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/cn";
import Loader from "../ui/Loader";
import { Edit3, Trash } from "lucide-react";

export default memo(function RenameDialog({
  id,
  title,
  action,
  isLoading,
}: {
  id: string;
  title: string | null;
  action: ({ id, title }: { id: string; title: string }) => void;
  isLoading: boolean;
}) {
  const [localInputValue, setLocalInputValue] = useState(title ?? "");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (localInputValue !== title) {
          action({ id, title: localInputValue });
        }
      }}
    >
      <input
        type="text"
        value={localInputValue}
        placeholder="Untitled"
        spellCheck={false}
        autoComplete="off"
        maxLength={70}
        onChange={(e) => setLocalInputValue(e.target.value)}
        className={cn(
          "w-full truncate rounded-md p-1 text-lg",
          "outline-none",
          "bg-transparent text-amlost-white",
          "transition-all duration-100 ease-in-out",
          "placeholder:text-almost-white/50",
          "focus:placeholder:text-transparent",
          !localInputValue && "italic"
        )}
      />
      {localInputValue && (
        <DialogPrimitive.Close asChild>
          <button
            type="button"
            onClick={() => action({ id, title: localInputValue })}
            disabled={localInputValue === title || isLoading}
            className={cn(
              "mt-4 w-full rounded-lg p-3",
              "select-none outline-none",
              "border border-white/20 bg-white/10 text-amlost-white",
              "transition-all duration-100 ease-in-out",
              " focus:border-amlost-white",
              "disabled:cursor-not-allowed disabled:brightness-50"
            )}
          >
            <div className={cn("flex items-center gap-2")}>
              {isLoading ? (
                <Loader extraClasses="h-4 w-4" />
              ) : (
                <Edit3 size={16} aria-hidden="true" />
              )}
              <span className="min-w-fit">Rename snippet to</span>
              <span className={cn("truncate font-medium", "text-greyish")}>
                {`"${localInputValue}"`}
              </span>
            </div>
          </button>
        </DialogPrimitive.Close>
      )}
      <div className={cn("mt-4 flex flex-row justify-end")}>
        <DialogPrimitive.Close asChild></DialogPrimitive.Close>
      </div>
    </form>
  );
});
