import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Waves, UtensilsCrossed, Landmark, TreePine, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCategories, selectAllCategories } from '../../features/categories/categoriesSlice';
import type { Category } from '../../types';


const HomePage = () => {
  const dispatch = useAppDispatch();
  const categoriesFromRedux = useAppSelector(selectAllCategories);

  useEffect(() => {
    if (categoriesFromRedux.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesFromRedux.length]);

  // Static icons mapping
  const iconMap: Record<string, any> = {
    beaches: Waves,
    restaurants: UtensilsCrossed,
    'historical-sites': Landmark,
    'parks-nature': TreePine,
    shopping: ShoppingBag,
  };

  const colorMap: Record<string, string> = {
    beaches: 'text-cyan-600',
    restaurants: 'text-orange-600',
    'historical-sites': 'text-amber-600',
    'parks-nature': 'text-green-600',
    shopping: 'text-purple-600',
  };

  const categories = categoriesFromRedux.map((cat: Category) => ({
    ...cat,
    icon: iconMap[cat.slug] || Waves,
    color: colorMap[cat.slug] || 'text-blue-600',
  })) as Array<Category & { icon: any; color: string }>;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-50 rounded-xl mb-16 px-4 sm:px-8 py-20">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Welcome to <span className="text-blue-600">Nador</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover the hidden gems of Nador - from pristine beaches on the Marchica Lagoon
            to historic sites and authentic Moroccan cuisine.
          </p>
          <Link 
            to="/places" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg no-underline text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Explore All Places
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Decorative background circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      </section>

      {/* Categories Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find exactly what you're looking for
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/places?category=${category.slug}`}
                className="group bg-white p-8 rounded-xl text-center no-underline shadow-sm hover:shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                  {category.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
