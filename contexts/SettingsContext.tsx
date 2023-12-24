"use client";
import { SUPPORTED_FONT_STYLES } from "@/lib/fonts";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { SUPPORTED_PADDING_CHOICES, SUPPORTED_THEMES } from "@/lib/themes";
import {
  ChoiceDefinition,
  FontDefinition,
  LanguageDefinition,
  ThemeDefinition,
} from "@/lib/types";
import { ReactNode, createContext, FC, useContext, useState } from "react";

interface SettingContextProps {
  language: LanguageDefinition;
  setLanguage: (_: LanguageDefinition) => void;
  theme: ThemeDefinition;
  setTheme: (_: ThemeDefinition) => void;
  fontStyle: FontDefinition;
  setFontStyle: (_: FontDefinition) => void;
  lineNumbers: boolean;
  setLineNumbers: (_: boolean) => void;
  padding: ChoiceDefinition;
  setPadding: (_: ChoiceDefinition) => void;
}

const SettingsContext = createContext<SettingContextProps>(
  {} as SettingContextProps
);

const useSettingsContext = () => useContext(SettingsContext);

type SettingsProviderProps = {
  children: ReactNode;
};

const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageDefinition>(
    SUPPORTED_LANGUAGES[0]
  );

  const [theme, setTheme] = useState<ThemeDefinition>(SUPPORTED_THEMES[4]);
  const [fontStyle, setFontStyle] = useState<FontDefinition>(
    SUPPORTED_FONT_STYLES.at(0)!
  );
  const [lineNumbers, setLineNumbers] = useState<boolean>(true);
  const [padding, setPadding] = useState<ChoiceDefinition>(
    SUPPORTED_PADDING_CHOICES[1]
  );

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        fontStyle,
        setFontStyle,
        lineNumbers,
        setLineNumbers,
        padding,
        setPadding,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, useSettingsContext };
