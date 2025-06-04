import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate subscription
    toast({
      title: "Subscribed!",
      description: "You'll receive updates about Madison's food trucks.",
    });
    setEmail("");
  };

  return (
    <section className="py-16 hero-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-xl text-white/90 mb-8">
          Get notifications about new food trucks, special events, and exclusive deals around Madison.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white"
          />
          <Button 
            type="submit"
            className="bg-accent-yellow text-gray-900 font-semibold hover:bg-yellow-300 transition-colors"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
