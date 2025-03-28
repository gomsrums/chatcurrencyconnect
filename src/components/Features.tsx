
import { 
  RefreshCw, 
  TrendingUp, 
  Search, 
  MessageSquare,
  Shield
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/10 text-secondary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <RefreshCw size={24} />,
      title: "Currency Conversion",
      description: "Convert between major fiat currencies and cryptocurrencies with real-time exchange rates."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Crypto Insights",
      description: "Get detailed insights into cryptocurrency trends, prices, and market capitalization."
    },
    {
      icon: <Search size={24} />,
      title: "Blockchain Explorer",
      description: "Explore transactions, blocks, and addresses across multiple blockchain networks."
    },
    {
      icon: <MessageSquare size={24} />,
      title: "AI Assistant",
      description: "Get instant answers to your cryptocurrency and finance questions with our AI chat."
    },
    {
      icon: <Shield size={24} />,
      title: "Secure Authentication",
      description: "Sign in securely with Google or Apple accounts for a personalized experience."
    }
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and features to help you navigate the world of cryptocurrencies and finance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
