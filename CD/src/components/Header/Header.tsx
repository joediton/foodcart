import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { FC } from 'react';

const Header: FC = () => {
    const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

    const handleButtonClick = () => {
        if (isAuthenticated) {
            logout({ logoutParams: { returnTo: window.location.origin } });
        } else {
            loginWithRedirect();
        }
    };

    return (
        <header className='z-50 h-[var(--headerHeight)] dark:bg-[#121212] flex fixed top-0 right-0 left-0 justify-between gap-[30px] items-center p-4'>
            {isAuthenticated && (
                <div>
                    {user?.name}
                </div>
            )}

            <Button
                type="submit"
                variant="contained"
                onClick={handleButtonClick}
            >
                {isAuthenticated ? "Log out" : "Log in"}
            </Button>
        </header>
    );
};

export default Header;