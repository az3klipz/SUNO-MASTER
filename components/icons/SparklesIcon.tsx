import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-11.25h-5.25ZM11.25 9.75v11.25h5.625c.621 0 1.125-.504 1.125-1.125V9.75h-6.75Z" 
        />
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12.75 3.75 12 3m0 0-1.14 1.14M12 3v1.5M21 12h-1.5m-18 0H3m16.5 0-1.14 1.14M19.5 12l1.14-1.14" 
        />
    </svg>
);

export default SparklesIcon;
