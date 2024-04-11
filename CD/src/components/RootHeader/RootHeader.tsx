import './RootHeader.css';
import React from 'react';

const RootHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className='RootHeader'>
            {children}
        </div>
    );
};

export default RootHeader;