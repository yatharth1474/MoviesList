import React from 'react';
import { Heart, Trash2, Star } from 'lucide-react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onToggleFavorite, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
              {movie.title}
            </h3>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-medium">Year:</span> {movie.year}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-medium">Genre:</span> {movie.genre}
            </p>
            <p className="text-gray-600 text-sm mb-3">
              <span className="font-medium">Director:</span> {movie.director}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-yellow-700 font-medium text-sm">{movie.rating}</span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onToggleFavorite(movie.id)}
              className={`p-2 rounded-full transition-all duration-200 ${
                movie.isFavorite
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
              title={movie.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart 
                className={`h-5 w-5 ${movie.isFavorite ? 'fill-current' : ''}`} 
              />
            </button>
            
            <button
              onClick={() => onDelete(movie.id)}
              className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
              title="Delete movie"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;