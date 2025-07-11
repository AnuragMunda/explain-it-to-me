'use client';

import InfinitePromptScroll from "@/components/Infinte-prompt-scroll";
import PromptInput from "@/components/prompt-input";
import ResultSection from "@/components/result-section";
import { ExplanationContext } from "@/context/explanation-context";
import { useContext } from "react";

export default function Home() {
  const explanationContext = useContext(ExplanationContext);
  if (!explanationContext) {
    throw new Error("useContext must be used inside an <ExplanationProvider>");
  }

  const { data } = explanationContext;

  return (
    <main className="min-h-screen bg-linear-to-b from-[#6E642C] to-black text-white flex flex-col px-4 py-5">
      <header className="mb-25">
        <div className="text-lg md:text-xl tracking-wider">
          <span className="font-extrabold">E</span>
          <span className="font-light">xplain</span>
          <span className="font-extrabold">I</span>
          <span className="font-light">t</span>
          <span className="font-extrabold">T</span>
          <span className="font-light">o</span>
          <span className="font-extrabold">M</span>
          <span className="font-light">e</span>
        </div>
      </header>

      <PromptInput />

      {!data && (
        <InfinitePromptScroll />
      )}

      <ResultSection />

      <footer className="mt-auto flex flex-col items-center gap-3 text-sm mb-5">
        <span>LinkedIn | Discord | Portfolio | X</span>
        <span>© 2025 ExplainItToMe. Anurag Munda.</span>
      </footer>
    </main >
  );
}
