import React from 'react';
import { ReactComponent as Profile } from "../../assets/images/menus1/profile.svg";
import { ReactComponent as Call } from "../../assets/images/menus1/call.svg";
import { ReactComponent as Print } from "../../assets/images/menus1/print.svg";
import { ReactComponent as History } from "../../assets/images/menus1/history.svg";
import { ReactComponent as File } from "../../assets/images/menus1/file.svg";
import { ReactComponent as Logout } from "../../assets/images/menus1/logout.svg";
import { useDispatch } from 'react-redux';
import { setIsKycHistoryModalOpen, setIsMoreProgramPageOpen, setIsProfilePageOpen } from '../../slice/patient-detail-form';

const MenuScreen = () => {

  const dispatch = useDispatch();
  // Handle menu item clicks
  const handleMenuClick = (menuId, menuTitle) => {
    console.log(`Clicked on menu: ${menuTitle} (ID: ${menuId})`);

    function handleProfilePage(){
      console.log("Navigating to profile page");
      dispatch(setIsProfilePageOpen(true))
  
    }

    function handleMoreProgram(){
      console.log("Navigating to handleMoreProgram");
      dispatch(setIsMoreProgramPageOpen(true))
  
    }



    function handleKycHistory(){
      console.log("Navigating to handleKycHistory");
      dispatch(setIsKycHistoryModalOpen(true))
  
    }
    
    // Add specific functionality for each menu item
    switch(menuId) {
      case 1: // Profile
       
        handleProfilePage()
        // Add your profile navigation logic here
        break;
      case 2: // Customer Care
        console.log("Opening customer care support");
        // Add your customer care logic here, perhaps open email client
        window.location.href = "mailto:support@1mg.com";
        break;
      case 3: // Completed Verification
        console.log("Showing completed verifications");
        // Add your verification history logic here
        break;
      case 4: // KYC History
        console.log("Opening KYC history");
        handleKycHistory()
        // Add your KYC history logic here
        break;
      case 5: // View More Programs
        console.log("Viewing additional programs");
        handleMoreProgram()
        // Add your programs view logic here
        break;
      case 6: // Logout
        console.log("Logging out");
        // Add your logout logic here
        // Example: logoutUser() function call
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {
      id: 1,
      title: 'Profile',
      icon: (
        <Profile className="w-6 h-6"/>
      )
    },
    {
      id: 2,
      title: 'Customer Care',
      subtitle: 'support@1mg.com',
      icon: (
        <Call className="w-6 h-6"/>
      )
    },
    {
      id: 3,
      title: 'Completed Verification',
      icon: (
       <Print className="w-6 h-6"/>
      )
    },
    {
      id: 4,
      title: 'KYC History',
      icon: (
        <History className="w-6 h-6"/>
      )
    },
    {
      id: 5,
      title: 'View More Programs',
      icon: (
        <File className="w-6 h-6"/>
      )
    },
    {
      id: 6,
      title: 'Logout',
      icon: (
        <Logout className="w-6 h-6"/>
      )
    }
  ];

  return (
    <div className="bg-white max-h-max relative font-['Open_Sans'] pt-6">
      {/* Menu Title */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold w-full">Menu</h2>
      </div>

      {/* Menu Items */}
      <div className="px-6">
        <div className="bg-white shadow-sm border border-[#F5F5F5] rounded-2xl p-4 py-4">
          {menuItems.map((item, index) => (
            <div 
              key={item.id}
              className={`flex items-center justify-between py-4 ${
                index !== menuItems.length - 1 ? 'border-b border-[#F6F6F6]' : ''
              } cursor-pointer hover:bg-gray-50 rounded-lg px-2`}
              onClick={() => handleMenuClick(item.id, item.title)}
              role="button"
              aria-label={`Menu item: ${item.title}`}
            >
              <div>
                <h2 className="text-gray-800 font-medium">{item.title}</h2>
                {item.subtitle && (
                  <p className="text-sm text-blue-600">{item.subtitle}</p>
                )}
              </div>
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;