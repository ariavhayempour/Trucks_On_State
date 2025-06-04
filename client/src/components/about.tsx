import { Truck, MapPin } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Trucks on State
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We're passionate about connecting Madison's vibrant food truck community with hungry locals and visitors. 
              Our platform makes it easy to discover amazing mobile eateries throughout the city.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              From State Street to the Capitol Square, from campus to the neighborhoods, food trucks bring incredible 
              diversity and flavor to Madison's culinary landscape. We're here to help you find your next favorite meal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">25+ Food Trucks</h4>
                  <p className="text-sm text-gray-600">Active in Madison</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-secondary/10 rounded-full p-3 mr-4">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">15+ Locations</h4>
                  <p className="text-sm text-gray-600">Around the city</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Madison Wisconsin Capitol building" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
