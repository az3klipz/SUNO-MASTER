import React from 'react';

interface InstrumentPaletteProps {
    instruments: string[];
    selectedInstruments: string[];
    onToggleInstrument: (instrument: string) => void;
}

const InstrumentPalette: React.FC<InstrumentPaletteProps> = ({ instruments, selectedInstruments, onToggleInstrument }) => {
    const isMaxReached = selectedInstruments.length >= 3;

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
            {instruments.map(instrument => {
                const isSelected = selectedInstruments.includes(instrument);
                return (
                    <button
                        key={instrument}
                        onClick={() => onToggleInstrument(instrument)}
                        disabled={!isSelected && isMaxReached}
                        className={`
                            p-3 rounded-lg font-semibold text-center text-sm transition-all duration-200 ease-in-out transform
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-400
                            ${isSelected
                                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                            }
                            ${!isSelected && isMaxReached ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        {instrument}
                    </button>
                );
            })}
        </div>
    );
};

export default InstrumentPalette;
