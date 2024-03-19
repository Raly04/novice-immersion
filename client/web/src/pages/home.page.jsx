import { SparklesPreview } from "../components/SpartklePreview";
import Hero from "../components/hero/Hero";
import { Club } from "../components/home/club";
import NavBar from "../components/navBar/nav.bar";
import Description from "../components/home/description"
import Footer from "../components/footer/Footer"

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />
      <SparklesPreview />
      {/* <LampDemo /> */}
      <Description />
      <Club />
      <Footer/>
    </>
  );
}
