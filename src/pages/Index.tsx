
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CurrencyConverter from "@/components/CurrencyConverter";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <CurrencyConverter />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
