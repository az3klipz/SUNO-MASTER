import React, { useState } from 'react';
import LoadingSpinner from './icons/LoadingSpinner';

interface MusicVideoModeProps {
    onGenerate: (prompt: string) => void;
    isLoading: boolean;
    onBack: () => void;
    treatment: string | null;
}

const MusicVideoMode: React.FC<MusicVideoModeProps> = ({ onGenerate, isLoading, onBack, treatment }) => {
    const [songPrompt, setSongPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(songPrompt);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-100">Music Video Treatment</h2>
                <button onClick={onBack} className="px-3 py-1 text-sm font-medium text-indigo-300 bg-indigo-900/50 rounded-md hover:bg-indigo-900 transition-colors">
                    &larr; Back to Mode
                </button>
            </div>
            <p className="text-gray-400 mb-4">
                Paste your finished Suno song prompt below. The AI will act as a visionary director to generate a scene-by-scene video treatment.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={songPrompt}
                    onChange={(e) => setSongPrompt(e.target.value)}
                    rows={10}
                    placeholder="[Verse]
A lone figure walks through a neon-lit, rain-slicked city street. The synth arpeggio reflects in the puddles...
(lyrics)..."
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-md p-2 font-mono text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-y"
                    aria-label="Finished song prompt"
                />
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isLoading || !songPrompt}
                        className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                            <LoadingSpinner />
                            <span className="ml-2">Generating...</span>
                            </div>
                        ) : (
                            'Generate Treatment'
                        )}
                    </button>
                </div>
            </form>
            {treatment && !isLoading && (
                 <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-100">Your Video Treatment</h2>
                    <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6">
                         <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed">
                            {treatment}
                        </pre>
                    </div>
                 </div>
            )}
        </div>
    );
};

export default MusicVideoMode;
