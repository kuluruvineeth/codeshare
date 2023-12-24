import { ChoiceDefinition, ThemeDefinition } from "./types";
import { generateColors } from "./colors";
import chroma from "chroma-js";

export const SUPPORTED_THEMES: ThemeDefinition[] = [
  {
    id: "sky",
    label: "Sky",
    baseColors: ["#38bdf8", "#3b82f6"],
  },
  {
    id: "cotton_candy",
    label: "Cotton Candy",

    baseColors: ["#c4b5fd", "#c084fc"],
  },
  {
    id: "smoke",
    label: "Smoke",

    baseColors: ["#22d3ee", "#a5f3fc"],
  },
  {
    id: "honey",
    label: "Honey",

    baseColors: ["#fcd34d", "#f97316"],
  },
  {
    id: "jade",
    label: "Jade",

    baseColors: ["#2dd4bf", "#059669"],
  },
  {
    id: "bubblegum",
    label: "Bubblegum",

    baseColors: ["#d946ef", "#db2777"],
  },
  {
    id: "salem",
    label: "Salem",

    baseColors: ["#581c87", "#6d28d9"],
  },
  {
    id: "custom",
    label: "Custom...",

    baseColors: [chroma.random().hex(), chroma.random().hex()],
  },
];

export const SUPPORTED_PADDING_CHOICES: ChoiceDefinition[] = [
  { id: "sm", label: "16", class: "p-4" },
  { id: "md", label: "32", class: "p-8" },
  { id: "lg", label: "64", class: "p-16" },
  { id: "xl", label: "128", class: "p-32" },
];
