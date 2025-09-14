import React from 'react';

interface MoodSelectorProps {
  moods: string[];
  selectedMood: string | null;
  onSelectMood: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ moods, selectedMood, onSelectMood }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => onSelectMood(mood)}
          className={`
            p-4 rounded-lg font-semibold text-center transition-all duration-200 ease-in-out transform 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-400
            ${selectedMood === mood
              ? 'bg-indigo-600 text-white shadow-lg scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }
          `}
        >
          {mood}
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
