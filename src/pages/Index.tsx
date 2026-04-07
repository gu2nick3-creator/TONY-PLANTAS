import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import Differentials from "@/components/Differentials";
import FeaturedProducts from "@/components/FeaturedProducts";
import Gallery from "@/components/Gallery";
import SocialSection from "@/components/SocialSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <Differentials />
      <Gallery />
      <SocialSection />
      <Testimonials />
      <FAQ />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Index;
