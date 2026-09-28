import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import {
  Intro,
  Services,
  Team,
  Gallery,
  Testimonials,
  Philosophy,
} from "@/components/Editorial";
import Experience from "@/components/Experience";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Intro />
        <Services />
        <Team />
        <Experience />
        <Gallery />
        <Testimonials />
        <Booking />
        <Philosophy />
        <Contact />
      </main>
    </>
  );
}
