import React, { useState } from 'react';
import LoadingSpinner from './icons/LoadingSpinner';

interface MagicWandModeProps {
    onEnhance: (prompt: string) => void;
    isLoading: boolean;
    onBack: () => void;
}

const MagicWandMode: React.FC<MagicWandModeProps> = ({ onEnhance, isLoading, onBack }) => {
    const [simplePrompt, setSimplePrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onEnhance(simplePrompt);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-100">Magic Wand</h2>
                <button onClick={onBack} className="px-3 py-1 text-sm font-medium text-indigo-300 bg-indigo-900/50 rounded-md hover:bg-indigo-900 transition-colors">
                    &larr; Back to Mode
                </button>
            </div>
            <p className="text-gray-400 mb-4">
                Enter a simple idea, and the AI will transform it into a hyper-detailed, master-level instrumental prompt for you.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={simplePrompt}
                    onChange={(e) => setSimplePrompt(e.target.value)}
                    rows={4}
                    placeholder="e.g., sad piano music for studying, or upbeat 80s synthwave for driving at night"
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-md p-2 font-mono text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-y"
                    aria-label="Simple prompt idea"
                />
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isLoading || !simplePrompt}
                        className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                            <LoadingSpinner />
                            <span className="ml-2">Enhancing...</span>
                            </div>
                        ) : (
                            'Enhance Prompt'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MagicWandMode;
