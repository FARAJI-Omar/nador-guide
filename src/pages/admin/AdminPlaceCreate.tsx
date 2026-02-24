import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus, Trash2, Image as ImageIcon, Loader2, AlertCircle, FileText, Info } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createPlace,
  selectPlacesLoading,
  selectPlacesError,
  selectPlaceById,
  fetchPlaceById,
  updatePlace,
} from "../../features/places/placesSlice";
import {
  fetchCategories,
  selectAllCategories,
} from "../../features/categories/categoriesSlice";
import MapPicker from "../../components/common/MapPicker";
import type { Category, Place } from "../../types";

const placeSchema = yup.object({
  name: yup
    .string()
    .required("Place name is required")
    .min(3, "Name must be at least 3 characters"),
  categoryId: yup
    .number()
    .required("Category is required")
    .min(1, "Please select a category"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  images: yup
    .array()
    .of(yup.string().url("Must be a valid URL").required())
    .min(1, "At least one image is required")
    .required(),
  subtitle: yup.string().optional(),
  price: yup.string().optional(),
  address: yup.string().optional(),
  fullAddress: yup.string().optional(),
  latitude: yup.number().optional(),
  longitude: yup.number().optional(),
  tariff: yup.string().optional(),
  bestVisitTime: yup.string().optional(),
  busInfo: yup.string().optional(),
  taxiInfo: yup.string().optional(),
  parking: yup.boolean().optional(),
  isActive: yup.boolean().optional(),
});

type PlaceFormData = {
  name: string;
  categoryId: number;
  description: string;
  images: string[];
  subtitle?: string;
  price?: string;
  address?: string;
  fullAddress?: string;
  latitude?: number;
  longitude?: number;
  tariff?: string;
  bestVisitTime?: string;
  busInfo?: string;
  taxiInfo?: string;
  parking?: boolean;
  isActive?: boolean;
};

const AdminPlaceCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);
  const loading = useAppSelector(selectPlacesLoading);
  const error = useAppSelector(selectPlacesError);
  const [mapLocation, setMapLocation] = useState<{ lat: number; lng: number } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PlaceFormData>({
    resolver: yupResolver(placeSchema) as any,
    defaultValues: {
      name: "",
      categoryId: 0,
      description: "",
      images: [""],
      subtitle: "",
      price: "",
      address: "",
      fullAddress: "",
      latitude: undefined,
      longitude: undefined,
      tariff: "",
      bestVisitTime: "",
      busInfo: "",
      taxiInfo: "",
      parking: false,
      isActive: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control as any,
    name: "images",
  });

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { id } = useParams();
  const isEditing = !!id;
  const existingPlace = useAppSelector((state) =>
    id ? selectPlaceById(state, Number(id)) : null,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaceById(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isEditing && existingPlace) {
      setValue("name", existingPlace.name);
      setValue("categoryId", existingPlace.category.id);
      setValue("description", existingPlace.description);
      setValue(
        "images",
        existingPlace.images.length > 0 ? existingPlace.images : [""],
      );
      setValue("subtitle", existingPlace.subtitle || "");
      setValue("price", existingPlace.price || "");
      setValue("address", existingPlace.address || "");
      setValue("fullAddress", existingPlace.fullAddress || "");
      setValue("latitude", existingPlace.latitude);
      setValue("longitude", existingPlace.longitude);
      setValue("tariff", existingPlace.tariff || "");
      setValue("bestVisitTime", existingPlace.bestVisitTime || "");
      setValue("busInfo", existingPlace.busInfo || "");
      setValue("taxiInfo", existingPlace.taxiInfo || "");
      setValue("parking", existingPlace.parking || false);
      setValue("isActive", existingPlace.isActive);
      if (existingPlace.latitude && existingPlace.longitude) {
        setMapLocation({ lat: existingPlace.latitude, lng: existingPlace.longitude });
      }
    }
  }, [isEditing, existingPlace, setValue]);

  const onSubmit = async (data: PlaceFormData) => {
    const category = categories.find(
      (cat: Category) => Number(cat.id) === Number(data.categoryId),
    );

    if (!category) {
      toast.error(`Please select a valid category.`);
      return;
    }

    const placeData: Omit<Place, 'id' | 'createdAt' | 'updatedAt'> = {
      name: data.name,
      category: category,
      description: data.description,
      images: data.images.filter((img) => img.trim() !== ""),
      subtitle: data.subtitle || undefined,
      price: data.price || undefined,
      address: data.address || undefined,
      fullAddress: data.fullAddress || undefined,
      latitude: mapLocation?.lat || undefined,
      longitude: mapLocation?.lng || undefined,
      tariff: data.tariff || undefined,
      bestVisitTime: data.bestVisitTime || undefined,
      busInfo: data.busInfo || undefined,
      taxiInfo: data.taxiInfo || undefined,
      parking: data.parking || false,
      isActive: data.isActive ?? true,
    };

    // const result = await dispatch(createPlace(placeData as any));

    // if (createPlace.fulfilled.match(result)) {
    //   alert('Place created successfully!');
    //   navigate('/admin/places');
    // }

    let result;
    if (isEditing && id) {
      result = await dispatch(
        updatePlace({
          id: Number(id),
          data: placeData,
        }),
      );
      if (updatePlace.fulfilled.match(result)) {
        toast.success("Place updated successfully!");
        navigate("/admin/places");
      } else {
        toast.error("Failed to update place");
      }
    } else {
      result = await dispatch(createPlace(placeData as any));
      if (createPlace.fulfilled.match(result)) {
        toast.success("Place created successfully!");
        navigate("/admin/places");
      } else {
        toast.error("Failed to create place");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {isEditing ? "Edit Place" : "Create New Place"}
          </h1>
          <p className="text-slate-600">
            Register a new landmark or business to the Nador directory.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
          {/* Primary Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold">Primary Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Place Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name")}
                  placeholder="e.g. Marchica Lagoon Park"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("categoryId", { valueAsNumber: true })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value={0}>Select a category</option>
                  {categories.map((cat: Category) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.categoryId && <p className="text-red-600 text-sm mt-1">{errors.categoryId.message}</p>}
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Briefly describe the attraction and what makes it special..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
            </div>
          </div>

          {/* Media Gallery */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold">Media Gallery</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">Upload high-quality images. Recommended size: 1200x800px.</p>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`images.${index}`)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => append("")}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Plus className="w-4 h-4" />
              ADD PHOTO
            </button>
          </div>

          {/* Secondary Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold">Secondary Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                <input
                  {...register("address")}
                  placeholder="Boulevard de la Corniche, Nador"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Opening Hours</label>
                <input
                  {...register("bestVisitTime")}
                  placeholder="e.g. 09:00 - 18:00"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Price Range</label>
                <input
                  {...register("tariff")}
                  placeholder="Free"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Transportation Details</label>
                <input
                  {...register("busInfo")}
                  placeholder="Closest bus stop or taxi station info..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Admission Fee Details</label>
                <input
                  {...register("subtitle")}
                  placeholder="Student discounts, family packages..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Map Picker */}
            <div className="mt-6">
              <MapPicker
                latitude={mapLocation?.lat}
                longitude={mapLocation?.lng}
                onLocationSelect={(lat, lng) => setMapLocation({ lat, lng })}
              />
            </div>

            {/* Checkboxes */}
            <div className="flex items-center gap-6 mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium">Visible to Public</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("parking")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium">Featured Place</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/places")}
              className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPlaceCreate;
