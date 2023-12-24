import { SUPPORTED_FONT_STYLES } from "./fonts";
import { SUPPORTED_LANGUAGES } from "./languages";
import { SUPPORTED_THEMES } from "./themes";
import { AppState, AppStatus } from "./types";

export const BASE_FONT_SIZES: string[] = ["12", "14", "16"];

export const BASE_PADDING_VALUES: string[] = ["16", "32", "64", "128"];

export const BASE_COLOR_MODES: any[] = ["rgb", "lrgb", "lab", "lch", "hsl"];

export const DEFAULT_VALUES: AppStatus & AppState = {
  message: "IDLE",
  hasCustomTheme: false,
  id: null,
  title: null,
  code: null,
  language: SUPPORTED_LANGUAGES.at(0)!,
  theme: SUPPORTED_THEMES.at(0)!,
  fontFamily: SUPPORTED_FONT_STYLES.at(0)!,
  fontSize: BASE_FONT_SIZES.at(1)!,
  lineNumbers: true,
  padding: BASE_PADDING_VALUES.at(1)!,
  customColors: SUPPORTED_THEMES.at(-1)!.baseColors,
  colorMode: BASE_COLOR_MODES.at(0)!,
  angle: 145,
  grain: false,
};
