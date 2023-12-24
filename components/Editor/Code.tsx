"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CodeProps {
  placeholder: string;
  initialValue?: string;
}

import clsx from "clsx";
import { Highlight, themes } from "prism-react-renderer";
import { language } from "@codemirror/language";
import { useSettingsContext } from "@/contexts/SettingsContext";
import { EditorView } from "@codemirror/view";
import createTheme from "@uiw/codemirror-themes";
import { hslToHsla as adjustLightness, generateColors } from "@/lib/colors";
import { tags as t } from "@lezer/highlight";
import ReactCodeMirror, { useCodeMirror } from "@uiw/react-codemirror";
import { useStore } from "@/lib/store";
import { debounce } from "@/lib/debounce";
import { useHotkeys } from "react-hotkeys-hook";
import { cn } from "@/lib/cn";

export default function Code({ editable = false }: { editable: boolean }) {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null);

  const [localEditable, setLocalEditable] = useState(editable);

  const editorRef = useRef<HTMLDivElement>(null);

  const hasCustomTheme = useStore((state) => state.hasCustomTheme);
  const code = useStore((state) => state.code);
  const language = useStore((state) => state.language);
  const theme = useStore((state) => state.theme);
  const fontFamily = useStore((state) => state.fontFamily);
  const fontSize = useStore((state) => state.fontSize);
  const lineNumbers = useStore((state) => state.lineNumbers);
  const customColors = useStore((state) => state.customColors);
  const update = useStore((state) => state.update);

  const baseColors = useMemo(() => {
    return hasCustomTheme ? customColors : theme.baseColors;
  }, [hasCustomTheme, theme.baseColors, customColors]);

  const generatedColors = useMemo(() => {
    return generateColors(baseColors);
  }, [baseColors]);

  useEffect(() => {
    async function loadLanguage() {
      const lang = (await language.extension()) as any;

      setSelectedLanguage(lang);
    }

    loadLanguage();
  }, [language]);

  const customStyles = EditorView.baseTheme({
    "&.cm-editor": {
      fontWeight: 400,
    },
    "&.cm-editor.cm-focused": {
      outline: "none",
    },
    ".cm-placeholder": {
      color: adjustLightness(generatedColors.at(0)!, 0.4),
    },
    ".cm-gutterElement": {
      display: "flex",
      justifyContent: "flex-end",
      paddingRight: "1rem !important",
      letterSpacing: ".1px",
    },
  });

  const customFontstyle = EditorView.theme({
    ".cm-content *": {
      fontFamily: fontFamily.variable,
      fontVariantLigatures: "normal",
    },
    ".cm-gutters": {
      fontFamily: fontFamily.variable,
      fontVariantLigatures: "normal",
    },
  });

  const customFontSize = EditorView.theme({
    ".cm-content *": {
      fontSize: `${fontSize}px`,
      lineHeight: `${+fontSize * 1.5}px`,
    },
    ".cm-gutters": {
      fontSize: `${fontSize}px`,
      lineHeight: `${+fontSize * 1.5}px`,
    },
  });

  const lineWrapping = EditorView.lineWrapping;
  const setTabIndex = EditorView.contentAttributes.of({ tabIndex: "-1" });

  const c = theme.baseColors;

  const customEditorTheme = createTheme({
    theme: "dark",
    settings: {
      background: "transparent",
      foreground: "white",
      caret: localEditable ? generatedColors.at(0) : "transparent",
      selection: adjustLightness(generatedColors.at(0)!, 0.2),
      selectionMatch: adjustLightness(generatedColors.at(1)!, 0.2),
      lineHighlight: "transparent",
      gutterBackground: "transparent",
      gutterForeground: adjustLightness(generatedColors.at(0)!, 0.4),
      gutterBorder: "transparent",
    },
    styles: [
      {
        tag: [t.emphasis],
        fontStyle: "italic",
      },
      {
        tag: [t.strong],
        fontStyle: "bold",
      },
      {
        tag: [t.link],
        color: c.at(1),
      },
      {
        tag: [t.comment, t.lineComment, t.blockComment, t.docComment],
        fontStyle: "italic",
        color: adjustLightness(generatedColors.at(0)!, 0.4),
      },
      {
        tag: [
          t.bracket,
          t.squareBracket,
          t.paren,
          t.punctuation,
          t.angleBracket,
        ],
        color: generatedColors.at(0),
      },
      {
        tag: t.variableName,
        color: generatedColors.at(5),
        fontStyle: "italic",
      },
      {
        tag: t.propertyName,
        color: generatedColors.at(5),
        fontStyle: "italic",
      },
      { tag: t.definition(t.variableName), color: generatedColors.at(10) },
      { tag: t.definition(t.propertyName), color: generatedColors.at(8) },
      {
        tag: [
          t.moduleKeyword,
          t.keyword,
          t.changed,
          t.annotation,
          t.modifier,
          t.namespace,
          t.self,
          t.meta,
        ],
        color: generatedColors.at(1),
      },
      {
        tag: [t.typeName, t.typeOperator],
        color: generatedColors.at(13),
      },
      {
        tag: [t.operator, t.special(t.string)],
        color: generatedColors.at(6),
      },
      {
        tag: [t.number, t.bool, t.string, t.processingInstruction, t.inserted],
        color: generatedColors.at(2),
      },
      {
        tag: [
          t.color,
          t.className,
          t.constant(t.name),
          t.standard(t.name),
          t.function(t.variableName),
          t.function(t.propertyName),
        ],
        color: generatedColors.at(8),
      },
      {
        tag: [t.regexp],
        color: generatedColors.at(12),
      },
      {
        tag: [t.tagName],
        color: generatedColors.at(11),
      },
      {
        tag: [t.attributeValue],
        color: generatedColors.at(2),
      },
      {
        tag: [t.attributeName],
        color: generatedColors.at(6),
      },
      {
        tag: [t.heading],
        color: generatedColors.at(1),
        fontWeight: "bold",
      },
      {
        tag: [t.quote],
        color: generatedColors.at(6),
      },
    ],
  });

  const debouncedUpdate = debounce(update, 300);

  const { setContainer, view } = useCodeMirror({
    container: editorRef.current,
    value: code ?? "",
    onChange: (value) => debouncedUpdate("code", value),
    placeholder: "//Add some code here...",
    autoFocus: true,
    editable: localEditable,
    readOnly: !localEditable,
    basicSetup: {
      lineNumbers: lineNumbers,
      foldGutter: false,
      autocompletion: false,
      indentOnInput: false,
      highlightActiveLine: false,
      highlightActiveLineGutter: false,
      dropCursor: false,
      searchKeymap: false,
      lintKeymap: false,
      completionKeymap: false,
      foldKeymap: false,
    },

    extensions: [
      selectedLanguage,
      customStyles,
      customFontstyle,
      customFontSize,
      lineWrapping,
      setTabIndex,
    ],

    theme: customEditorTheme,
  });

  useEffect(() => {
    if (!editable) {
      setLocalEditable(false);
    }
  }, [editable]);

  useEffect(() => {
    if (editorRef.current && selectedLanguage) {
      setContainer(editorRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef.current, selectedLanguage]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        editable &&
        editorRef.current?.contains(event.target as Node) &&
        !localEditable
      ) {
        setLocalEditable(true);
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [editable, localEditable]);

  useEffect(() => {
    if (editorRef.current) {
      const textboxElement = document.querySelector('[role="textbox"]');

      if (textboxElement) {
        textboxElement.setAttribute("aria-label", "code-editor");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef.current]);

  useHotkeys(
    "f",
    () => {
      if (!view?.hasFocus) {
        view?.focus();

        setLocalEditable(true);

        view?.dispatch({
          selection: {
            anchor: 0,
            head: view.state.doc.length,
          },
        });
      }
    },
    {
      enabled: editable,
      preventDefault: true,
    },
    [view]
  );

  useHotkeys(
    "escape",
    () => {
      if (view?.hasFocus) {
        view.contentDOM.blur();

        setLocalEditable(false);
      }
    },
    {
      enabled: editable && localEditable,
      enableOnContentEditable: true,
    },
    [view, localEditable]
  );

  if (!selectedLanguage || !generatedColors) {
    return null;
  }

  return <div ref={editorRef} className={cn("rounded-lg p-3")} />;
}
