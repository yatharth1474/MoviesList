import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Movie } from '../types/Movie';
import MovieList from './MovieList';

interface FavoriteListProps {
  favoriteMovies: Movie[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onClearFavorites: () => void;
}

const FavoriteList: React.FC<FavoriteListProps> = ({
  favoriteMovies,
  onToggleFavorite,
  onDelete,
  onClearFavorites
}) => {
  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Heart className="h-6 w-6 text-red-600 fill-current" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Favorites</h2>
            <p className="text-gray-600">
              {favoriteMovies.length} {favoriteMovies.length === 1 ? 'movie' : 'movies'}
            </p>
          </div>
        </div>
        
        {favoriteMovies.length > 0 && (
          <button
            onClick={onClearFavorites}
            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-all duration-200 flex items-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>
      
      <MovieList
        movies={favoriteMovies}
        onToggleFavorite={onToggleFavorite}
        onDelete={onDelete}
        title=""
      />
    </div>
  );
};

export default FavoriteList;