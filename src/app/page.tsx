import { About } from "@/app/homepage/about";
import { Projects } from "./homepage/projects";
import Footer from "./homepage/footer";
import NavbarComponent from "./shared/components/navbarComponent";

export default function Home() {
  return (
    <div className="grid min-h-screen">
      <div className="grid grid-rows-1 w-full max-h-28 bg-white">
        <NavbarComponent/>
      </div>
      <div className="grid grid-cols-1 p-6 md:grid-cols-2 md:gap-16 md:p-16  font-[family-name:var(--font-geist-sans)] justify-center">
        <div className="mt-0 sm:mt-8">
          <About />
        </div>
        <div className="">
          <Projects />
        </div>
      </div>
      <div className="grid justify-center">
        <Footer />
      </div>
    </div>
  );
}
