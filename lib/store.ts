import { create } from "zustand";
import { Store } from "./types";
import { devtools } from "zustand/middleware";
import { DEFAULT_VALUES } from "./values";
import { produce } from "immer";
import { find } from "./find";
import { SUPPORTED_LANGUAGES } from "./languages";
import { SUPPORTED_THEMES } from "./themes";
import { SUPPORTED_FONT_STYLES } from "./fonts";

export const useStore = create<Store>()(
  devtools((set, get) => ({
    ...DEFAULT_VALUES,
    update: (type, value) => {
      set(
        produce((state) => {
          state[type] = value;
        })
      );
    },
    setAppState: (snippet) => {
      set(
        produce((state) => {
          state.message = DEFAULT_VALUES.message;
          state.hasCustomTheme =
            Boolean(snippet.theme === "custom") ||
            DEFAULT_VALUES.hasCustomTheme;
          state.id = snippet.id;
          state.title = snippet.title;
          state.code = snippet.code;
          state.language = find(SUPPORTED_LANGUAGES, snippet.language!);
          state.theme = find(SUPPORTED_THEMES, snippet.theme!);
          state.fontFamily = find(SUPPORTED_FONT_STYLES, snippet.fontFamily!);
          state.fontSize = snippet.fontSize;
          state.lineNumbers = snippet.lineNumbers;
          state.padding = snippet.padding;
          state.customColors = snippet.customColors;
          state.colorMode = snippet.colorMode;
          state.angle = snippet.angle;
          state.grain = snippet.grain;
        })
      );
    },
    getAppState: () => {
      const {
        id,
        title,
        code,
        language,
        theme,
        fontFamily,
        fontSize,
        lineNumbers,
        padding,
        customColors,
        colorMode,
        angle,
        grain,
      } = get();

      return {
        id,
        title,
        code,
        language,
        theme,
        fontFamily,
        fontSize,
        lineNumbers,
        padding,
        customColors,
        colorMode,
        angle,
        grain,
      };
    },
    setCustomColor: (c, i) => {
      set(
        produce((state) => {
          state.customColors[i] = c;
        })
      );
    },
    addCustomColor: (c) => {
      set(
        produce((state) => {
          state.customColors.push(c);
        })
      );
    },
    removeCustomColor: (i) => {
      set(
        produce((state) => {
          state.customColors.splice(i, 1);
        })
      );
    },
  }))
);
