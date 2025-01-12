import HeroSection from "@/components/landing-page/hero-section";
import Navbar from "@/components/landing-page/navbar";

const HomePage = () => {
  return (
    <div id="root" className="h-full">
      <Navbar />
      <HeroSection />
    </div>
  )
}

export default HomePage