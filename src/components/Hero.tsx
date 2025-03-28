
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Your All-in-One Crypto & Currency Platform
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mb-8 opacity-90">
          Seamlessly convert between fiat and cryptocurrencies, explore blockchain data, and get real-time insights with AI-powered assistance.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            size="lg" 
            className="bg-secondary hover:bg-secondary/90"
            onClick={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Try Currency Converter <ArrowRight size={16} className="ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-primary">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
