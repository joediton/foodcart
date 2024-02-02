import { FC } from 'react';

const RootHeader: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className='w-full sticky top-0 flex items-center justify-between py-6 bg-[#333] z-10'>
            {children}
        </div>
    );
};

export default RootHeader;