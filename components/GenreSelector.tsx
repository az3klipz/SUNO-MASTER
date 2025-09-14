
import React from 'react';

interface GenreSelectorProps {
  genres: string[];
  selectedGenre: string | null;
  onSelectGenre: (genre: string) => void;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ genres, selectedGenre, onSelectGenre }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelectGenre(genre)}
          className={`
            p-4 rounded-lg font-semibold text-center transition-all duration-200 ease-in-out transform 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-400
            ${selectedGenre === genre
              ? 'bg-indigo-600 text-white shadow-lg scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }
          `}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreSelector;
