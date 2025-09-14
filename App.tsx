
import React, { useState, useCallback, useEffect } from 'react';
import { GENRE_CATEGORIES, GenreCategory, MOODS, VOCAL_STYLES, ATMOSPHERES, SONG_STRUCTURES, INSTRUMENTS } from './constants';
import { generateSunoPrompt, getArtistInspirations, enhanceSimplePrompt, GeneratePromptOptions } from './services/geminiService';
import GenreSelector from './components/GenreSelector';
import MoodSelector from './components/MoodSelector';
import PromptDisplay from './components/PromptDisplay';
import LoadingSpinner from './components/icons/LoadingSpinner';
import ModeToggle from './components/ModeToggle';
import VocalSelector from './components/VocalSelector';
import AtmosphereSelector from './components/AtmosphereSelector';
import StructureEditor from './components/StructureEditor';
import LockIcon from './components/icons/LockIcon';
import UnlockIcon from './components/icons/UnlockIcon';
import ArtistInspiration from './components/ArtistInspiration';
import MagicWandMode from './components/MagicWandMode';
import GenreBlender from './components/GenreBlender';
import InstrumentPalette from './components/InstrumentPalette';

type PromptMode = 'Instrumental' | 'Full Song' | 'Magic Wand';
type LockableField = 'genre' | 'mood' | 'vocal' | 'atmosphere' | 'influence' | 'instruments';

interface HistoryItem {
  id: string;
  prompt: string;
  // Common
  subgenre: string;
  mood: string | null;
  solfeggio: boolean;
  promptMode: PromptMode;
  // Advanced
  influenceGenre?: string | null;
  instruments?: string[];
  // Full Song
  vocalStyle?: string | null;
  atmosphere?: string | null;
  lyrics?: string;
  structure?: string;
  lyricalConcept?: string;
}

interface ShareableState {
    pm: PromptMode;
    sg: string;
    m: string | null;
    sol: boolean;
    ig?: string | null;
    ins?: string[];
    vs?: string | null;
    a?: string | null;
    l?: string;
    s?: string;
    lc?: string;
}

const App: React.FC = () => {
  const [promptMode, setPromptMode] = useState<PromptMode | null>(null);
  const [selectedMainGenre, setSelectedMainGenre] = useState<GenreCategory | null>(null);
  const [selectedSubgenre, setSelectedSubgenre] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [includeSolfeggio, setIncludeSolfeggio] = useState<boolean>(false);
  
  // Master Features State
  const [selectedInfluenceGenre, setSelectedInfluenceGenre] = useState<string | null>(null);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);

  // Full Song State
  const [selectedVocal, setSelectedVocal] = useState<string | null>(null);
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string>('');
  const [lyricalConcept, setLyricalConcept] = useState('');
  const [songStructure, setSongStructure] = useState<string>(SONG_STRUCTURES[0].structure);
  
  const [lockedFields, setLockedFields] = useState<Set<LockableField>>(new Set());
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingArtists, setIsFetchingArtists] = useState<boolean>(false);
  const [inspirationalArtists, setInspirationalArtists] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [promptHistory, setPromptHistory] = useState<HistoryItem[]>([]);

  const loadStateFromUrl = () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const data = params.get('s');
        if (data) {
            const decodedState: ShareableState = JSON.parse(atob(data));
            const category = GENRE_CATEGORIES.find(cat => cat.subgenres.includes(decodedState.sg));
            if (category) {
                setPromptMode(decodedState.pm);
                setSelectedMainGenre(category);
                setSelectedSubgenre(decodedState.sg);
                setSelectedMood(decodedState.m);
                setIncludeSolfeggio(decodedState.sol);
                setSelectedInfluenceGenre(decodedState.ig || null);
                setSelectedInstruments(decodedState.ins || []);
                setSelectedVocal(decodedState.vs || null);
                setSelectedAtmosphere(decodedState.a || null);
                setLyrics(decodedState.l || '');
                setSongStructure(decodedState.s || SONG_STRUCTURES[0].structure);
                setLyricalConcept(decodedState.lc || '');
                setLockedFields(new Set());
                // Clear URL params after loading
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    } catch (e) {
        console.error("Failed to load state from URL", e);
    }
  };

  useEffect(() => {
    loadStateFromUrl();
    try {
      const savedHistory = localStorage.getItem('sunoPromptHistory');
      if (savedHistory) {
        setPromptHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
    }
  }, []);

    useEffect(() => {
        if (selectedSubgenre) {
            const fetchArtists = async () => {
                setIsFetchingArtists(true);
                setInspirationalArtists([]);
                try {
                    const artists = await getArtistInspirations(selectedSubgenre);
                    setInspirationalArtists(artists);
                } catch (error) {
                    console.error("Failed to fetch artist inspirations:", error);
                } finally {
                    setIsFetchingArtists(false);
                }
            };
            fetchArtists();
        } else {
            setInspirationalArtists([]);
        }
    }, [selectedSubgenre]);

  const addToHistory = (item: Omit<HistoryItem, 'id'>) => {
    setPromptHistory(prevHistory => {
      const newHistory = [{ ...item, id: new Date().toISOString() }, ...prevHistory].slice(0, 5);
      try {
        localStorage.setItem('sunoPromptHistory', JSON.stringify(newHistory));
      } catch(e) {
        console.error("Failed to save history to localStorage", e);
      }
      return newHistory;
    });
  };

  const handleGeneratePrompt = useCallback(async () => {
    // FIX: Add check for 'Magic Wand' to satisfy TypeScript type for GeneratePromptOptions.
    // This function should not be called when in 'Magic Wand' mode anyway.
    if (!selectedSubgenre || !promptMode || promptMode === 'Magic Wand') {
      setError('Please complete all selections first.');
      return;
    }
    if (promptMode === 'Full Song' && !selectedVocal) {
        setError('Please select a vocal style for the full song.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    const options: GeneratePromptOptions = {
      promptMode,
      genre: selectedSubgenre,
      mood: selectedMood,
      includeSolfeggio,
      influenceGenre: selectedInfluenceGenre,
      instruments: selectedInstruments,
      vocalStyle: selectedVocal,
      atmosphere: selectedAtmosphere,
      lyrics: lyrics,
      structure: songStructure,
      lyricalConcept: lyricalConcept
    }

    try {
      const prompt = await generateSunoPrompt(options);
      setGeneratedPrompt(prompt);
      addToHistory({ 
          prompt, 
          subgenre: selectedSubgenre, 
          mood: selectedMood, 
          solfeggio: includeSolfeggio,
          promptMode,
          influenceGenre: selectedInfluenceGenre,
          instruments: selectedInstruments,
          vocalStyle: selectedVocal,
          atmosphere: selectedAtmosphere,
          lyrics,
          structure: songStructure,
          lyricalConcept
      });
    } catch (err) {
      setError('Failed to generate prompt. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [promptMode, selectedSubgenre, selectedMood, includeSolfeggio, selectedInfluenceGenre, selectedInstruments, selectedVocal, selectedAtmosphere, lyrics, songStructure, lyricalConcept]);
  
  const handleEnhancePrompt = useCallback(async (simplePrompt: string) => {
    if (!simplePrompt) {
        setError("Please enter a basic prompt idea.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
        const prompt = await enhanceSimplePrompt(simplePrompt);
        setGeneratedPrompt(prompt);
        // Not adding to history for now as it doesn't have the same settings structure
    } catch (err) {
        setError('Failed to enhance prompt. Please try again.');
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const resetSelections = () => {
    setSelectedMainGenre(null);
    setSelectedSubgenre(null);
    setSelectedMood(null);
    setSelectedVocal(null);
    setSelectedAtmosphere(null);
    setSelectedInfluenceGenre(null);
    setSelectedInstruments([]);
  };
  
  const handleRandomize = () => {
    if (!lockedFields.has('genre')) {
      const randomCategory = GENRE_CATEGORIES[Math.floor(Math.random() * GENRE_CATEGORIES.length)];
      const randomSubgenre = randomCategory.subgenres[Math.floor(Math.random() * randomCategory.subgenres.length)];
      setSelectedMainGenre(randomCategory);
      setSelectedSubgenre(randomSubgenre);
    }
    if (!lockedFields.has('mood')) {
        setSelectedMood(MOODS[Math.floor(Math.random() * MOODS.length)]);
    }
    if (!lockedFields.has('influence')) {
        const allSubgenres = GENRE_CATEGORIES.flatMap(c => c.subgenres);
        setSelectedInfluenceGenre(allSubgenres[Math.floor(Math.random() * allSubgenres.length)]);
    }
    if (!lockedFields.has('instruments')) {
        const shuffled = [...INSTRUMENTS].sort(() => 0.5 - Math.random());
        setSelectedInstruments(shuffled.slice(0, Math.floor(Math.random() * 3) + 1));
    }

    if (promptMode === 'Full Song') {
        if (!lockedFields.has('vocal')) {
          setSelectedVocal(VOCAL_STYLES[Math.floor(Math.random() * VOCAL_STYLES.length)]);
        }
        if (!lockedFields.has('atmosphere')) {
          setSelectedAtmosphere(ATMOSPHERES[Math.floor(Math.random() * ATMOSPHERES.length)]);
        }
    }
  };

  const toggleLock = (field: LockableField) => {
    setLockedFields(prev => {
        const newSet = new Set(prev);
        if (newSet.has(field)) {
            newSet.delete(field);
        } else {
            newSet.add(field);
        }
        return newSet;
    });
  };
  
  const handleToggleInstrument = (instrument: string) => {
    setSelectedInstruments(prev => {
        if (prev.includes(instrument)) {
            return prev.filter(i => i !== instrument);
        }
        if (prev.length < 3) {
            return [...prev, instrument];
        }
        return prev; // Max 3 reached
    });
  };

  const handleUseHistorySettings = (item: HistoryItem) => {
    const category = GENRE_CATEGORIES.find(cat => cat.subgenres.includes(item.subgenre));
    if (category) {
        setPromptMode(item.promptMode);
        setSelectedMainGenre(category);
        setSelectedSubgenre(item.subgenre);
        setSelectedMood(item.mood);
        setIncludeSolfeggio(item.solfeggio);
        setSelectedInfluenceGenre(item.influenceGenre || null);
        setSelectedInstruments(item.instruments || []);
        setSelectedVocal(item.vocalStyle || null);
        setSelectedAtmosphere(item.atmosphere || null);
        setLyrics(item.lyrics || '');
        setSongStructure(item.structure || SONG_STRUCTURES[0].structure);
        setLyricalConcept(item.lyricalConcept || '');
        setLockedFields(new Set()); // Reset locks when loading history
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        setError("Could not find the genre category for the selected history item.");
    }
  };

  const handleShare = () => {
    if (!promptMode || !selectedSubgenre) return;
    const state: ShareableState = {
        pm: promptMode,
        sg: selectedSubgenre,
        m: selectedMood,
        sol: includeSolfeggio,
        ig: selectedInfluenceGenre,
        ins: selectedInstruments,
        vs: selectedVocal,
        a: selectedAtmosphere,
        l: lyrics,
        s: songStructure,
        lc: lyricalConcept
    };
    const encodedState = btoa(JSON.stringify(state));
    const url = `${window.location.origin}${window.location.pathname}?s=${encodedState}`;
    navigator.clipboard.writeText(url);
  };

  const handleClearHistory = () => {
      setPromptHistory([]);
      try {
        localStorage.removeItem('sunoPromptHistory');
      } catch (e) {
        console.error("Failed to clear history from localStorage", e);
      }
  };

  const renderConfigRow = (label: string, value: string | null | string[], field: LockableField) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    const displayValue = Array.isArray(value) ? value.join(', ') : value;
    return (
        <div className="flex items-center justify-between text-gray-300 py-1 border-b border-gray-700/50 last:border-b-0">
            <p><span className="font-semibold text-gray-400 w-28 inline-block capitalize">{label}:</span> {displayValue}</p>
            <button 
                onClick={() => toggleLock(field)} 
                className="p-1 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                aria-label={lockedFields.has(field) ? `Unlock ${label}` : `Lock ${label}`}
            >
                {lockedFields.has(field) ? <LockIcon className="w-5 h-5 text-indigo-400"/> : <UnlockIcon className="w-5 h-5"/>}
            </button>
        </div>
    );
  };

  const renderArchitectUI = () => {
    if (!selectedMainGenre) {
        return (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-100">Choose a Genre Category</h2>
              <button onClick={() => setPromptMode(null)} className="px-3 py-1 text-sm font-medium text-indigo-300 bg-indigo-900/50 rounded-md hover:bg-indigo-900 transition-colors">
                &larr; Back to Mode
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {GENRE_CATEGORIES.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedMainGenre(category)}
                  className="p-4 rounded-lg font-semibold text-center transition-all duration-200 ease-in-out transform bg-gray-700 text-gray-300 hover:bg-indigo-600 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-400"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </>
        );
    }
    
    if (!selectedSubgenre) {
        return (
            <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-100">Choose a Subgenre</h2>
                  <button onClick={resetSelections} className="px-3 py-1 text-sm font-medium text-indigo-300 bg-indigo-900/50 rounded-md hover:bg-indigo-900 transition-colors">
                    &larr; Back to Categories
                  </button>
                </div>
                <GenreSelector genres={selectedMainGenre.subgenres} selectedGenre={null} onSelectGenre={setSelectedSubgenre} />
            </>
        );
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-100">Fine-tune Your Prompt</h2>
                <div className="flex items-center gap-2">
                    <button onClick={handleRandomize} className="px-3 py-1 text-sm font-medium text-purple-300 bg-purple-900/50 rounded-md hover:bg-purple-900 transition-colors">
                        🎲 Randomize Unlocked
                    </button>
                    <button onClick={() => setSelectedSubgenre(null)} className="px-3 py-1 text-sm font-medium text-indigo-300 bg-indigo-900/50 rounded-md hover:bg-indigo-900 transition-colors">
                        &larr; Back
                    </button>
                </div>
            </div>

            <ArtistInspiration artists={inspirationalArtists} isLoading={isFetchingArtists} />

            <div className="space-y-2 p-4 bg-gray-900/50 rounded-lg mb-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">Current Configuration</h3>
                {renderConfigRow('genre', selectedSubgenre, 'genre')}
                {renderConfigRow('influence', selectedInfluenceGenre, 'influence')}
                {renderConfigRow('instruments', selectedInstruments, 'instruments')}
                {renderConfigRow('mood', selectedMood, 'mood')}
                {promptMode === 'Full Song' && renderConfigRow('vocal', selectedVocal, 'vocal')}
                {promptMode === 'Full Song' && renderConfigRow('atmosphere', selectedAtmosphere, 'atmosphere')}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-100 mb-4 mt-8">Creative Tools</h2>

            <div className="mt-4 space-y-8">
                <div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-3">Genre Blender (Optional)</h3>
                    <GenreBlender allGenres={GENRE_CATEGORIES.flatMap(c=>c.subgenres)} selectedInfluence={selectedInfluenceGenre} onSelectInfluence={setSelectedInfluenceGenre} currentGenre={selectedSubgenre} />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-3">Instrument Palette (Optional, max 3)</h3>
                    <InstrumentPalette instruments={INSTRUMENTS} selectedInstruments={selectedInstruments} onToggleInstrument={handleToggleInstrument} />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-3">Select a Mood (Optional)</h3>
                    <MoodSelector moods={MOODS} selectedMood={selectedMood} onSelectMood={setSelectedMood} />
                </div>
                
                {promptMode === 'Full Song' && (
                  <>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-100 mb-3">Select a Vocal Style</h3>
                        <VocalSelector styles={VOCAL_STYLES} selectedStyle={selectedVocal} onSelectStyle={setSelectedVocal} />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-100 mb-3">Add Atmosphere (Optional)</h3>
                        <AtmosphereSelector atmospheres={ATMOSPHERES} selectedAtmosphere={selectedAtmosphere} onSelectAtmosphere={setSelectedAtmosphere} />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-100 mb-3">Define Structure & Lyrics</h3>
                        <StructureEditor 
                            structure={songStructure} 
                            setStructure={setSongStructure}
                            lyrics={lyrics}
                            setLyrics={setLyrics}
                            lyricalConcept={lyricalConcept}
                            setLyricalConcept={setLyricalConcept}
                        />
                    </div>
                  </>
                )}
            </div>

            <div className="mt-8 border-t border-gray-700 pt-6">
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  id="solfeggio"
                  checked={includeSolfeggio}
                  onChange={(e) => setIncludeSolfeggio(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500"
                  aria-labelledby="solfeggio-label"
                />
                <label id="solfeggio-label" htmlFor="solfeggio" className="ml-2 block text-sm text-gray-300">
                  Include Solfeggio Tones?
                </label>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleGeneratePrompt}
                  disabled={isLoading || !selectedSubgenre || (promptMode === 'Full Song' && !selectedVocal)}
                  className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner />
                      <span className="ml-2">Generating...</span>
                    </div>
                  ) : (
                    `Generate ${promptMode} Prompt`
                  )}
                </button>
              </div>
            </div>
        </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Suno Prompt Architect
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Your master co-producer for architecting the perfect Suno prompt.
          </p>
        </header>

        <main>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl shadow-indigo-500/10 border border-gray-700">
            {!promptMode ? (
                <div>
                     <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">What are you creating today?</h2>
                     <ModeToggle selectedMode={promptMode} onSelectMode={setPromptMode} />
                </div>
            ) : promptMode === 'Magic Wand' ? (
                <MagicWandMode onEnhance={handleEnhancePrompt} isLoading={isLoading} onBack={() => setPromptMode(null)} />
            ) : (
                renderArchitectUI()
            )}
          </div>
          
          {error && <div className="mt-6 p-4 text-center bg-red-900/50 border border-red-700 text-red-300 rounded-lg">{error}</div>}

          {generatedPrompt && (
            <div className="mt-8">
               <h2 className="text-2xl font-bold mb-4 text-gray-100">Your Generated Prompt</h2>
              <PromptDisplay prompt={generatedPrompt} onShare={handleShare} />
            </div>
          )}

          {promptHistory.length > 0 && (
             <div className="mt-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-100">Prompt History</h2>
                    <button onClick={handleClearHistory} className="px-3 py-1 text-sm font-medium text-red-300 bg-red-900/50 rounded-md hover:bg-red-900 transition-colors">
                        Clear History
                    </button>
                </div>
                <div className="space-y-4">
                    {promptHistory.map(item => (
                        <div key={item.id} className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
                            <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.prompt}</p>
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                                <span className="font-semibold px-2 py-1 bg-gray-700 rounded">{item.subgenre}</span>
                                {item.mood && <span className="px-2 py-1 bg-gray-700 rounded">{item.mood}</span>}
                                {item.influenceGenre && <span className="px-2 py-1 bg-gray-600 rounded">+{item.influenceGenre}</span>}
                                <span className="px-2 py-1 bg-blue-800 text-blue-200 rounded">{item.promptMode}</span>
                                {item.vocalStyle && <span className="px-2 py-1 bg-green-800 text-green-200 rounded">{item.vocalStyle}</span>}
                                {item.atmosphere && <span className="px-2 py-1 bg-teal-800 text-teal-200 rounded">{item.atmosphere}</span>}
                                {item.solfeggio && <span className="px-2 py-1 bg-purple-800 text-purple-200 rounded">Solfeggio</span>}
                            </div>
                            <div className="mt-3 flex gap-2">
                                <button onClick={() => navigator.clipboard.writeText(item.prompt)} className="px-3 py-1 text-xs font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">Copy</button>
                                <button onClick={() => handleUseHistorySettings(item)} className="px-3 py-1 text-xs font-medium text-indigo-300 bg-indigo-900/50 rounded-md hover:bg-indigo-900 transition-colors">Reuse Settings</button>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          )}
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Powered by Google Gemini. Designed for creativity.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
