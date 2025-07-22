import React from 'react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ 
  movies, 
  onToggleFavorite, 
  onDelete, 
  title 
}) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">{title}</h3>
        <p className="text-gray-500">No movies to display</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;