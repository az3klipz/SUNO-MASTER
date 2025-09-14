import React from 'react';

interface VocalSelectorProps {
  styles: string[];
  selectedStyle: string | null;
  onSelectStyle: (style: string) => void;
}

const VocalSelector: React.FC<VocalSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {styles.map((style) => (
        <button
          key={style}
          onClick={() => onSelectStyle(style)}
          className={`
            p-3 rounded-lg font-semibold text-center text-sm transition-all duration-200 ease-in-out transform 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-400
            ${selectedStyle === style
              ? 'bg-indigo-600 text-white shadow-lg scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }
          `}
        >
          {style}
        </button>
      ))}
    </div>
  );
};

export default VocalSelector;
