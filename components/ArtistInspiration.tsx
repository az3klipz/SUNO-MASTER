import React from 'react';

interface ArtistInspirationProps {
  artists: string[];
  isLoading: boolean;
}

const ArtistInspiration: React.FC<ArtistInspirationProps> = ({ artists, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-400 mb-3">Fetching Artist Inspirations...</h3>
        <div className="flex flex-wrap gap-2 animate-pulse">
          {[...Array(5)].map((_, i) => (
             <div key={i} className="h-8 w-28 bg-gray-700 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!artists.length) {
    return null; // Don't render anything if there are no artists
  }

  return (
    <div className="mb-6 bg-gray-900/30 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-200 mb-3">Inspirational Artists</h3>
      <div className="flex flex-wrap gap-2">
        {artists.map(artist => (
          <span key={artist} className="px-3 py-1 bg-gray-700 text-gray-300 text-sm font-medium rounded-full">
            {artist}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArtistInspiration;