import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#1B1919" }}>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Certifications />
      <TechStack />
      <Footer />
    </main>
  );
}
