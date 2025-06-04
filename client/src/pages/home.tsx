import Header from "@/components/header";
import Hero from "@/components/hero";
import SearchFilter from "@/components/search-filter";
import TruckCard from "@/components/truck-card";
import About from "@/components/about";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FoodTruck } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: trucks, isLoading, error } = useQuery<FoodTruck[]>({
    queryKey: ["/api/food-trucks"],
  });

  const filteredTrucks = trucks?.filter((truck) => {
    const matchesSearch = searchQuery === "" || 
      truck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || truck.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <section id="trucks" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Food Trucks
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each truck brings unique flavors and experiences to Madison's streets. 
              Click on any truck to see their full menu and schedule.
            </p>
          </div>
          
          {error && (
            <div className="text-center py-8">
              <p className="text-red-600">Failed to load food trucks. Please try again later.</p>
            </div>
          )}
          
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {trucks && filteredTrucks.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchQuery || selectedCategory !== "all" 
                  ? "No food trucks match your search criteria." 
                  : "No food trucks available at the moment."}
              </p>
            </div>
          )}
          
          {trucks && filteredTrucks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrucks.map((truck) => (
                <TruckCard key={truck.id} truck={truck} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <About />
      <Newsletter />
      <Footer />
    </div>
  );
}
