import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createPlace, selectPlacesLoading, selectPlacesError } from '../../features/places/placesSlice';
import { fetchCategories, selectAllCategories } from '../../features/categories/categoriesSlice';
import type { Category } from '../../types';

/**
 * Create Place Form - Modern & Minimalist Design
 * Redux integrated for state management
 * 
 * Features:
 * - React Hook Form + Yup validation
 * - Required fields with visual indicators
 * - Image URLs input with add/remove
 * - Redux async thunk for creation
 * - Redirect to list on success
 */

// Validation Schema
const placeSchema = yup.object({
  name: yup.string().required('Place name is required').min(3, 'Name must be at least 3 characters'),
  categoryId: yup.number().required('Category is required').min(1, 'Please select a category'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  images: yup.array().of(yup.string().url('Must be a valid URL').required()).min(1, 'At least one image is required').required(),
  price: yup.string().optional(),
  address: yup.string().optional(),
  isActive: yup.boolean().optional(),
});

type PlaceFormData = {
  name: string;
  categoryId: number;
  description: string;
  images: string[];
  price?: string;
  address?: string;
  isActive?: boolean;
};

const AdminPlaceCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);
  const loading = useAppSelector(selectPlacesLoading);
  const error = useAppSelector(selectPlacesError);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PlaceFormData>({
    resolver: yupResolver(placeSchema) as any,
    defaultValues: {
      name: '',
      categoryId: 0,
      description: '',
      images: [''],
      price: '',
      address: '',
      isActive: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control as any,
    name: 'images',
  });

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onSubmit = async (data: PlaceFormData) => {
    const category = categories.find((cat: Category) => Number(cat.id) === Number(data.categoryId));
    
    if (!category) {
      return;
    }

    const placeData = {
      name: data.name,
      category: category,
      description: data.description,
      images: data.images.filter((img) => img.trim() !== ''),
      price: data.price || undefined,
      address: data.address || undefined,
      isActive: data.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await dispatch(createPlace(placeData as any));

    if (createPlace.fulfilled.match(result)) {
      alert('Place created successfully!');
      navigate('/admin/places');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/places')}
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Create New Place</h2>
          <p className="text-slate-600">Add a new place to Nador Guide</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit as any)} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
            Place Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-200"
            placeholder="e.g., Plage Marchica"
          />
          {errors.name && <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.name.message}
          </p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="categoryId" className="block text-sm font-semibold text-slate-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="categoryId"
            {...register('categoryId', { valueAsNumber: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-200"
          >
            <option value={0}>Select a category</option>
            {categories.map((cat: Category) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.categoryId.message}
          </p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-200 resize-none"
            placeholder="Describe the place in detail..."
          />
          {errors.description && <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.description.message}
          </p>}
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Image URLs <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="url"
                    {...register(`images.${index}`)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-200"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="inline-flex items-center gap-1.5 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors.images && <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.images.message as string}
            </p>}
          </div>
          <button
            type="button"
            onClick={() => append('')}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-200 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Another Image
          </button>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-2">
            Price (Optional)
          </label>
          <input
            type="text"
            id="price"
            {...register('price')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-200"
            placeholder="e.g., Free, 20 MAD, $$"
          />
          <p className="text-sm text-slate-500 mt-1">Leave empty if free or price varies</p>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mb-2">
            Address (Optional)
          </label>
          <input
            type="text"
            id="address"
            {...register('address')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-200"
            placeholder="e.g., Marchica Lagoon, Nador"
          />
        </div>

        {/* Active Status */}
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
          <input
            type="checkbox"
            id="isActive"
            {...register('isActive')}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-3 focus:ring-blue-500/50"
          />
          <label htmlFor="isActive" className="text-sm font-semibold text-slate-700 cursor-pointer">
            Make this place active (visible to visitors immediately)
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Place'
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/places')}
            className="px-8 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPlaceCreate;
