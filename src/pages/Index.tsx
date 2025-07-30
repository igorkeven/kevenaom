import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import YouTubeSection from "@/components/YouTube";
import Consultancy from "@/components/Consultancy";


const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Consultancy />
        <YouTubeSection />
      </main>
    </div>
  );
};

export default Index;