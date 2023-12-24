import type { Extension } from "@codemirror/state";
import { Snippet } from "@prisma/client";

export type ChoiceDefinition = {
  id: string;
  label: string;
  class: string;
};

export type ThemeDefinition = {
  id: string;
  label: string;
  baseColors: string[];
};

export type LanguageDefinition = {
  id: string;
  label: string;
  extension: () => Promise<Extension>;
};

export type FontDefinition = {
  id: string;
  label: string;
  variable: string;
  class: string;
};

export type Message =
  | "SUCCESS"
  | "ERROR"
  | "UNAUTHORIZED"
  | "TOO_MANY_REQUESTS"
  | "LIMIT_REACHED"
  | "EMPTY_EDITOR"
  | "UNKNOWN_ERROR"
  | "SNIPPET_NOT_FOUND"
  | "INTERNAL_SERVER_ERROR"
  | "PENDING"
  | "IDLE"
  | "CLIPBOARD_API_NOT_SUPPORTED";

export type AppStatus = {
  message: Message;
  hasCustomTheme: boolean;
};

export type AppState = {
  id: string | null;
  title: string | null;
  code: string | null;
  language: LanguageDefinition;
  theme: ThemeDefinition;
  fontFamily: FontDefinition;
  fontSize: string;
  lineNumbers: boolean;
  padding: string;
  customColors: string[];
  colorMode: any;
  angle: number;
  grain: boolean;
};

export interface Store extends AppStatus, AppState {
  update: <
    T extends string,
    V extends
      | string
      | number
      | boolean
      | LanguageDefinition
      | ThemeDefinition
      | FontDefinition
  >(
    type: T,
    value: V
  ) => void;
  setAppState: (snippet: Snippet) => void;
  getAppState: () => AppState;
  setCustomColor: (c: string, i: number) => void;
  addCustomColor: (c: string) => void;
  removeCustomColor: (i: number) => void;
}
