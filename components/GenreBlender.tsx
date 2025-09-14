import React from 'react';

interface GenreBlenderProps {
    allGenres: string[];
    selectedInfluence: string | null;
    onSelectInfluence: (genre: string | null) => void;
    currentGenre: string | null;
}

const GenreBlender: React.FC<GenreBlenderProps> = ({ allGenres, selectedInfluence, onSelectInfluence, currentGenre }) => {
    // Filter out the currently selected primary genre from the list of influence options
    const filteredGenres = allGenres.filter(g => g !== currentGenre);

    return (
        <div className="flex items-center gap-4">
            <select
                value={selectedInfluence || ''}
                onChange={(e) => onSelectInfluence(e.target.value || null)}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
                <option value="">None</option>
                {filteredGenres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                ))}
            </select>
            {selectedInfluence && (
                <button
                    onClick={() => onSelectInfluence(null)}
                    className="px-3 py-2 text-sm font-medium text-red-300 bg-red-900/50 rounded-md hover:bg-red-900 transition-colors"
                >
                    Clear
                </button>
            )}
        </div>
    );
};

export default GenreBlender;
