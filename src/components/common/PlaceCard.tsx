import { Link } from 'react-router-dom';
import { MapPin, DollarSign } from 'lucide-react';
import { type Place } from '../../types';

/**
 * Place Card Component - Modern & Minimalist Design
 * 
 * Displays place information in card format
 * - Refined shadows and hover effects
 * - Icon for category badge
 * - Improved image aspect ratio
 * - Subtle border
 */
interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <Link 
      to={`/places/${place.id}`} 
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 no-underline block"
    >
      {/* Image */}
      <div className="w-full h-56 overflow-hidden bg-slate-100">
        <img
          src={place.images[0] || '/placeholder.jpg'}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x250?text=No+Image';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium mb-3">
          <MapPin className="w-3.5 h-3.5" />
          {place.category.name}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
          {place.name}
        </h3>

        {/* Description */}
        <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {place.description.length > 120
            ? `${place.description.substring(0, 120)}...`
            : place.description}
        </p>

        {/* Price */}
        {place.price && (
          <div className="flex items-center gap-1.5 text-lg text-green-600 font-bold">
            <DollarSign className="w-5 h-5" />
            {place.price}
          </div>
        )}
      </div>
    </Link>
  );
};

export default PlaceCard;
