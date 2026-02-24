import { useEffect, useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Mountain, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchActivePlaces,
  selectAllPlaces,
} from "../../features/places/placesSlice";
import {
  fetchCategories,
  selectAllCategories,
} from "../../features/categories/categoriesSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const categoriesFromRedux = useAppSelector(selectAllCategories);
  const places = useAppSelector(selectAllPlaces);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (categoriesFromRedux.length === 0) {
      dispatch(fetchCategories());
    }
    dispatch(fetchActivePlaces());
  }, [dispatch, categoriesFromRedux.length]);

  const categoryImages: Record<string, string> = {
    beaches: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    "museums-culture": "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=300&fit=crop",
    "natural-sites": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    restaurants: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    "museums-culture-alt": "https://images.unsplash.com/photo-1580974852861-c381510bc98a?w=400&h=300&fit=crop",
  };

  const displayCategories = categoriesFromRedux.slice(0, 5);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-125 overflow-hidden">
       <div>
         <img
          src="/src/assets/nador-maroc.jpg"
          alt="Nador Beach"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        />
       </div>
        {/* <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/50"></div> */}
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        
            <div className="max-w-4xl ">
            <p className="text-sm text-white/90 uppercase tracking-widest mb-4 font-semibold">
              EXPERIENCE MOROCCO
            </p>
            <div className=" text-shadow-lg p-2 rounded-2xl shadow-2xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 ">
                Nador: Pearl of the <span className="text-blue-400">Mediterranean</span>
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Discover the hidden gem of the North where the azure sea meets the majestic Rif mountains.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/places"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg no-underline font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Now
              </Link>
              <button
                onClick={() => setShowVideo(true)}
                className="bg-transparent text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors border-2 border-white"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <video
              controls
              autoPlay
              className="w-full rounded-lg"
              src="/src/assets/Nador is the Hidden Gem Coastal City of Morocco.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Explore Categories Section */}
      <section className="py-16 mt-4 rounded-2xl px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Categories</h2>
              <p className="text-gray-600">Everything you need to plan your perfect stay in Nador.</p>
            </div>
            <Link to="/places" className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all no-underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {displayCategories.map((category: { id: Key | null | undefined; slug: string | number; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: any) => (
              <Link
                key={category.id}
                to={`/places?category=${category.slug}`}
                className="group relative h-64 rounded-2xl overflow-hidden no-underline shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={categoryImages[category.slug] || categoryImages["natural-sites"]}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gateway to Mediterranean Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Images Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/b0/e8/75/prachtige-boulevard-die.jpg?w=600&h=-1&s=1"
                    alt="Marchica Lagoon"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div className="space-y-4 pt-12">
                  <img
                    src="https://s1.lematin.ma/files/lematin/images/articles/2021/08/1630007093_Gourougou.jpg"
                    alt="Mountain View"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold mb-4 bg-blue-50 px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                Must Visit Destination
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                The Gateway to the Mediterranean
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Experience the unique harmony between the azure sea and the majestic Rif mountains. 
                Nador is home to the Marchica lagoon, one of the most important wetlands in the Mediterranean basin.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-left">Marchica Lagoon</h4>
                    <p className="text-sm text-gray-600 text-left">A stunning natural lagoon with diverse marine life</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Mountain className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-left">Gourougou Mount</h4>
                    <p className="text-sm text-gray-600 text-left">Breathtaking panoramic views of the entire region</p>
                  </div>
                </div>
              </div>

              <Link
                to="/places"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors no-underline"
              >
                Learn More About Nador
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
