import React from 'react';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router';

const Header: React.FC = () => {
    const { authed, updateAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        updateAuth("", "");
    };

    React.useEffect(() => {
        if (!authed) {
            navigate("/login");
        }
    }, [authed])

    return (
        <header className='bg-black text-white h-[40px] flex px-4 fixed w-full top-0 left-0 z-50'>
            <button
                className='bg-transparent border-none text-light ml-auto underline'
                onClick={handleLogoutClick}
            >Logout</button>
        </header>
    );
};

export default Header;