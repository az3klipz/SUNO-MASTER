import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

type PromptMode = 'Instrumental' | 'Full Song' | 'Magic Wand';

interface ModeToggleProps {
  selectedMode: PromptMode | null;
  onSelectMode: (mode: PromptMode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ selectedMode, onSelectMode }) => {
  const modes: { name: PromptMode; description: string; icon?: React.ReactNode }[] = [
    { name: 'Instrumental', description: 'Craft a detailed prompt for an instrumental track.' },
    { name: 'Full Song', description: 'Architect a complete song with vocals, lyrics, and structure.' },
    { name: 'Magic Wand', description: 'Enhance a simple idea into a master-level prompt.', icon: <SparklesIcon className="w-6 h-6 mr-2 text-yellow-400" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {modes.map((mode) => (
        <button
          key={mode.name}
          onClick={() => onSelectMode(mode.name)}
          className={`
            p-6 rounded-lg text-left transition-all duration-200 ease-in-out transform 
            border-2
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-400
            ${selectedMode === mode.name
              ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg scale-105'
              : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
            }
          `}
        >
          <div className="flex items-center">
            {mode.icon}
            <h3 className="text-xl font-bold">{mode.name}</h3>
          </div>
          <p className="mt-1 text-gray-300">{mode.description}</p>
        </button>
      ))}
    </div>
  );
};

export default ModeToggle;