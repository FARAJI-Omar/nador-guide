import { useEffect, useMemo } from "react";
import { MapPin, CheckCircle, XCircle, Loader2, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllPlaces, selectAllPlaces, selectPlacesLoading } from "../../features/places/placesSlice";
import { fetchCategories, selectAllCategories } from "../../features/categories/categoriesSlice";
import Map from "../../components/common/Map";
import type { Place, Category } from "../../types";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const places = useAppSelector(selectAllPlaces);
  const categories = useAppSelector(selectAllCategories);
  const loading = useAppSelector(selectPlacesLoading);

  useEffect(() => {
    dispatch(fetchAllPlaces());
    dispatch(fetchCategories());
  }, [dispatch]);

  const stats = useMemo(() => {
    const total = places.length;
    const active = places.filter((p: Place) => p.isActive).length;
    const inactive = total - active;
    const byCategory = categories.map((category: Category) => ({
      name: category.name,
      count: places.filter((p: Place) => p.category.id === category.id).length,
      percentage: total > 0 ? ((places.filter((p: Place) => p.category.id === category.id).length / total) * 100).toFixed(0) : 0,
    }));
    const recentPlaces = [...places].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
    return { total, active, inactive, byCategory, recentPlaces };
  }, [places, categories]);

  if (loading && places.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 text-left">Overview</h1>
          <p className="text-slate-600 text-left">Monitor your destination listings and category performance.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 uppercase">Total Places</span>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 uppercase">Active</span>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.active}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 uppercase">Inactive</span>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.inactive}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 uppercase">Total Categories</span>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Tag className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{categories.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Map */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">Place Distribution</h2>
              </div>
            </div>
            <div className="h-96">
              {places.length > 0 && places[0].latitude && places[0].longitude ? (
                <Map latitude={places[0].latitude} longitude={places[0].longitude} name="Nador" />
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-100">
                  <p className="text-slate-500">No places available for display</p>
                </div>
              )}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-slate-900">Category Distribution</h2>
            </div>
            <div className="p-6 space-y-4">
              {stats.byCategory.map((cat: any) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{cat.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{cat.percentage}%</span>
                      <span className="text-sm font-bold text-slate-900">{cat.count}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${cat.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Places */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent new places</h2>
            <Link to="/admin/places" className="text-blue-600 text-sm font-medium hover:text-blue-700 no-underline">
              view all
            </Link>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Place Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentPlaces.map((place: Place) => (
                <tr key={place.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={place.images[0]} alt={place.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-medium text-slate-900">{place.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left text-slate-600">{place.category.name}</td>
                  <td className="px-6 py-4 text-left">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      place.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${place.isActive ? 'bg-green-600' : 'bg-gray-400'}`} />
                      {place.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
