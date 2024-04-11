import "./Header.css";
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
        <header className='Header'>
            <button
                onClick={handleLogoutClick}
            >Logout</button>
        </header>
    );
};

export default Header;