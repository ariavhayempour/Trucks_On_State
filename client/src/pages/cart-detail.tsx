import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SiteNavigationHeader from "@/components/header";
import SiteContactFooter from "@/components/footer";
import { isCurrentlyOpen } from "@/lib/utils";
import { ArrowLeft, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { FoodCart, MenuItem } from "@shared/schema";

export default function IndividualFoodCartDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: cart, isLoading, error } = useQuery<FoodCart>({
    queryKey: [`/api/food-carts/${slug}`],
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteNavigationHeader />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Food Cart Not Found</h1>
            <p className="text-gray-600 mb-8">The food cart you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <SiteContactFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteNavigationHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Carts
          </Button>
        </Link>

        {isLoading && (
          <div className="space-y-8">
            <Skeleton className="w-full h-64 rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        )}

        {cart && (
          <div className="space-y-8">
            {/* Hero Image */}
            <div className="relative">
              <img 
                src={cart.image}
                alt={cart.name}
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isCurrentlyOpen(cart.schedule)
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isCurrentlyOpen(cart.schedule) ? 'Open Now' : 'Closed'}
                </span>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cart Info */}
              <div className="space-y-6">
                <div>
                  <div className="mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{cart.name}</h1>
                  </div>
                  <p className="text-lg text-gray-600">{cart.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>{cart.location}</span>
                  </div>
                </div>

                {/* Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                        <div key={day} className="flex justify-between">
                          <span className="font-medium">{day}</span>
                          <span className="text-gray-600">{cart.schedule[day]}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Menu */}
              <div className="space-y-6">
                {cart.slug === "sandwich-hub" ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Menu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Sandwich Hub has a rotating menu and is subject to change. Please check their website to find the menu of the day!
                      </p>
                      <div className="mt-4">
                        <a 
                          href="https://www.sandwichhubmadison.com/menu" 
                          className="text-primary hover:text-primary/80 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Today's Menu
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Menu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>

                           {/* Fresh cool drinks */}
                          {cart.slug === "fresh-cool" && (
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">Springrolls</h2>
                          )}

                           {/* Toast */}
                          {cart.slug === "toast" && (
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">Classic Paninis</h2>
                          )}

                          {/* Jolly Frog */}
                          {cart.slug === "jolly-frog" ? (
                            <>
                              <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">Tacos with Rice & Beans (2 per order)</h2>
                              <div className="space-y-4 mb-6">
                                {cart.menu.slice(0, 3).map((item, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                      </div>
                                      <span className="font-semibold text-primary ml-4">{item.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">Burrito / Bowl (chips on the side)</h2>
                              <div className="space-y-4 mb-6">
                                {cart.menu.slice(3, 5).map((item, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                      </div>
                                      <span className="font-semibold text-primary ml-4">{item.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">Tostadas with Rice (2 per order)</h2>
                              <div className="space-y-4 mb-6">
                                {cart.menu.slice(5, 7).map((item, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                      </div>
                                      <span className="font-semibold text-primary ml-4">{item.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">Nachos</h2>
                              <div className="space-y-4 mb-6">
                                {cart.menu.slice(8, 10).map((item, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                      </div>
                                      <span className="font-semibold text-primary ml-4">{item.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">Build Your Own </h2>
                              <div className="space-y-4">
                                {cart.menu.slice(7, 8).map((item, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                      </div>
                                      <span className="font-semibold text-primary ml-4">{item.price}</span>

                                      {/* Jolly Frog */}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : cart.slug === "surco" ? (
                            (() => {
                              const groupedMenu = cart.menu.reduce((acc, item) => {
                                const category = item.category || 'Uncategorized';
                                if (!acc[category]) {
                                  acc[category] = [];
                                }
                                acc[category].push(item);
                                return acc;
                              }, {} as Record<string, MenuItem[]>);

                              const categoryOrder = ["Chicken Dishes", "Vegetarian Dishes", "Extras", "Beverages"];

                              return categoryOrder.map(category => (
                                groupedMenu[category] && (
                                  <React.Fragment key={category}>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">{category}</h2>
                                    <div className="space-y-4 mb-6">
                                      {groupedMenu[category].map((item, index) => (
                                        <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                          <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                              <h5 className="font-medium text-gray-900">{item.name}</h5>
                                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                            </div>
                                            <span className="font-semibold text-primary ml-4">{item.price}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </React.Fragment>
                                )
                              ));
                            })()
                          ) : cart.slug === "roost" ? (
                            <>
                              <div className="flex justify-between items-baseline mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 underline">Jumbo 1/4 lb Chicken Tenders</h2>
                                <span className="font-semibold text-gray-900">Tenders / Meal</span>
                              </div>
                              <div className="space-y-4 mb-6">
                                {cart.menu.slice(0, 3).map((item, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                      </div>
                                      <span className="font-semibold text-primary ml-4">{item.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="flex justify-between items-baseline mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 underline">Chicken Sandwiches</h2>
                                <span className="font-semibold text-gray-900">Sandwich / Meal</span>
                              </div>
                              <div className="space-y-4 mb-6">
                                {cart.menu.slice(3, 6).map((item, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                      </div>
                                      <span className="font-semibold text-primary ml-4">{item.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="flex justify-between items-baseline mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 underline">Sides</h2>
                                <span className="font-semibold text-gray-900">Small / Large</span>
                              </div>
                              <div className="space-y-4 mb-6">
                                {cart.menu.slice(6, 9).map((item, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                      </div>
                                      <span className="font-semibold text-primary ml-4">{item.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">Extras</h2>
                              <div className="space-y-4">
                                {cart.menu.slice(9, 12).map((item, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                      </div>
                                      <span className="font-semibold text-primary ml-4">{item.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : cart.slug === "new-food-cart" ? (
                            <>
                              <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">Main Dishes</h2>
                              <div className="space-y-4 mb-6">
                                {cart.menu.slice(0, 4).map((item, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                      </div>
                                      <span className="font-semibold text-primary ml-4">{item.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">Sides</h2>
                              <div className="space-y-4 mb-6">
                                {cart.menu.slice(4, 5).map((item, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                      </div>
                                      <span className="font-semibold text-primary ml-4">{item.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">Patties</h2>
                              <div className="space-y-4">
                                {cart.menu.slice(5, 6).map((item, index) => (
                                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                      </div>
                                      <span className="font-semibold text-primary ml-4">{item.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <div className="space-y-4">
                              {cart.menu.map((item, index) => (
                                <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <h5 className="font-medium text-gray-900">{item.name}</h5>
                                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                    </div>
                                    <span className="font-semibold text-primary ml-4">{item.price}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Business Links - Hidden for Fresh Cool Drinks */}
                {cart.slug !== "fresh-cool" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-col gap-2">
                          {cart.businessLinks?.website && (
                            <a 
                              href={cart.businessLinks.website}
                              className="text-primary hover:text-primary/80 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit Website
                            </a>
                          )}
                          {cart.businessLinks?.facebook && (
                            <a 
                              href={cart.businessLinks.facebook}
                              className="text-primary hover:text-primary/80 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Facebook Page
                            </a>
                          )}
                          {cart.businessLinks?.instagram && (
                            <a 
                              href={cart.businessLinks.instagram}
                              className="text-primary hover:text-primary/80 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Instagram
                            </a>
                          )}
                          {cart.businessLinks?.orderOnline && (
                            <a 
                              href={cart.businessLinks.orderOnline}
                              className="text-primary hover:text-primary/80 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Order Online
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <SiteContactFooter />
    </div>
  );
}
