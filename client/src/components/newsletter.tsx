import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function FoodTruckNewsletterSignup() {
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
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2 className="newsletter-title">Stay Updated</h2>
        <p className="newsletter-description">
          Get notifications about new food trucks, special events, and exclusive deals around Madison.
        </p>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter-email-input"
          />
          <Button 
            type="submit"
            className="newsletter-subscribe-button"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
