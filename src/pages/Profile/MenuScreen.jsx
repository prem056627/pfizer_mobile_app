import React from 'react';
import { ReactComponent as Profile } from "../../assets/images/menus1/profile.svg";
import { ReactComponent as Call } from "../../assets/images/menus1/call.svg";
import { ReactComponent as Print } from "../../assets/images/menus1/print.svg";
import { ReactComponent as History } from "../../assets/images/menus1/history.svg";
import { ReactComponent as File } from "../../assets/images/menus1/file.svg";
import { ReactComponent as Logout } from "../../assets/images/menus1/logout.svg";
const MenuScreen = () => {
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
       < Print className="w-6 h-6"/>
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
        <File  className="w-6 h-6"/>
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
    <div className=" bg-white max-h-max  relative  font-['Open_Sans'] pt-6">
 

      {/* Menu Title */}
      <div className="px-6 mb-6">
        {/* <h1 className="text-2xl font-bold">Menu</h1> */}
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
              }`}
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