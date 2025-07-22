import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import InfinitePromptScroll from "@/components/Infinte-prompt-scroll";
import PromptInput from "@/components/prompt-input";
import ResultSection from "@/components/result-section";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { signIn, signOut, auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth()

  return (
    <main className="min-h-screen min-w-full max-w-screen flex bg-linear-to-b from-[#093b45] to-black">
      {session?.user && <AppSidebar />}
      <section className="relative w-full text-white flex flex-col px-4 py-5 overflow-y-scroll">
        <header className="mb-25">
          <div className="flex justify-between items-center">
            <div className="flex h-5 items-center space-x-4">
              {session?.user && (
                <>
                  <SidebarTrigger className="hover:bg-[#1493ac] cursor-pointer" />
                  <Separator className="text-sm" orientation="vertical" />
                </>
              )}
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
            </div>

            <button className="cursor-pointer hover:text-black hover:bg-[#1493ac] px-3 py-2 transition-all ease-in-out rounded-lg" onClick={async () => {
              'use server'
              if (session?.user)
                await signOut()
              else
                await signIn("google")
            }}>
              {session?.user ? "Sign out" : "Sign in"}
            </button>
          </div>
        </header>

        <PromptInput />

        <InfinitePromptScroll />

        <ResultSection session={session} />

        <Footer />
      </section >
    </main>
  );
}
