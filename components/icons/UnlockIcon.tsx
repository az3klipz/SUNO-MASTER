import React from 'react';

const UnlockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor" 
        {...props}
    >
        <path d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5a4.5 4.5 0 00-4.5-4.5zm-2.5 8V5.5c0-1.517 1.392-2.75 3-2.75s3 1.233 3 2.75V9h-6z" />
    </svg>
);

export default UnlockIcon;
