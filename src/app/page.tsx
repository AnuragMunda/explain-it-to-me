import FileUploder from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#6E642C] to-black text-white flex flex-col px-4 py-5">
      <header className="mb-30">
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

      <section className="flex flex-col items-center justify-center gap-6 md:gap-9">
        <h1 className="font-semibold text-2xl md:text-4xl lg:text-5xl tracking-wide">What can I explain?</h1>
        <div className="flex flex-col items-center gap-7 w-full">
          <div className="w-full border-2 rounded-2xl bg-black flex flex-col gap-2 justify-between md:w-[80%] lg:w-[65%] min-h-40 max-h-60 md:max-h-100 p-2">
            <Textarea className="resize-none border-0 md:text-lg focus:ring-0" placeholder="Ask anything..." />
            <FileUploder />
          </div>
          <Button className="px-10 py-5 text-lg border-2 bg-black font-semibold cursor-pointer hover:text-black hover:bg-white hover:border-black transition duration-300 ease-in-out">Explain It To Me</Button>
        </div>
      </section>

      <footer className="mt-auto flex justify-center">
        <span>© 2025 ExplainItToMe. Anurag Munda.</span>
      </footer>
    </main>
  );
}
