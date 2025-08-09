import { foodTrucks, type FoodTruck, type InsertFoodTruck } from "@shared/schema";

export interface IStorage {
  getFoodTrucks(): Promise<FoodTruck[]>;
  getFoodTruckBySlug(slug: string): Promise<FoodTruck | undefined>;
  createFoodTruck(truck: InsertFoodTruck): Promise<FoodTruck>;
  searchFoodTrucks(query: string): Promise<FoodTruck[]>;
  filterFoodTrucksByCategory(category: string): Promise<FoodTruck[]>;
}

export class MemStorage implements IStorage {
  private trucks: Map<number, FoodTruck>;
  private currentId: number;

  constructor() {
    this.trucks = new Map();
    this.currentId = 1;
    this.seedData();
  }

  private seedData() {
    const sampleTrucks: InsertFoodTruck[] = [
      {
        // Fresh cool drinks
        slug: "fresh-cool",
        name: "Fresh Cool Drinks",
        description: "Cold smoothies and authentic home-recipe springrolls!",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "asian",
        location: "State Street & Library Mall",
        phone: "N/A",
        menu: [
          { name: "Classic Badger Burger", price: "$12.99", description: "Wisconsin beef, cheese, lettuce, tomato, onion" },
          { name: "Cheese Curd Burger", price: "$14.99", description: "Beef burger topped with fried cheese curds" },
          { name: "Brat Burger", price: "$13.99", description: "Wisconsin bratwurst patty with sauerkraut" },
          { name: "Veggie Burger", price: "$11.99", description: "House-made veggie patty with avocado" },
          { name: "Sweet Potato Fries", price: "$4.99", description: "Crispy sweet potato fries with dipping sauce" }
        ],
        schedule: {
          "Monday": "10:00 am - 6:00 pm",
          "Tuesday": "10:00 am - 6:00 pm",
          "Wednesday": "10:00 am - 6:00 pm",
          "Thursday": "10:00 am - 6:00 pm",
          "Friday": "10:00 am - 6:00 pm",
          "Saturday": "10:00 am - 7:30 pm",
          "Sunday": "10:00 am - 6:00 pm"
        }
      },

      // Toast
      {
        slug: "toast",
        name: "Toast",
        description: "Made to order paninis with frsh ingredients and homemade sauces!",
        image: "TBD",
        category: "tacos",
        location: "State Street & Library Mall",
        phone: "TBD",
        menu: [
          { name: "Carnitas Tacos", price: "$3.50", description: "Slow-cooked pork with onions and cilantro" },
          { name: "Carne Asada Tacos", price: "$3.75", description: "Grilled steak with fresh salsa verde" },
          { name: "Al Pastor Tacos", price: "$3.50", description: "Marinated pork with pineapple" },
          { name: "Fish Tacos", price: "$4.00", description: "Grilled fish with cabbage slaw" },
          { name: "Elote (Street Corn)", price: "$5.99", description: "Mexican street corn with cotija cheese" },
          { name: "Guacamole & Chips", price: "$6.99", description: "Fresh guacamole with house-made tortilla chips" }
        ],
        schedule: {
          "Monday": "11:00 AM - 9:00 PM",
          "Tuesday": "11:00 AM - 9:00 PM",
          "Wednesday": "11:00 AM - 9:00 PM",
          "Thursday": "11:00 AM - 10:00 PM",
          "Friday": "11:00 AM - 11:00 PM",
          "Saturday": "10:00 AM - 11:00 PM",
          "Sunday": "12:00 PM - 8:00 PM"
        }
      },
      {
        slug: "smokys-bbq",
        name: "Smoky's BBQ",
        description: "Slow-smoked meats with traditional Wisconsin BBQ flavors and homemade sides",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "bbq",
        location: "University Avenue",
        phone: "(608) 555-0125",
        menu: [
          { name: "Pulled Pork Sandwich", price: "$11.99", description: "Slow-smoked pulled pork with BBQ sauce" },
          { name: "Brisket Platter", price: "$16.99", description: "Sliced brisket with two sides" },
          { name: "BBQ Ribs (Half Rack)", price: "$14.99", description: "Fall-off-the-bone ribs with dry rub" },
          { name: "Smoked Chicken", price: "$12.99", description: "Half chicken with signature BBQ sauce" },
          { name: "Mac & Cheese", price: "$4.99", description: "Creamy mac and cheese with breadcrumb topping" },
          { name: "Coleslaw", price: "$3.99", description: "Fresh coleslaw with tangy dressing" }
        ],
        schedule: {
          "Monday": "Closed",
          "Tuesday": "11:00 AM - 8:00 PM",
          "Wednesday": "11:00 AM - 8:00 PM",
          "Thursday": "11:00 AM - 8:00 PM",
          "Friday": "11:00 AM - 9:00 PM",
          "Saturday": "11:00 AM - 9:00 PM",
          "Sunday": "12:00 PM - 7:00 PM"
        }
      },
      {
        slug: "sweet-dreams",
        name: "Sweet Dreams",
        description: "Artisanal ice cream and desserts made with local Wisconsin dairy",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "desserts",
        location: "Memorial Union Terrace",
        phone: "(608) 555-0126",
        menu: [
          { name: "Vanilla Bean Ice Cream", price: "$4.99", description: "Madagascar vanilla with local cream" },
          { name: "Wisconsin Cheese Curds Flavor", price: "$5.99", description: "Unique sweet & salty combination" },
          { name: "Chocolate Fudge Brownie", price: "$5.49", description: "Rich chocolate with brownie chunks" },
          { name: "Strawberry Rhubarb", price: "$5.49", description: "Made with local strawberries and rhubarb" },
          { name: "Ice Cream Sandwich", price: "$6.99", description: "House-made cookies with your choice of ice cream" },
          { name: "Milkshake", price: "$7.99", description: "Thick shake with any flavor" }
        ],
        schedule: {
          "Monday": "12:00 PM - 8:00 PM",
          "Tuesday": "12:00 PM - 8:00 PM",
          "Wednesday": "12:00 PM - 8:00 PM",
          "Thursday": "12:00 PM - 9:00 PM",
          "Friday": "12:00 PM - 10:00 PM",
          "Saturday": "11:00 AM - 10:00 PM",
          "Sunday": "12:00 PM - 8:00 PM"
        }
      },
      {
        slug: "farm-fresh",
        name: "Farm Fresh Kitchen",
        description: "Farm-to-table meals featuring seasonal Wisconsin ingredients",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "healthy",
        location: "Farmers Market",
        phone: "(608) 555-0127",
        menu: [
          { name: "Seasonal Salad Bowl", price: "$12.99", description: "Mixed greens with seasonal vegetables" },
          { name: "Farm Burger", price: "$13.99", description: "Grass-fed beef with local cheese" },
          { name: "Grilled Chicken Wrap", price: "$11.99", description: "Free-range chicken with fresh vegetables" },
          { name: "Vegetarian Quinoa Bowl", price: "$10.99", description: "Quinoa with roasted vegetables" },
          { name: "Sweet Corn Soup", price: "$6.99", description: "Made with local sweet corn" },
          { name: "Apple Crisp", price: "$5.99", description: "Made with Wisconsin apples" }
        ],
        schedule: {
          "Monday": "10:00 AM - 6:00 PM",
          "Tuesday": "10:00 AM - 6:00 PM",
          "Wednesday": "10:00 AM - 6:00 PM",
          "Thursday": "10:00 AM - 6:00 PM",
          "Friday": "10:00 AM - 7:00 PM",
          "Saturday": "8:00 AM - 7:00 PM",
          "Sunday": "10:00 AM - 5:00 PM"
        }
      },
      {
        slug: "noodle-nomad",
        name: "Noodle Nomad",
        description: "Asian fusion noodles and bowls with bold flavors and fresh ingredients",
        image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "asian",
        location: "State Street",
        phone: "(608) 555-0128",
        menu: [
          { name: "Pad Thai", price: "$11.99", description: "Classic Thai noodles with tamarind sauce" },
          { name: "Korean Bibimbap", price: "$12.99", description: "Rice bowl with mixed vegetables and gochujang" },
          { name: "Ramen Bowl", price: "$13.99", description: "Rich pork broth with fresh noodles" },
          { name: "Vietnamese Pho", price: "$12.99", description: "Beef pho with fresh herbs" },
          { name: "Spring Rolls (4pc)", price: "$6.99", description: "Fresh spring rolls with peanut sauce" },
          { name: "Fried Rice", price: "$9.99", description: "Wok-fried rice with vegetables and protein" }
        ],
        schedule: {
          "Monday": "Closed",
          "Tuesday": "11:00 AM - 8:00 PM",
          "Wednesday": "11:00 AM - 8:00 PM",
          "Thursday": "11:00 AM - 9:00 PM",
          "Friday": "11:00 AM - 9:00 PM",
          "Saturday": "11:00 AM - 9:00 PM",
          "Sunday": "12:00 PM - 7:00 PM"
        }
      }
    ];

    sampleTrucks.forEach(truck => {
      this.createFoodTruck(truck);
    });
  }

  async getFoodTrucks(): Promise<FoodTruck[]> {
    return Array.from(this.trucks.values());
  }

  async getFoodTruckBySlug(slug: string): Promise<FoodTruck | undefined> {
    return Array.from(this.trucks.values()).find(truck => truck.slug === slug);
  }

  async createFoodTruck(insertTruck: InsertFoodTruck): Promise<FoodTruck> {
    const id = this.currentId++;
    const truck: FoodTruck = { ...insertTruck, id };
    this.trucks.set(id, truck);
    return truck;
  }

  async searchFoodTrucks(query: string): Promise<FoodTruck[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.trucks.values()).filter(truck =>
      truck.name.toLowerCase().includes(searchTerm) ||
      truck.description.toLowerCase().includes(searchTerm) ||
      truck.category.toLowerCase().includes(searchTerm)
    );
  }

  async filterFoodTrucksByCategory(category: string): Promise<FoodTruck[]> {
    if (category === "all") {
      return this.getFoodTrucks();
    }
    return Array.from(this.trucks.values()).filter(truck => truck.category === category);
  }
}

export const storage = new MemStorage();
