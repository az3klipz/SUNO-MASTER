
import React from 'react';
import { SONG_STRUCTURES } from '../constants';

interface StructureEditorProps {
    structure: string;
    setStructure: (structure: string) => void;
    lyrics: string;
    setLyrics: (lyrics: string) => void;
    lyricalConcept: string;
    setLyricalConcept: (concept: string) => void;
}

const StructureEditor: React.FC<StructureEditorProps> = ({ structure, setStructure, lyrics, setLyrics, lyricalConcept, setLyricalConcept }) => {
  
  const handleStructureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const selectedStructure = SONG_STRUCTURES.find(s => s.name === selectedName);
    if (selectedStructure) {
        setStructure(selectedStructure.structure);
    }
  };

  return (
    <div className="bg-gray-900/50 p-4 rounded-lg space-y-4">
        <div>
            <label htmlFor="structure-select" className="block text-sm font-medium text-gray-300 mb-1">
                Common Structures
            </label>
            <select 
                id="structure-select"
                onChange={handleStructureChange}
                // Find name from structure value, fallback to Custom
                value={SONG_STRUCTURES.find(s => s.structure === structure)?.name || 'Custom'}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
                {SONG_STRUCTURES.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                ))}
            </select>
            <input
                type="text"
                value={structure}
                onChange={(e) => setStructure(e.target.value)}
                placeholder="e.g. [Intro] [Verse] [Chorus]..."
                className="mt-2 w-full bg-gray-800 border border-gray-600 text-white rounded-md p-2 font-mono text-sm focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Song Structure"
            />
        </div>
        <div>
            <label htmlFor="lyrical-concept" className="block text-sm font-medium text-gray-300 mb-1">
                Lyrical Concept (if no lyrics)
            </label>
            <input
                id="lyrical-concept"
                type="text"
                value={lyricalConcept}
                onChange={(e) => setLyricalConcept(e.target.value)}
                placeholder="e.g., a lonely astronaut watching Earth from afar"
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Lyrical Concept"
                disabled={!!lyrics}
            />
             <p className="mt-1 text-xs text-gray-500">
                Provide a concept and the AI will generate lyrics for you. Disabled if you provide your own lyrics below.
            </p>
        </div>
        <div>
            <label htmlFor="lyrics-input" className="block text-sm font-medium text-gray-300 mb-1">
                Your Lyrics (Optional)
            </label>
            <textarea
                id="lyrics-input"
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                rows={10}
                placeholder="Enter your lyrics here. You can use markers like (Verse 1) or (Chorus) to guide the AI, but it's not required."
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-md p-2 font-mono text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-y"
            />
        </div>
    </div>
  );
};

export default StructureEditor;
