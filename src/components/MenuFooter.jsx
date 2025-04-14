// import React, { useState, useEffect } from 'react';
// import { ReactComponent as HomeLogo } from '../assets/images/menu/Home.svg';
// import { ReactComponent as Notify } from '../assets/images/menu/Notify.svg';
// import { ReactComponent as Menu } from '../assets/images/menu/menu.svg';
// import { useDispatch } from 'react-redux';
// import { setCurrentView } from '../slice/patient-detail-form';
// // import { isProfilePageOpen } from '../pages/slice';

// function MenuItem({ label, icon: Icon, isActive, onClick }) {
//     return (
//         <div
//             onClick={onClick}
//             className={`flex cursor-pointer flex-col items-center justify-between gap-1 ${isActive ? 'text-primary' : 'text-[#595454]'}`}
//         >
//             <Icon
//                 className={`h-6 w-6 ${label === 'Menu' ? 'h-7 w-7' : 'h-6 w-6'}  ${
//                     isActive ? 'stroke-current fill-current' : 'stroke-current fill-current'
//                 }`}
//             />
//             <span className="text-xs">{label}</span>
//         </div>
//     );
// }

// function MenuFooter() {
//     const dispatch = useDispatch(); 
//     const [activeMenu, setActiveMenu] = useState('Home');

   

//     const menuItems = [
//         { label: 'Home', icon: HomeLogo },
//         { label: 'Notification', icon: Notify },
//         { label: 'Menu', icon: Menu },
//     ];

//     const handleMenuClick = (key) => {
//         setActiveMenu(key);


//         if (key === 'Home') {
//             dispatch(setCurrentView("home"));
//         } else if (key === 'Menu') {
//             dispatch(setCurrentView("menu"));
//         } else if (key === 'Notification') {
//             dispatch(setCurrentView("notifications"));
//         }
//     };

//     return (
//         <nav className="fixed bottom-0 left-0 flex w-full justify-between gap-4 bg-white px-10 py-4 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
//             {menuItems.map((item) => (
//                 <MenuItem
//                     key={item.label}
//                     label={item.label}
//                     icon={item.icon}
//                     isActive={activeMenu === item.label}
//                     onClick={() => handleMenuClick(item.label)}
//                 />
//             ))}
//         </nav>
//     );
// }

// export default MenuFooter;


import React, { useState, useEffect } from 'react';
import { ReactComponent as HomeLogo } from '../assets/images/menu/Home.svg';
import { ReactComponent as Notify } from '../assets/images/menu/Notify.svg';
import { ReactComponent as Menu } from '../assets/images/menu/menu.svg';
import { useDispatch, useSelector } from 'react-redux'; // Added useSelector
import { selectCurrentView, setCurrentView, setIsInitalDataLoad, setViewingOrderHistory } from '../slice/patient-detail-form';

function MenuItem({ label, icon: Icon, isActive, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`flex cursor-pointer flex-col items-center justify-between gap-1 ${isActive ? 'text-primary' : 'text-[#595454]'}`}
        >
            <Icon
                className={`h-6 w-6 ${label === 'Menu' ? 'h-7 w-7' : 'h-6 w-6'}  ${
                    isActive ? 'stroke-current fill-current' : 'stroke-current fill-current'
                }`}
            />
            <span className="text-xs">{label}</span>
        </div>
    );
}

function MenuFooter() {
    const dispatch = useDispatch();
    // Get current view from Redux store
    const currentView = useSelector(selectCurrentView);
    const [activeMenu, setActiveMenu] = useState('Home');



    // Map Redux store view values to menu item labels
    const viewToMenuMap = {
        'home': 'Home',
        'menu': 'Menu',
        'notifications': 'Notification'
    };

    // Update activeMenu when currentView changes from outside this component
    useEffect(() => {
        // Only update if currentView exists in the store and has a corresponding menu item
        if (currentView && viewToMenuMap[currentView]) {
            setActiveMenu(viewToMenuMap[currentView]);
            // console.log('currentView',currentView)
        }
    }, [currentView]); // This will run whenever currentView changes

    const menuItems = [
        { label: 'Home', icon: HomeLogo },
        { label: 'Notification', icon: Notify },
        { label: 'Menu', icon: Menu },
    ];

    const handleMenuClick = (key) => {
        setActiveMenu(key);

        // Dispatch to Redux store based on which menu item was clicked
        if (key === 'Home') {
            dispatch(setCurrentView("home"));
        } else if (key === 'Menu') {
            dispatch(setCurrentView("menu"));
             dispatch(setIsInitalDataLoad(false));
             dispatch(setViewingOrderHistory(false));
        } else if (key === 'Notification') {
            dispatch(setCurrentView("notifications"));
             dispatch(setIsInitalDataLoad(false));
             dispatch(setViewingOrderHistory(false));
        }
    };



  function PoweredByFooter() {
    const phoneNumber = "18002587008"; // Define the phone number

    return (
      <div className="flex flex-row justify-between items-center mt-2 px-5">
        <div className="flex flex-row items-center">
          <p className="text-xs text-gray-500 italic">
            Powered by <span className="font-bold text-black">TATA 1mg</span>
          </p>
        </div>

        <div className="flex items-center">
          <span className="text-xs text-gray-500">Contact: </span>
          <a
            href={`tel:${phoneNumber}`}
            className="text-primary font-bold text-xs no-underline"
          >
            {phoneNumber}
          </a>
        </div>
      </div>
    );
  }


    return (


     <div className="fixed bottom-0 left-0 w-full">

<div className=' bg-[#F3F3FF] py-2'>
 {PoweredByFooter()}
</div>

        <nav className=" flex w-full justify-between gap-4 bg-white px-10 py-4 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
          
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
     </div>
    );
}

export default MenuFooter;