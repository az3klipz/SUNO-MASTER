
import React, { useState, useRef } from 'react';
import LoadingSpinner from './icons/LoadingSpinner';
import { AnalysisResult } from '../services/geminiService';

interface AnalyzeTrackModeProps {
    onAnalyze: (source: string | File) => void;
    isLoading: boolean;
    onBack: () => void;
    result: AnalysisResult | null;
    onUseAnalysis: (result: AnalysisResult, mode: 'Instrumental' | 'Full Song') => void;
}

const MAX_FILE_SIZE = 14 * 1024 * 1024; // 14 MB

const AnalyzeTrackMode: React.FC<AnalyzeTrackModeProps> = ({ onAnalyze, isLoading, onBack, result, onUseAnalysis }) => {
    const [url, setUrl] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > MAX_FILE_SIZE) {
                setError(`File is too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
                return;
            }
            setError(null);
            setFile(selectedFile);
            setUrl(''); // Clear URL if a file is selected
        }
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
        if (event.target.value) {
            setFile(null); // Clear file if URL is being typed
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (file) {
            onAnalyze(file);
        } else if (url) {
            onAnalyze(url);
        } else {
            setError("Please provide a URL or upload an audio file.");
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-100">Analyze Track</h2>
                <button onClick={onBack} className="px-3 py-1 text-sm font-medium text-indigo-300 bg-indigo-900/50 rounded-md hover:bg-indigo-900 transition-colors">
                    &larr; Back to Mode
                </button>
            </div>
            <p className="text-gray-400 mb-4">
                Provide a song URL or upload an audio file to have the AI analyze its style.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <input
                    type="url"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    aria-label="Track URL"
                />

                <div className="relative flex items-center justify-center">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="audio/*"
                        aria-label="Upload audio file"
                    />
                    <button
                        type="button"
                        onClick={triggerFileSelect}
                        className="w-full text-center px-6 py-2 bg-gray-700 text-gray-300 font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300"
                    >
                        {file ? `Selected: ${file.name}` : 'Upload Audio File'}
                    </button>
                    <p className="text-xs text-gray-500 mt-1 text-center">Max file size: {MAX_FILE_SIZE / 1024 / 1024}MB</p>
                </div>
                 {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading || (!url && !file)}
                        className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <LoadingSpinner /> : 'Analyze'}
                    </button>
                </div>
            </form>

            {result && (
                <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700 space-y-3">
                    <h3 className="text-xl font-bold text-white">Analysis Result</h3>
                    <div>
                        <p className="text-sm text-gray-400">Subgenre</p>
                        <p className="text-lg font-semibold text-gray-200">{result.subgenre}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Mood</p>
                        <p className="text-lg font-semibold text-gray-200">{result.mood}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">BPM & Key</p>
                        <p className="text-lg font-semibold text-gray-200">{result.bpm} BPM, {result.key}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Core Instruments</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {result.instruments.map(inst => (
                                <span key={inst} className="px-3 py-1 bg-gray-700 text-gray-300 text-sm font-medium rounded-full">
                                    {inst}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            onClick={() => onUseAnalysis(result, 'Instrumental')}
                            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
                        >
                            Create Instrumental
                        </button>
                         <button
                            onClick={() => onUseAnalysis(result, 'Full Song')}
                            className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
                        >
                            Create Full Song
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalyzeTrackMode;