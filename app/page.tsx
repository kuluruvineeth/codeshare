import Code from "@/components/Code";
import Settings from "@/components/Settings";
import Image from "next/image";
import {
  Fira_Code,
  IBM_Plex_Mono,
  Inconsolata,
  Inter,
  JetBrains_Mono,
  Source_Code_Pro,
} from "next/font/google";
import clsx from "clsx";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Editor from "@/components/Editor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

// const ibmPlexMono = IBM_Plex_Mono({
//   weight: ["400"],
//   style: ["normal", "italic"],
//   variable: "--font-ibm-plex-mono",
// });

export default async function Home() {
  const session = await getSession();

  const isAuthenticated = !!session;

  if (session) {
    redirect("/dashboard");
  }
  return <Editor editable={true} isAuthenticated={isAuthenticated} />;
}
