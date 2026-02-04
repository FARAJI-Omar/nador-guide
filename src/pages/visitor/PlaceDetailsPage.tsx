import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, DollarSign, Bus, Loader2, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPlaceById, selectPlaceById, selectPlacesLoading, selectPlacesError } from '../../features/places/placesSlice';
import type { Transport } from '../../types';

/**
 * Place Details Page - Modern & Minimalist Design
 * Phase 5 - Migrated to Redux ✅
 * 
 * Sections:
 * - Image gallery with thumbnails
 * - Full description
 * - Category badge
 * - Opening hours with icon
 * - Price with icon
 * - Address with icon
 * - Transport & accessibility with icon
 */
const PlaceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const place = useAppSelector((state) => selectPlaceById(state, Number(id)));
  const loading = useAppSelector(selectPlacesLoading);
  const error = useAppSelector(selectPlacesError);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaceById(Number(id)));
    }
  }, [dispatch, id]);

  if (loading && !place) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-slate-600">Loading place details...</p>
        </div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-3 text-red-600 bg-red-50 border border-red-200 rounded-lg px-6 py-4 mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-base">{error || 'Place not found'}</p>
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate('/places')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Places
          </button>
        </div>
      </div>
    );
  }

  // Check if place is active (visitor should only see active places)
  if (!place.isActive) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-3 text-red-600 bg-red-50 border border-red-200 rounded-lg px-6 py-4 mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-base">This place is not currently available.</p>
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate('/places')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Places
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Back Button */}
      <button
        onClick={() => navigate('/places')}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 text-base font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Places
      </button>

      {/* Image Gallery */}
      <div className="mb-10">
        <div className="w-full h-[500px] bg-slate-100 rounded-xl overflow-hidden mb-4 border border-gray-200">
          <img
            src={place.images[currentImageIndex] || 'https://via.placeholder.com/800x400?text=No+Image'}
            alt={`${place.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=No+Image';
            }}
          />
        </div>
        
        {/* Image Thumbnails */}
        {place.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {place.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all duration-200 ${
                  currentImageIndex === index 
                    ? 'ring-3 ring-blue-500 shadow-md' 
                    : 'ring-1 ring-gray-200 hover:ring-blue-300'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=No+Image';
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Title and Category */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg mb-4 font-medium">
          <MapPin className="w-4 h-4" />
          {place.category.name}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">{place.name}</h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">About</h2>
            <p className="text-slate-600 leading-relaxed text-lg">{place.description}</p>
          </section>

          {/* Opening Hours */}
          {place.openingHours && (
            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-slate-900">Opening Hours</h2>
              </div>
              <div className="space-y-3">
                {Object.entries(place.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
                    <span className="font-medium capitalize text-slate-700">{day}</span>
                    <span className="text-slate-600">{(hours as string | undefined) || 'Closed'}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Transport & Accessibility */}
          {place.transport && place.transport.length > 0 && (
            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Bus className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-slate-900">How to Get There</h2>
              </div>
              <div className="space-y-4">
                {place.transport.map((transport: Transport, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-semibold capitalize shrink-0">
                      {transport.type}
                    </div>
                    <p className="text-slate-600 leading-relaxed">{transport.details}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          {/* Price */}
          {place.price && (
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-slate-600" />
                <h2 className="text-lg font-semibold text-slate-900">Price</h2>
              </div>
              <p className="text-3xl font-bold text-green-600">{place.price}</p>
            </section>
          )}

          {/* Address */}
          {place.address && (
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-slate-600" />
                <h2 className="text-lg font-semibold text-slate-900">Address</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">{place.address}</p>
            </section>
          )}

          {/* Quick Info Card */}
          <section className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Info</h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-slate-700">Category:</span>{' '}
                <span className="text-slate-600">{place.category.name}</span>
              </div>
              {place.price && (
                <div>
                  <span className="font-semibold text-slate-700">Entry Fee:</span>{' '}
                  <span className="text-slate-600">{place.price}</span>
                </div>
              )}
              {!place.openingHours && (
                <div className="text-slate-500 italic">Opening hours not available</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsPage;
