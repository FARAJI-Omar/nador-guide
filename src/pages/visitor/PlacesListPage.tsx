import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, AlertCircle, Search, Waves, TreePine, Landmark, Palette, ShoppingBag, UtensilsCrossed, Building2, Coffee, PartyPopper } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchActivePlaces, selectActivePlaces, selectPlacesLoading, selectPlacesError } from '../../features/places/placesSlice';
import { fetchCategories, selectAllCategories } from '../../features/categories/categoriesSlice';
import PlaceCard from '../../components/common/PlaceCard';
import Pagination from '../../components/common/Pagination';
import type { Place, Category } from '../../types';

/**
 * Places Listing Page - Modern & Minimalist Design
 * Phase 5 - Migrated to Redux ✅
 * 
 * Features:
 * - Fetch only active places from Redux
 * - Display in grid layout
 * - Loading state with spinner
 * - Empty state with icon
 * - Filter by category
 */
const PlacesListPage = () => {
  const dispatch = useAppDispatch();
  const places = useAppSelector(selectActivePlaces);
  const categories = useAppSelector(selectAllCategories);
  const loading = useAppSelector(selectPlacesLoading);
  const error = useAppSelector(selectPlacesError);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const selectedCategory = searchParams.get('category');

  const categoryIcons: Record<string, any> = {
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

  // Fetch data
  useEffect(() => {
    dispatch(fetchActivePlaces());
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // Filter places by category and search
  const filteredPlaces = useMemo(() => {
    let result = selectedCategory
      ? places.filter((place: Place) => place.category.slug === selectedCategory)
      : places;
    
    // Apply search filter (only if 3+ characters)
    if (searchQuery.length >= 3) {
      result = result.filter((place: Place) =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortBy === 'a-z') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'z-a') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }
    
    return result;
  }, [places, selectedCategory, searchQuery, sortBy]);

  // Paginate results
  const paginatedPlaces = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPlaces.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPlaces, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);

  // Handle category filter
  const handleCategoryFilter = (slug: string | null) => {
    setCurrentPage(1);
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  // Loading state
  if (loading && places.length === 0) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-slate-600">Loading places...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-3 text-red-600 bg-red-50 border border-red-200 rounded-lg px-6 py-4">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-base">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Search Bar - Centered */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a beach, museum, or park in Nador..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Category Filters - Icon Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => handleCategoryFilter(null)}
          className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 cursor-pointer ${
            selectedCategory === null
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-700 border border-gray-200 hover:border-blue-300'
          }`}
        >
          All Places
        </button>
        {categories.map((category: Category) => {
          const Icon = categoryIcons[category.slug] || Waves;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryFilter(category.slug)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === category.slug
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-gray-200 hover:border-blue-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Results Header */}
      <div className="flex items-start justify-between mb-8">
        <div className='text-left'>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {filteredPlaces.length} Places Found in Nador
          </h1>
          <p className="text-slate-600">Discover the best attractions and hidden gems in the city.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-700 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
          >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      {/* Places Grid */}
      {filteredPlaces.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-xl border border-gray-200">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <AlertCircle className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-lg text-slate-600">No places found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedPlaces.map((place: Place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredPlaces.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredPlaces.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default PlacesListPage;
