
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  SendHorizontal, 
  Minimize2, 
  X,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", text: "Hello! How can I help you with cryptocurrencies or currency conversion today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = { id: Date.now().toString(), text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Simulate API response - in a real app, this would call the backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sample responses based on input
      let botResponse = "I'm not sure how to respond to that. Can you ask about cryptocurrencies or currency conversion?";
      
      const input = inputValue.toLowerCase();
      if (input.includes("convert") || input.includes("exchange") || input.includes("rate")) {
        botResponse = "You can use our Currency Converter tool to convert between different currencies. Would you like to try it?";
      } else if (input.includes("bitcoin") || input.includes("ethereum") || input.includes("crypto")) {
        botResponse = "Our platform provides information on various cryptocurrencies including Bitcoin, Ethereum, Solana, and more. Is there a specific cryptocurrency you're interested in?";
      } else if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
        botResponse = "Hello! How can I assist you with cryptocurrency information or currency conversion today?";
      }
      
      setMessages(prev => [...prev, { id: Date.now().toString(), text: botResponse, isUser: false }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button */}
      {!isOpen && !isMinimized && (
        <Button 
          onClick={toggleChat} 
          className="rounded-full w-14 h-14 bg-secondary hover:bg-secondary/90 shadow-lg"
        >
          <MessageSquare size={24} />
        </Button>
      )}
      
      {/* Minimized chat */}
      {isMinimized && (
        <div 
          onClick={toggleChat}
          className="bg-primary text-primary-foreground rounded-full py-2 px-4 flex items-center space-x-2 cursor-pointer shadow-lg hover:bg-primary/90 transition-colors"
        >
          <MessageSquare size={18} />
          <span className="font-medium">Chat with us</span>
        </div>
      )}
      
      {/* Chat window */}
      {isOpen && !isMinimized && (
        <div className={`bg-white rounded-lg shadow-xl w-80 sm:w-96 max-h-[500px] flex flex-col overflow-hidden slide-in`}>
          {/* Chat header */}
          <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
            <h3 className="font-medium">Chat Assistant</h3>
            <div className="flex space-x-2">
              <button onClick={minimizeChat} className="hover:bg-primary-foreground/20 rounded p-1 transition-colors">
                <Minimize2 size={16} />
              </button>
              <button onClick={closeChat} className="hover:bg-primary-foreground/20 rounded p-1 transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 text-gray-800 rounded-lg p-3 flex items-center">
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="bg-secondary hover:bg-secondary/90"
                disabled={!inputValue.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <SendHorizontal size={18} />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
