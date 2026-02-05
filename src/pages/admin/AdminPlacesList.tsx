import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchAllPlaces,
  deletePlace,
  togglePlaceStatus,
  selectAllPlaces,
  selectPlacesLoading,
  selectPlacesError,
} from "../../features/places/placesSlice";
import {
  fetchCategories,
  selectAllCategories,
} from "../../features/categories/categoriesSlice";
import type { Place, Category } from "../../types";


const AdminPlacesList = () => {
  const dispatch = useAppDispatch();
  const places = useAppSelector(selectAllPlaces);
  const categories = useAppSelector(selectAllCategories);
  const loading = useAppSelector(selectPlacesLoading);
  const error = useAppSelector(selectPlacesError);

  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "category" | "status">("name");

  // Fetch data
  useEffect(() => {
    dispatch(fetchAllPlaces());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Toggle place status
  const handleToggleStatus = async (id: number) => {
    await dispatch(togglePlaceStatus(id));
  };

  // Delete place
  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }
    await dispatch(deletePlace(id));
  };

  // Filter and sort places
  const filteredAndSortedPlaces = useMemo(() => {
    return places
      .filter((place: Place) => {
        if (
          filterCategory !== "all" &&
          place.category.slug !== filterCategory
        ) {
          return false;
        }
        if (filterStatus === "active" && !place.isActive) return false;
        if (filterStatus === "inactive" && place.isActive) return false;
        return true;
      })
      .sort((a: Place, b: Place) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === "category") {
          return a.category.name.localeCompare(b.category.name);
        }
        if (sortBy === "status") {
          return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
        }
        return 0;
      });
  }, [places, filterCategory, filterStatus, sortBy]);

  // Loading state
  if (loading && places.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading places...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Manage Places
            </h2>
            <p className="text-slate-600">View, edit, and manage all places</p>
          </div>
          <Link
            to="/admin/places/create"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 no-underline shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add New Place
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-200"
              >
                <option value="all">All Categories</option>
                {categories.map((cat: Category) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "name" | "category" | "status")
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-200"
              >
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Places Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Place
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredAndSortedPlaces.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                        <AlertCircle className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-slate-500">
                        No places found matching your filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedPlaces.map((place: Place) => (
                    <tr
                      key={place.id}
                      className="hover:bg-slate-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              place.images[0] ||
                              "https://via.placeholder.com/50"
                            }
                            alt={place.name}
                            className="w-14 h-14 rounded-lg object-cover ring-1 ring-gray-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/50?text=No+Image";
                            }}
                          />
                          <div>
                            <div className="font-semibold text-slate-900">
                              {place.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1.5 text-sm font-medium bg-blue-100 text-blue-700 rounded-lg">
                          {place.category.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {place.isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-green-100 text-green-700 rounded-lg">
                            <Eye className="w-4 h-4" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-red-100 text-red-700 rounded-lg">
                            <EyeOff className="w-4 h-4" />
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-medium">
                        {place.price || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {/* Edit Button */}
                          <Link
                            to={`/admin/places/edit/${place.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium no-underline"
                            title="Edit place"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Link>

                          {/* Toggle Status Button */}
                          <button
                            onClick={() => handleToggleStatus(place.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                              place.isActive
                                ? "bg-orange-600 text-white hover:bg-orange-700"
                                : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                            title={place.isActive ? "Deactivate" : "Activate"}
                          >
                            {place.isActive ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                            {place.isActive ? "Hide" : "Show"}
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(place.id, place.name)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-sm font-medium"
                            title="Delete place"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="text-sm text-slate-600 font-medium">
          Showing {filteredAndSortedPlaces.length} of {places.length} places
        </div>
      </div>
    </div>
  );
};

export default AdminPlacesList;
