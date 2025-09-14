import React, { useState, useEffect } from 'react';
import CopyIcon from './icons/CopyIcon';
import EditIcon from './icons-2/EditIcon';
import ShareIcon from './icons/ShareIcon';

interface PromptDisplayProps {
  prompt: string;
  onShare: () => void;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt, onShare }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedPrompt, setEditedPrompt] = useState<string>(prompt);

  useEffect(() => {
    // When a new prompt is generated, reset the state
    setEditedPrompt(prompt);
    setIsEditing(false);
  }, [prompt]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    if (shared) {
      const timer = setTimeout(() => setShared(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [shared]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedPrompt);
    setCopied(true);
  };

  const handleShare = () => {
    onShare();
    setShared(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPrompt(prompt);
    setIsEditing(false);
  }

  return (
    <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6">
      <div className="absolute top-4 right-4 flex gap-2">
        {isEditing ? (
            <>
                <button
                    onClick={handleSave}
                    className="p-2 bg-green-800 text-green-200 rounded-md hover:bg-green-700 transition-colors duration-200"
                    aria-label="Save changes"
                >
                    Save
                </button>
                <button
                    onClick={handleCancel}
                    className="p-2 bg-red-800 text-red-200 rounded-md hover:bg-red-700 transition-colors duration-200"
                    aria-label="Cancel editing"
                >
                    Cancel
                </button>
            </>
        ) : (
            <>
                <button
                    onClick={handleShare}
                    className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-400"
                    aria-label="Share prompt configuration"
                >
                    <ShareIcon className="w-5 h-5 text-gray-300" />
                </button>
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-400"
                    aria-label="Edit prompt"
                >
                    <EditIcon className="w-5 h-5 text-gray-300" />
                </button>
                <button
                    onClick={handleCopy}
                    className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-400"
                    aria-label="Copy prompt to clipboard"
                >
                    <CopyIcon className="w-5 h-5 text-gray-300" />
                </button>
            </>
        )}
      </div>
      
      {isEditing ? (
        <textarea
            value={editedPrompt}
            onChange={(e) => setEditedPrompt(e.target.value)}
            className="w-full h-64 bg-gray-800 border border-gray-600 text-white rounded-md p-2 font-mono text-sm sm:text-base leading-relaxed focus:ring-indigo-500 focus:border-indigo-500 resize-y"
            aria-label="Editable prompt text"
        />
      ) : (
        <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm sm:text-base leading-relaxed pr-24">
            {editedPrompt}
        </pre>
      )}

      {copied && (
        <div className="absolute bottom-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">
          Copied!
        </div>
      )}
      {shared && (
        <div className="absolute bottom-4 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">
          Link Copied!
        </div>
      )}
    </div>
  );
};

export default PromptDisplay;