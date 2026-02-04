import { useEffect, useMemo } from 'react';
import { MapPin, CheckCircle, XCircle, Loader2, TrendingUp } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAllPlaces, selectAllPlaces, selectPlacesLoading } from '../../features/places/placesSlice';
import { fetchCategories, selectAllCategories } from '../../features/categories/categoriesSlice';
import type { Place, Category } from '../../types';

/**
 * Admin Dashboard - Modern & Minimalist Design
 * Redux integrated for state management
 * 
 * Display:
 * - Total places with icon
 * - Active vs inactive with icons
 * - Places per category with progress bars
 */
const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const places = useAppSelector(selectAllPlaces);
  const categories = useAppSelector(selectAllCategories);
  const loading = useAppSelector(selectPlacesLoading);

  useEffect(() => {
    dispatch(fetchAllPlaces());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Calculate stats from Redux state
  const stats = useMemo(() => {
    const total = places.length;
    const active = places.filter((p: Place) => p.isActive).length;
    const inactive = total - active;

    // Count places by category
    const byCategory = categories.map((category: Category) => ({
      name: category.name,
      count: places.filter((p: Place) => p.category.id === category.id).length,
    }));

    return {
      total,
      active,
      inactive,
      byCategory,
    };
  }, [places, categories]);

  if (loading && places.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-6 py-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h2>
        <p className="text-slate-600">Overview of Nador Guide places</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Places */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Places</p>
              <p className="text-4xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Active Places */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Active Places</p>
              <p className="text-4xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>

        {/* Inactive Places */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Inactive Places</p>
              <p className="text-4xl font-bold text-red-600">{stats.inactive}</p>
            </div>
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-7 h-7 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Places by Category */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-slate-900">Places by Category</h3>
          </div>
        </div>
        <div className="p-6">
          {stats.byCategory.length === 0 ? (
            <p className="text-center text-slate-500 py-8">No data available</p>
          ) : (
            <div className="space-y-5">
              {stats.byCategory.map((category: { name: string; count: number }) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{category.name}</span>
                    <span className="text-sm font-semibold text-slate-900">{category.count}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${stats.total > 0 ? (category.count / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
