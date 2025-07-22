import React, { useState, useMemo } from 'react';
import { Film, Search, Heart } from 'lucide-react';
import { Movie } from './types/Movie';
import { sampleMovies } from './data/sampleMovies';
import { useLocalStorage } from './hooks/useLocalStorage';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import FavoriteList from './components/FavoriteList';
import SearchBar from './components/SearchBar';

function App() {
  const [movies, setMovies] = useLocalStorage<Movie[]>('movieList', sampleMovies);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = useMemo(() => {
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  const favoriteMovies = useMemo(() => {
    return movies.filter(movie => movie.isFavorite);
  }, [movies]);

  const handleAddMovie = (newMovieData: Omit<Movie, 'id' | 'isFavorite'>) => {
    const newMovie: Movie = {
      ...newMovieData,
      id: Date.now().toString(),
      isFavorite: false
    };
    setMovies(prev => [...prev, newMovie]);
  };

  const handleToggleFavorite = (id: string) => {
    setMovies(prev =>
      prev.map(movie =>
        movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
      )
    );
  };

  const handleDeleteMovie = (id: string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(prev => prev.filter(movie => movie.id !== id));
    }
  };

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      setMovies(prev =>
        prev.map(movie => ({ ...movie, isFavorite: false }))
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
              <Film className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Movie List
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover, organize, and manage your favorite movies in one beautiful place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Film className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{movies.length}</p>
                <p className="text-gray-600">Total Movies</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{favoriteMovies.length}</p>
                <p className="text-gray-600">Favorites</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Search className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{filteredMovies.length}</p>
                <p className="text-gray-600">Search Results</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Movie Form */}
        <AddMovieForm onAddMovie={handleAddMovie} />

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Favorites Section */}
        {favoriteMovies.length > 0 && (
          <div className="mb-12">
            <FavoriteList
              favoriteMovies={favoriteMovies}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDeleteMovie}
              onClearFavorites={handleClearFavorites}
            />
          </div>
        )}

        {/* All Movies Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <MovieList
            movies={filteredMovies}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteMovie}
            title={searchTerm ? `Search Results (${filteredMovies.length})` : 'All Movies'}
          />
        </div>
      </div>
    </div>
  );
}

export default App;