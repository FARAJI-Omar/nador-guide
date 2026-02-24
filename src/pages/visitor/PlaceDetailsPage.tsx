import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Info, Clock, Bus, Car, ParkingCircle, ThumbsUp, ArrowUp, MapPin, Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPlaceById, selectPlaceById, selectPlacesLoading, selectPlacesError, likePlace, unlikePlace } from '../../features/places/placesSlice';
import { hasLikedPlace, addLikedPlace, removeLikedPlace, computeScore } from '../../utils/likesStorage';
import Map from '../../components/common/Map';
import type { Place } from '../../types';

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
  const [liked, setLiked] = useState(() => (id ? hasLikedPlace(Number(id)) : false));

  const handleLike = () => {
    if (!place) return;
    if (liked) {
      removeLikedPlace(place.id);
      setLiked(false);
      dispatch(unlikePlace(place.id));
    } else {
      const added = addLikedPlace(place.id);
      if (added) {
        setLiked(true);
        dispatch(likePlace(place.id));
      }
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaceById(Number(id)));
    }
  }, [dispatch, id]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (loading && !place) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !place || !place.isActive) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-red-600 mb-4">{error || 'Place not found'}</p>
        <button onClick={() => navigate('/places')} className="text-blue-600 font-medium">Back to Places</button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
        <Link to="/places" className="hover:text-blue-600 no-underline">Destinations</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">{place.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">{place.name}</h1>
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 text-blue-600 font-medium">
              <MapPin className="w-5 h-5" />
              {place.category.name}
            </div>
            {(() => {
              const likes = place.likes ?? 0;
              const score = computeScore(likes);
              return score > 0 ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 text-sm">({likes} likes)</span>
                </div>
              ) : (
                <span className="text-slate-400 text-sm">No likes yet</span>
              );
            })()}
          </div>
        </div>
        <button
          onClick={() => navigate('/places')}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to List
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src={place.images[currentImageIndex]}
                alt={place.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-sm">
                {currentImageIndex + 1}/{place.images.length} Photos
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto">
              {place.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 ${
                    idx === currentImageIndex ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            {place.subtitle && <h2 className="text-2xl font-bold text-slate-900 mb-4">{place.subtitle}</h2>}
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{place.description}</p>
          </div>

          {/* Location */}
          {place.latitude && place.longitude && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Location</h2>
              <Map latitude={place.latitude} longitude={place.longitude} name={place.name} />
              <div className="flex items-start gap-2 mt-4 text-slate-600">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>{place.fullAddress || place.address}</span>
              </div>
              <button className="mt-4 inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                <MapPin className="w-4 h-4" />
                Open in Google Maps
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Practical Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-lg">Practical Information</h3>
            </div>

            <div className="mb-6">
              <p className="text-xs text-slate-500 uppercase mb-3">Opening Hours</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Mon - Fri</span>
                  <span className="font-medium">{place.bestVisitTime || '08:00 - 19:00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Sat - Sun</span>
                  <span className="font-medium">08:00 - 21:00</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 uppercase mb-3">Tariffs</p>
              <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-between">
                <span className="font-medium text-blue-900">Entrance Fee</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {place.tariff || 'FREE'}
                </span>
              </div>
            </div>
          </div>

          {/* How to get there */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bus className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-lg">How to get there</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bus className="w-5 h-5 text-blue-600" />
                </div>
                <div className='text-left'>
                  <p className="font-medium text-slate-900">Bus</p>
                  <p className="text-sm text-slate-600">{place.busInfo || 'Runs every 30 mins from City Center'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Car className="w-5 h-5 text-yellow-600" />
                </div>
                <div className='text-left'>
                  <p className="font-medium text-slate-900">Grand Taxi</p>
                  <p className="text-sm text-slate-600">{place.taxiInfo || 'Available from main square'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ParkingCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className='text-left'>
                  <p className="font-medium text-slate-900">Free Parking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-slate-600">Enjoyed {place.name}?</span>
          <button
            onClick={handleLike}
            className={`inline-flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg border transition-colors ${
              liked
                ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700'
                : 'bg-white border-gray-300 text-slate-700 hover:bg-gray-50'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
            <span className="text-sm font-medium">
              {liked ? 'Liked' : 'Like'} · {place.likes ?? 0}
            </span>
          </button>
        </div>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <ArrowUp className="w-4 h-4" />
          Back to Top
        </button>
      </div>
    </div>
  );
};

export default PlaceDetailsPage;
