
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock exchange rates - in a real app, these would come from an API
const MOCK_EXCHANGE_RATES = {
  fiat: {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.75,
    CAD: 1.36,
    AUD: 1.53,
    CNY: 7.21,
    INR: 83.51
  },
  crypto: {
    BTC: 0.000016,
    ETH: 0.00031,
    SOL: 0.0071,
    ALGO: 1.13,
    CEL: 0.89,
    XTZ: 2.43
  }
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const currencies = {
    fiat: Object.keys(MOCK_EXCHANGE_RATES.fiat),
    crypto: Object.keys(MOCK_EXCHANGE_RATES.crypto)
  };

  const convertCurrency = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);

    // Simulate API delay
    setTimeout(() => {
      try {
        // Convert everything to USD first as the base currency
        let amountInUSD: number;

        if (fromCurrency in MOCK_EXCHANGE_RATES.fiat) {
          amountInUSD = Number(amount) / MOCK_EXCHANGE_RATES.fiat[fromCurrency as keyof typeof MOCK_EXCHANGE_RATES.fiat];
        } else {
          amountInUSD = Number(amount) / MOCK_EXCHANGE_RATES.crypto[fromCurrency as keyof typeof MOCK_EXCHANGE_RATES.crypto];
        }

        // Then convert from USD to target currency
        let convertedAmount: number;

        if (toCurrency in MOCK_EXCHANGE_RATES.fiat) {
          convertedAmount = amountInUSD * MOCK_EXCHANGE_RATES.fiat[toCurrency as keyof typeof MOCK_EXCHANGE_RATES.fiat];
        } else {
          convertedAmount = amountInUSD * MOCK_EXCHANGE_RATES.crypto[toCurrency as keyof typeof MOCK_EXCHANGE_RATES.crypto];
        }

        setResult(convertedAmount);
        
      } catch (error) {
        toast({
          title: "Conversion error",
          description: "An error occurred during conversion",
          variant: "destructive",
        });
      } finally {
        setIsConverting(false);
      }
    }, 800); // Simulate API delay
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  // Format the result based on the currency
  const formatResult = () => {
    if (result === null) return "";
    
    if (toCurrency === "BTC") {
      return result.toFixed(8);
    } else if (["ETH", "SOL"].includes(toCurrency)) {
      return result.toFixed(6);
    } else if (["JPY", "INR", "KRW"].includes(toCurrency)) {
      return result.toFixed(2);
    } else {
      return result.toFixed(4);
    }
  };

  return (
    <section id="converter" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Currency Converter</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Convert between major fiat currencies and cryptocurrencies with real-time exchange rates.
          </p>
        </div>
        
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Convert Currencies</CardTitle>
            <CardDescription>
              Enter an amount and select currencies to convert between
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Amount input */}
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setResult(null);
                  }}
                  className="currency-input"
                  placeholder="Enter amount"
                  min="0"
                  step="any"
                />
              </div>
              
              {/* Currency selectors */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">From</label>
                  <Select value={fromCurrency} onValueChange={(value) => {
                    setFromCurrency(value);
                    setResult(null);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fiat Currencies</SelectLabel>
                        {currencies.fiat.map(currency => (
                          <SelectItem key={`from-fiat-${currency}`} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Cryptocurrencies</SelectLabel>
                        {currencies.crypto.map(currency => (
                          <SelectItem key={`from-crypto-${currency}`} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={swapCurrencies}
                  className="hidden md:flex mt-6"
                >
                  <ArrowLeftRight size={18} />
                </Button>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">To</label>
                  <Select value={toCurrency} onValueChange={(value) => {
                    setToCurrency(value);
                    setResult(null);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fiat Currencies</SelectLabel>
                        {currencies.fiat.map(currency => (
                          <SelectItem key={`to-fiat-${currency}`} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Cryptocurrencies</SelectLabel>
                        {currencies.crypto.map(currency => (
                          <SelectItem key={`to-crypto-${currency}`} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  className="flex md:hidden justify-center"
                  onClick={swapCurrencies}
                >
                  Swap <ArrowLeftRight size={16} className="ml-2" />
                </Button>
              </div>
              
              {/* Convert button */}
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90" 
                onClick={convertCurrency}
                disabled={isConverting}
              >
                {isConverting ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  "Convert"
                )}
              </Button>
              
              {/* Result */}
              {result !== null && (
                <div className="mt-6 text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Conversion Result</p>
                  <div className="text-2xl font-bold">
                    {amount} {fromCurrency} = {formatResult()} {toCurrency}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Exchange rates are for demonstration purposes only
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CurrencyConverter;
