import { useEffect, useMemo } from "react";
import {
  MapPin,
  CheckCircle,
  XCircle,
  Loader2,
  TrendingUp,
  Calendar,
  Eye,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchAllPlaces,
  selectAllPlaces,
  selectPlacesLoading,
} from "../../features/places/placesSlice";
import {
  fetchCategories,
  selectAllCategories,
} from "../../features/categories/categoriesSlice";
import type { Place, Category } from "../../types";

/**
 * Admin Dashboard - Enhanced Modern Design
 * Redux integrated for state management
 *
 * Features:
 * - Key metrics with animated cards
 * - Category distribution with visual bars
 * - Recent places overview
 * - Gradient backgrounds & hover effects
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
      slug: category.slug,
      count: places.filter((p: Place) => p.category.id === category.id).length,
    }));

    // Get recent places (last 5)
    const recentPlaces = [...places]
      .sort(
        (a: Place, b: Place) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);

    return {
      total,
      active,
      inactive,
      byCategory,
      recentPlaces,
      activePercentage: total > 0 ? Math.round((active / total) * 100) : 0,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard Overview</h1>
              <p className="text-blue-100 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Welcome to Nador Guide Admin Panel
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics - Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Places - Gradient Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-70" />
            </div>
            <p className="text-blue-100 text-sm font-medium mb-1">
              Total Places
            </p>
            <p className="text-4xl font-bold">{stats.total}</p>
          </div>

          {/* Active Places */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                {stats.activePercentage}%
              </span>
            </div>
            <p className="text-green-100 text-sm font-medium mb-1">
              Active Places
            </p>
            <p className="text-4xl font-bold">{stats.active}</p>
          </div>

          {/* Inactive Places */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                {stats.total > 0
                  ? Math.round((stats.inactive / stats.total) * 100)
                  : 0}
                %
              </span>
            </div>
            <p className="text-red-100 text-sm font-medium mb-1">
              Inactive Places
            </p>
            <p className="text-4xl font-bold">{stats.inactive}</p>
          </div>

          {/* Categories Count */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <Eye className="w-5 h-5 opacity-70" />
            </div>
            <p className="text-purple-100 text-sm font-medium mb-1">
              Categories
            </p>
            <p className="text-4xl font-bold">{categories.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Places by Category - Enhanced */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Category Distribution
                  </h3>
                  <p className="text-sm text-slate-600">
                    Places across categories
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {stats.byCategory.length === 0 ? (
                <p className="text-center text-slate-500 py-8">
                  No data available
                </p>
              ) : (
                <div className="space-y-6">
                  {stats.byCategory.map(
                    (category: {
                      name: string;
                      slug: string;
                      count: number;
                    }) => {
                      const percentage =
                        stats.total > 0
                          ? (category.count / stats.total) * 100
                          : 0;
                      return (
                        <div key={category.slug} className="group">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                              {category.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-500">
                                {percentage.toFixed(1)}%
                              </span>
                              <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-lg">
                                {category.count}
                              </span>
                            </div>
                          </div>
                          <div className="relative w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 shadow-sm"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Recent Places */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-indigo-50 px-6 py-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Recent Places
                  </h3>
                  <p className="text-sm text-slate-600">Latest additions</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {stats.recentPlaces.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No places yet</p>
              ) : (
                <div className="space-y-4">
                  {stats.recentPlaces.map((place: Place) => (
                    <div
                      key={place.id}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 border border-transparent hover:border-slate-200"
                    >
                      <div className="flex-shrink-0">
                        {place.images && place.images[0] ? (
                          <img
                            src={place.images[0]}
                            alt={place.name}
                            className="w-16 h-16 rounded-lg object-cover shadow-sm"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-slate-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-900 truncate mb-1">
                          {place.name}
                        </h4>
                        <p className="text-xs text-slate-600 mb-2">
                          {place.category.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              place.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {place.isActive ? "Active" : "Inactive"}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(place.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
