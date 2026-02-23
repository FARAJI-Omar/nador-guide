import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Waves,
  UtensilsCrossed,
  Landmark,
  TreePine,
  ShoppingBag,
  ArrowRight,
  MapPin,
  Users,
  Building2,
  Coffee,
  Palette,
  PartyPopper,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchActivePlaces,
  selectAllPlaces,
} from "../../features/places/placesSlice";
import {
  fetchCategories,
  selectAllCategories,
} from "../../features/categories/categoriesSlice";
import type { Category, Place } from "../../types";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const categoriesFromRedux = useAppSelector(selectAllCategories);
  const places = useAppSelector(selectAllPlaces);

  useEffect(() => {
    if (categoriesFromRedux.length === 0) {
      dispatch(fetchCategories());
    }
    dispatch(fetchActivePlaces());
  }, [dispatch, categoriesFromRedux.length]);

  // Static icons mapping
  const iconMap: Record<string, any> = {
    beaches: Waves,
    "natural-sites": TreePine,
    "monuments-heritage": Landmark,
    "museums-culture": Palette,
    "shopping-souks": ShoppingBag,
    restaurants: UtensilsCrossed,
    "hotels-accommodations": Building2,
    cafes: Coffee,
    "leisure-entertainment": PartyPopper,
  };

  const colorMap: Record<string, string> = {
    beaches: "text-cyan-600",
    "natural-sites": "text-green-600",
    "monuments-heritage": "text-amber-600",
    "museums-culture": "text-purple-600",
    "shopping-souks": "text-pink-600",
    restaurants: "text-orange-600",
    "hotels-accommodations": "text-blue-600",
    cafes: "text-brown-600",
    "leisure-entertainment": "text-indigo-600",
  };

  const categories = categoriesFromRedux.map((cat: Category) => ({
    ...cat,
    icon: iconMap[cat.slug] || Waves,
    color: colorMap[cat.slug] || "text-blue-600",
  })) as Array<Category & { icon: any; color: string }>;

  const featuredPlaces = places.slice(0, 3);

  return (
    <div className="w-full space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl px-4 sm:px-8 py-24 shadow-lg shadow-blue-200/50">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=400&fit=crop"
          alt="Nador Beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/70 to-blue-600/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Welcome to Guidino
          </h1>
          <p className="text-lg sm:text-xl text-blue-50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover the hidden gems of Nador - from pristine beaches on the
            Marchica Lagoon to historic sites and authentic Moroccan cuisine.
          </p>
          <Link
            to="/places"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg no-underline text-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore All Places
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/places?category=${category.slug}`}
                className="group relative bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl text-center no-underline shadow-md hover:shadow-lg border border-blue-200 hover:border-blue-400 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4 group-hover:scale-110 transition-transform duration-200 shadow-md">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Places Section */}
      {featuredPlaces.length > 0 && (
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Top Attractions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Check out the most popular places in Nador
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPlaces.map((place: Place) => (
              <Link
                key={place.id}
                to={`/places/${place.id}`}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 no-underline border border-blue-100 hover:border-blue-300"
              >
                {place.images && place.images[0] && (
                  <div className="overflow-hidden h-48 relative">
                    <img
                      src={place.images[0]}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Blue accent badge */}
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      {place.category.name}
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                    {place.description}
                  </p>
                  {place.address && (
                    <div className="flex items-start gap-2 text-sm text-slate-500">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{place.address}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/places"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg no-underline font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              View All Places
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}

      {/* Why Nador Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 sm:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Why Choose Nador?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience the best of Morocco with Guidino
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Waves,
              title: "Pristine Beaches",
              description: "Relax on beautiful beaches overlooking the Marchica Lagoon with crystal clear waters."
            },
            {
              icon: UtensilsCrossed,
              title: "Authentic Cuisine",
              description: "Taste authentic Moroccan dishes and fresh Mediterranean seafood at local restaurants."
            },
            {
              icon: Users,
              title: "Warm Welcome",
              description: "Experience the hospitality of local people and immerse yourself in the culture."
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Explore?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Start discovering the amazing places Nador has to offer right now
        </p>
        <Link
          to="/places"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg no-underline text-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Begin Your Journey
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
