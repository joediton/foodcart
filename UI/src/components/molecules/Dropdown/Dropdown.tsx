import React, { ReactNode, useState } from 'react';

export type TDropdownProps = {
    toggler: ReactNode;
    children: ReactNode;
}

const Dropdown: React.FC<TDropdownProps> = ({ children, toggler }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div data-expanded={isOpen}>
            <button
                type="button"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
                aria-haspopup="true"
                role="button"
                className='w-full'
            >
                {toggler}
            </button>

            {isOpen && (
                <div role="menu" aria-hidden={!isOpen}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
