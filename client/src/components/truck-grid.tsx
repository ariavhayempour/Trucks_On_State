import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { FoodTruck } from "@shared/schema";
import SearchFilter from "./search-filter";
import TruckCard from "./truck-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TruckGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { data: trucks, isLoading } = useQuery<FoodTruck[]>({
    queryKey: ["/api/trucks"],
  });

  const filteredTrucks = trucks?.filter((truck) => {
    const matchesSearch = truck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         truck.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || truck.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <SearchFilter
        onSearchChange={setSearchTerm}
        onFilterChange={setSelectedFilter}
        selectedFilter={selectedFilter}
      />
      
      <section id="trucks" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Food Trucks</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each truck brings unique flavors and experiences to Madison's streets. Click on any truck to see their full menu and schedule.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-32" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTrucks && filteredTrucks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrucks.map((truck) => (
                <TruckCard key={truck.id} truck={truck} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                {searchTerm || selectedFilter !== "all" 
                  ? "No food trucks match your search criteria." 
                  : "No food trucks available at the moment."
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
