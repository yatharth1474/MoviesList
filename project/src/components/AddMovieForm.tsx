import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Movie } from '../types/Movie';

interface AddMovieFormProps {
  onAddMovie: (movie: Omit<Movie, 'id' | 'isFavorite'>) => void;
}

const AddMovieForm: React.FC<AddMovieFormProps> = ({ onAddMovie }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    genre: '',
    director: '',
    rating: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.genre.trim() || !formData.director.trim()) {
      return;
    }

    onAddMovie({
      title: formData.title.trim(),
      year: formData.year,
      genre: formData.genre.trim(),
      director: formData.director.trim(),
      rating: formData.rating
    });

    setFormData({
      title: '',
      year: new Date().getFullYear(),
      genre: '',
      director: '',
      rating: 1
    });
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'rating' ? Number(value) : value
    }));
  };

  if (!isOpen) {
    return (
      <div className="mb-8">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Movie</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Add New Movie</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter movie title"
              />
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear() + 5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                Genre *
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g. Action, Drama, Comedy"
              />
            </div>

            <div>
              <label htmlFor="director" className="block text-sm font-medium text-gray-700 mb-2">
                Director *
              </label>
              <input
                type="text"
                id="director"
                name="director"
                value={formData.director}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter director name"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Rating (1-10)
              </label>
              <input
                type="range"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="10"
                step="0.1"
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1</span>
                <span className="font-medium text-blue-600">{formData.rating}</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Movie</span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;