import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Footer: FC = () => {
    return (
        <footer className='fixed right-0 bottom-0 left-0'>
            <BottomNavigation
                showLabels
            >
                <BottomNavigationAction component={Link} to="/meals" label="Meals" icon={<RestaurantIcon />} />
                <BottomNavigationAction component={Link} to="/scheduler" label="Scheduler" icon={<CalendarMonthIcon />} />
                <BottomNavigationAction component={Link} to="/shopping-list" label="Shopping List" icon={<ChecklistRtlIcon />} />
            </BottomNavigation>
        </footer>
    );
};

export default Footer;