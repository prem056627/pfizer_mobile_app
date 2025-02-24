import React, { useState } from 'react';
import { ReactComponent as HomeLogo } from '../assets/images/menu/Home.svg';
import { ReactComponent as Notify } from '../assets/images/menu/Notify.svg';
import { ReactComponent as Profile } from '../assets/images/menu/menu.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { isProfilePageOpen } from '../pages/slice';

function MenuItem({ label, icon: Icon, isActive, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`flex cursor-pointer flex-col items-center justify-between gap-1 ${isActive ? 'text-primary' : 'text-[#595454]'}`}
        >
            <Icon
                className={`h-6 w-6 ${label === 'Profile' ? 'h-7 w-7' : 'h-6 w-6'}  ${
                    isActive ? 'stroke-current fill-current' : 'stroke-current fill-current'
                }`}
            />
            <span className="text-xs">{label}</span>
        </div>
    );
}

function MenuFooter() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [activeMenu, setActiveMenu] = useState('Home');

    const menuItems = [
        { label: 'Home', icon: HomeLogo },
        { label: 'Notification', icon: Notify },
        { label: 'Profile', icon: Profile },
    ];

    const handleMenuClick = (key) => {
        setActiveMenu(key);

        if (key === 'Home') {
            // navigate("/Dashboard/Home");
        }

        if (key === 'Profile') {
            // dispatch(isProfilePageOpen(true));
        }
    };

    return (
        <nav className="fixed bottom-0 left-0 flex w-full justify-between gap-4 bg-white px-10 py-4 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">

        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            isActive={activeMenu === item.label}
            onClick={() => handleMenuClick(item.label)}
          />
        ))}
      </nav>
      
    );
}

export default MenuFooter;