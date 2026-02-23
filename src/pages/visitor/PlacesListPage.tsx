import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, AlertCircle, Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchActivePlaces, selectActivePlaces, selectPlacesLoading, selectPlacesError } from '../../features/places/placesSlice';
import { fetchCategories, selectAllCategories } from '../../features/categories/categoriesSlice';
import PlaceCard from '../../components/common/PlaceCard';
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
  
  const selectedCategory = searchParams.get('category');

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
    
    return result;
  }, [places, selectedCategory, searchQuery]);

  // Handle category filter
  const handleCategoryFilter = (slug: string | null) => {
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Discover Nador</h1>
        <p className="text-lg text-slate-600">Explore amazing places in the city</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search places... (min 3 characters)"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>
      
      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        <button
          onClick={() => handleCategoryFilter(null)}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
            selectedCategory === null
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
        >
          All Places
        </button>
        {categories.map((category: Category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryFilter(category.slug)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category.slug
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            {category.name}
          </button>
        ))}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place: Place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacesListPage;
