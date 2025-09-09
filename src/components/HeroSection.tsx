import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-cover.png";

const HeroSection = () => {
  return (
    <section className="hero-gradient text-primary-foreground py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              Featured Magazine
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              EXHIBITOR'S
              <br />
              <span className="accent-gradient bg-clip-text text-transparent">
                CORNER AFRICA
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Africa's premier virtual incubation hub showcasing innovation, 
            entrepreneurship, and the future of business across the continent.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg elegant-shadow"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Read Latest Issue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              Explore Articles
            </Button>
          </div>

          {/* Featured Author */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <p className="text-sm text-primary-foreground/80 mb-2">Featured Expert</p>
            <h3 className="text-xl font-semibold">Nkosana Masuku</h3>
            <p className="text-primary-foreground/70">Sciency Africa</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;