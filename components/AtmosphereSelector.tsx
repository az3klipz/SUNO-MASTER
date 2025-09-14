import React from 'react';

interface AtmosphereSelectorProps {
  atmospheres: string[];
  selectedAtmosphere: string | null;
  onSelectAtmosphere: (atmosphere: string | null) => void;
}

const AtmosphereSelector: React.FC<AtmosphereSelectorProps> = ({ atmospheres, selectedAtmosphere, onSelectAtmosphere }) => {
  const handleSelect = (atmosphere: string) => {
    // Allow deselecting
    if (selectedAtmosphere === atmosphere) {
      onSelectAtmosphere(null);
    } else {
      onSelectAtmosphere(atmosphere);
    }
  };
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {atmospheres.map((atmosphere) => (
        <button
          key={atmosphere}
          onClick={() => handleSelect(atmosphere)}
          className={`
            p-3 rounded-lg font-semibold text-center text-sm transition-all duration-200 ease-in-out transform 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-400
            ${selectedAtmosphere === atmosphere
              ? 'bg-indigo-600 text-white shadow-lg scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }
          `}
        >
          {atmosphere}
        </button>
      ))}
    </div>
  );
};

export default AtmosphereSelector;
