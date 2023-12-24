import { cn } from "@/lib/cn";
import { find } from "@/lib/find";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { useStore } from "@/lib/store";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  FontDefinition,
  LanguageDefinition,
  ThemeDefinition,
} from "@/lib/types";
import { memo } from "react";
import ThemeBubble from "../ui/ThemeBubble";
import { SUPPORTED_THEMES } from "@/lib/themes";
import { SUPPORTED_FONT_STYLES } from "@/lib/fonts";
import { ChevronDown } from "lucide-react";

export default memo(function Select<
  T extends LanguageDefinition | ThemeDefinition | FontDefinition
>({
  type,
  options,
}: {
  type: "language" | "theme" | "fontFamily";
  options: T[];
}) {
  const value = useStore((state) => state[type]);
  const update = useStore((state) => state.update);

  const get = {
    language: {
      initialValue: <span>{value.label}</span>,
      optionContent: (option: T) => (
        <span className={cn("block truncate pr-11")}>
          {(option as LanguageDefinition).label}
        </span>
      ),
      valueForKey: (key: string) => find(SUPPORTED_LANGUAGES, key),
    },
    theme: {
      initialValue: (
        <ThemeBubble
          colors={(value as ThemeDefinition).baseColors}
          useCustomColorsFromStore={value.id === "custom"}
        />
      ),
      optionContent: (option: T) => (
        <div className={cn("flex items-center gap-3")}>
          <ThemeBubble
            colors={(option as ThemeDefinition).baseColors}
            useCustomColorsFromStore={value.id === "custom"}
          />
          <span className={cn("block truncate")}>
            {(option as ThemeDefinition).label}
          </span>
        </div>
      ),
      valueForKey: (key: string) => find(SUPPORTED_THEMES, key),
    },
    fontFamily: {
      initialValue: (
        <span className={(value as FontDefinition).class}>{value.label}</span>
      ),
      optionContent: (option: T) => (
        <span
          className={cn(
            "block truncate pr-12",
            (option as FontDefinition).class
          )}
        >
          {(option as ThemeDefinition).label}
        </span>
      ),
      valueForKey: (key: string) => find(SUPPORTED_FONT_STYLES, key),
    },
  };

  return (
    <SelectPrimitive.Root
      defaultValue={value.id}
      value={value.id}
      onValueChange={(value: string) => {
        update(
          type,
          get[type].valueForKey(value) as LanguageDefinition &
            ThemeDefinition &
            FontDefinition
        );

        if (type === "theme") {
          if (value === "custom") {
            update("hasCustomTheme", true);
          } else {
            update("hasCustomTheme", false);
          }
        }
      }}
    >
      <SelectPrimitive.Trigger
        className={cn(
          "flex h-8 w-auto items-center justify-between gap-2 rounded-lg px-2",
          "select-none outline-none",
          "border border-white/20 bg-black",
          "transition-all duration-100 ease-in-out",
          "hover:bg-white/20 hover:text-amlost-white",
          "focus:text-amlost-white focus:ring-1 focus:ring-amlost-white focus:ring-offset-2 focus:ring-offset-black",
          type === "language" && "w-32",
          type === "fontFamily" && "w-44"
        )}
        aria-label={`${type}-select`}
      >
        <SelectPrimitive.Value>{get[type].initialValue}</SelectPrimitive.Value>
        <SelectPrimitive.Icon>
          <ChevronDown size={16} aria-hidden="true" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={-100}
          align="center"
          className={cn(
            "relative z-50 overflow-hidden rounded-lg p-1",
            "border border-white/20 bg-black/50 shadow-lg backdrop-blur-md",
            "animate-in fade-in zoom-in-75 duration-100 ease-in-out"
          )}
        >
          <SelectPrimitive.Viewport>
            {options.map((option) => (
              <SelectPrimitive.Item
                key={`${type}-${option.id}`}
                value={option.id}
                className={cn(
                  "rounded-[5px] p-1.5",
                  "select-none outline-none",
                  "transition-all duration-100 ease-in-out",
                  "radix-highlighted:bg-white/20 radix-highlighted:text-amlost-white"
                )}
              >
                <SelectPrimitive.ItemText>
                  {get[type].optionContent(option as T)}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});
