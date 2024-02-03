import useAuth from '@/hooks/useAuth';
import { FC } from 'react';

const Header: FC = () => {
    const { logout } = useAuth();

    const handleLogoutClick = () => {
        logout();
    };

    return (
        <header className='bg-black text-white h-[40px] flex px-4 fixed w-full top-0 left-0 z-50'>
            <button
                className='bg-transparent border-none text-white ml-auto underline'
                onClick={handleLogoutClick}
            >Logout</button>
        </header>
    );
};

export default Header;