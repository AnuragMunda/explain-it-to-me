import Footer from "@/components/footer";
import InfinitePromptScroll from "@/components/Infinte-prompt-scroll";
import PromptInput from "@/components/prompt-input";
import ResultSection from "@/components/result-section";
import { signIn } from "@/lib/auth";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-linear-to-b from-[#093b45] to-black text-white flex flex-col px-4 py-5 overflow-y-scroll">
      <header className="mb-25">
        <div className="flex justify-between items-center">
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

          <button className="cursor-pointer hover:bg-[#1493ac] px-3 py-2 transition-all ease-in-out rounded-lg" onClick={async () => {
            'use server'
            await signIn("google")
          }}>
            Sign In
          </button>
        </div>
      </header>

      <PromptInput />

      <InfinitePromptScroll />

      <ResultSection />

      <Footer />
    </main >
  );
}
