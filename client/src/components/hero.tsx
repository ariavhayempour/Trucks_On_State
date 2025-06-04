import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToTrucks = () => {
    const element = document.getElementById('trucks');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative hero-gradient text-white">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Madison's Best<br />
            <span className="text-accent-yellow">Food Trucks</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover amazing local food trucks right here on State Street and around Madison. 
            From gourmet burgers to authentic tacos, find your next favorite meal on wheels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToTrucks}
              className="bg-accent-yellow text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors"
            >
              Explore Food Trucks
            </Button>
            <Button 
              variant="outline"
              onClick={scrollToAbout}
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-primary-700 transition-colors"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
