import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { value: "all", label: "All Trucks" },
  { value: "burgers", label: "Burgers" },
  { value: "tacos", label: "Tacos" },
  { value: "bbq", label: "BBQ" },
  { value: "desserts", label: "Desserts" },
  { value: "healthy", label: "Healthy" },
  { value: "asian", label: "Asian" },
];

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: SearchFilterProps) {
  return (
    <section className="search-filter-section">
      <div className="search-filter-container">
        <div className="search-filter-content">
          <div className="search-input-container">
            <Search className="search-input-icon" />
            <Input
              type="text"
              placeholder="Search food trucks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="food-truck-search-input"
            />
          </div>
          <div className="category-filter-buttons">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "secondary"}
                size="sm"
                onClick={() => onCategoryChange(category.value)}
                className={selectedCategory === category.value 
                  ? `${category.value}-category-active` 
                  : `${category.value}-category-inactive`
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
