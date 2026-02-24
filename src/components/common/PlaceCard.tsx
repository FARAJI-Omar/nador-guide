import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ThumbsUp } from 'lucide-react';
import { type Place } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { likePlace, unlikePlace } from '../../features/places/placesSlice';
import { hasLikedPlace, addLikedPlace, removeLikedPlace } from '../../utils/likesStorage';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  const dispatch = useAppDispatch();
  const [liked, setLiked] = useState(() => hasLikedPlace(place.id));
  const likes = place.likes ?? 0;

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={place.images[0] || '/placeholder.jpg'}
          alt={place.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-full text-blue-600 font-bold text-xs uppercase">
          {place.category.name}
        </div>
        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            liked ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-gray-100'
          }`}
          title={liked ? 'Unlike' : 'Like'}
        >
          <ThumbsUp className={`w-4 h-4 ${liked ? 'text-white fill-white' : 'text-gray-400'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {place.name}
        </h3>
        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
          {place.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <>
              <ThumbsUp className="w-4 h-4 text-blue-500 fill-blue-500" />
              <span className=" text-slate-900 text-sm">({likes})</span>
            </>
          </div>
          <Link
            to={`/places/${place.id}`}
            className="text-blue-600 font-bold text-sm hover:text-blue-700 no-underline"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;

