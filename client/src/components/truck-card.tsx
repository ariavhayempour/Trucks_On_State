import { Link } from "wouter";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { capitalizeFirst, isCurrentlyOpen } from "@/lib/utils";
import type { FoodTruck } from "@shared/schema";

interface TruckCardProps {
  truck: FoodTruck;
}

export default function TruckCard({ truck }: TruckCardProps) {
  const isOpen = isCurrentlyOpen(truck.schedule);
  
  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img 
        src={truck.image} 
        alt={`${truck.name} food truck`}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-gray-900">{truck.name}</h3>
        </div>
        <p className="text-gray-600 mb-4">{truck.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{truck.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${
            isOpen ? 'text-secondary-600' : 'text-red-600'
          }`}>
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
          <Link href={`/truck/${truck.slug}`}>
            <Button className="bg-primary text-white hover:bg-primary-600 transition-colors">
              View Menu
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
