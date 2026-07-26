import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Categories from "@/components/sections/Categories";
import FeaturedCars from "@/components/sections/FeaturedCars";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyAutoMarket from "@/components/sections/WhyAutoMarket";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <FeaturedCars />
      <HowItWorks />
      <WhyAutoMarket />
      <Testimonials />
      <CTA />
    </>
  );
}
