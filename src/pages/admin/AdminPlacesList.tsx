import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus, Edit, Trash2, Loader2, AlertCircle, Search, MoreVertical, Star, ThumbsUp } from "lucide-react";
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
import Pagination from "../../components/common/Pagination";
import type { Place, Category } from "../../types";

const AdminPlacesList = () => {
  const dispatch = useAppDispatch();
  const places = useAppSelector(selectAllPlaces);
  const categories = useAppSelector(selectAllCategories);
  const loading = useAppSelector(selectPlacesLoading);
  const error = useAppSelector(selectPlacesError);

  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    dispatch(fetchAllPlaces());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleToggleStatus = async (id: number) => {
    await dispatch(togglePlaceStatus(id));
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    const result = await dispatch(deletePlace(id));
    if (deletePlace.fulfilled.match(result)) {
      toast.success(`"${name}" deleted successfully!`);
    } else {
      toast.error("Failed to delete place");
    }
  };

  const filteredPlaces = useMemo(() => {
    return places.filter((place: Place) => {
      if (filterCategory !== "all" && place.category.slug !== filterCategory) return false;
      if (filterStatus === "active" && !place.isActive) return false;
      if (filterStatus === "inactive" && place.isActive) return false;
      if (searchQuery.length >= 2) {
        const query = searchQuery.toLowerCase();
        return place.name.toLowerCase().includes(query) || place.category.name.toLowerCase().includes(query);
      }
      return true;
    });
  }, [places, filterCategory, filterStatus, searchQuery]);

  const paginatedPlaces = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPlaces.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPlaces, currentPage]);

  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);

  if (loading && places.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-slate-600">Loading places...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <AlertCircle className="w-5 h-5" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 text-left">Place Management</h1>
            <p className="text-slate-600">Manage and monitor all registered locations in Nador city.</p>
          </div>
          <Link to="/admin/places/create" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 no-underline">
            <Plus className="w-5 h-5" />
            Add New Place
          </Link>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or category..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="all">Category: All</option>
              {categories.map((cat: Category) => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="all">Status: All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Date Added</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Likes</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedPlaces.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">No places found</p>
                  </td>
                </tr>
              ) : (
                paginatedPlaces.map((place: Place) => (
                  <tr key={place.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={place.images[0]} alt={place.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-semibold text-slate-900">{place.name}</p>
                          <p className="text-sm text-slate-500">{place.address || 'No address'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {place.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(place.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${place.isActive ? 'text-green-700' : 'text-gray-600'}`}>
                        <span className={`w-2 h-2 rounded-full ${place.isActive ? 'bg-green-600' : 'bg-gray-400'}`} />
                        {place.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-slate-900">{place.likes ?? 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end relative" ref={openMenuId === place.id ? menuRef : null}>
                        <button onClick={() => setOpenMenuId(openMenuId === place.id ? null : place.id)} className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        {openMenuId === place.id && (
                          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-[150px]">
                            <Link to={`/admin/places/edit/${place.id}`} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-slate-700 no-underline" onClick={() => setOpenMenuId(null)}>
                              <Edit className="w-4 h-4" />
                              Edit
                            </Link>
                            <button onClick={() => { handleToggleStatus(place.id); setOpenMenuId(null); }} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left ${
                              place.isActive ? 'text-orange-600' : 'text-green-600'
                            }">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {place.isActive ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                )}
                              </svg>
                              {place.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button onClick={() => { handleDelete(place.id, place.name); setOpenMenuId(null); }} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-red-600 w-full text-left">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {filteredPlaces.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredPlaces.length)} of {filteredPlaces.length} results
                </p>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredPlaces.length}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPlacesList;
