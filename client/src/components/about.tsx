import { Truck, MapPin } from "lucide-react";

import state_street_vimal_1 from "@assets/state-street-vimal-1.jpg";

export default function TrucksOnStateAboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content-grid">
          <div className="about-text-content">
            <h2 className="about-section-title">
              About Trucks on State
            </h2>
            <p className="about-description-first">
              We're passionate about connecting Madison's vibrant food truck community with hungry locals and visitors. 
              Our platform makes it easy to discover amazing mobile eateries throughout the city.
            </p>
            <p className="about-description-second">
              From State Street to the Capitol Square, from campus to the neighborhoods, food trucks bring incredible 
              diversity and flavor to Madison's culinary landscape. We're here to help you find your next favorite meal.
            </p>
            <div className="about-stats-container">
              <div className="food-trucks-stat">
                <div className="food-trucks-stat-icon-bg">
                  <Truck className="food-trucks-stat-icon" />
                </div>
                <div className="food-trucks-stat-content">
                  <h4 className="food-trucks-stat-number">25+ Food Trucks</h4>
                  <p className="food-trucks-stat-label">Active in Madison</p>
                </div>
              </div>
              <div className="locations-stat">
                <div className="locations-stat-icon-bg">
                  <MapPin className="locations-stat-icon" />
                </div>
                <div className="locations-stat-content">
                  <h4 className="locations-stat-number">15+ Locations</h4>
                  <p className="locations-stat-label">Around the city</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image-container">
            <img 
              src={state_street_vimal_1} 
              alt="Madison Wisconsin Capitol building" 
              className="about-hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
