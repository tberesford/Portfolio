import { About } from "@/app/homepage/about";
import { Projects } from "./homepage/projects";
import Footer from "./homepage/footer";

export default function Home() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="grid grid-cols-1 p-6 md:grid-cols-2 md:gap-16 md:p-16  font-[family-name:var(--font-geist-sans)] justify-center">
        <div className="md:mt-8">
          <About />
        </div>
        <div className="">
          <Projects />
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
