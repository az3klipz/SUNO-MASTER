
import React from 'react';

const MusicNoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9 9V4.5M9 9c0 .54.06.97.17 1.34M9 9h3.75M9 9L4.5 4.5M9.17 10.34a2.25 2.25 0 1 0 3.33-3.33M12.75 21a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM12.75 16.5h-6v-3h6v3Z" 
        />
    </svg>
);

export default MusicNoteIcon;
