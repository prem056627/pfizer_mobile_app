import React from 'react';
import { ReactComponent as SuccessLogo } from "../../assets/images/svg/successEnrollment.svg";
import { ReactComponent as Physicalverification } from "../../assets/images/ProgramCards/physicalverification.svg";
import { ReactComponent as Ekyc } from "../../assets/images/ProgramCards/ekyc.svg";
import FabButton from '../../components/FabButton';
import MenuFooter from '../../components/MenuFooter';

const UploadInvoiceDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-open-sans">
      <div className="h-20 w-full flex justify-center items-center">
        <div className="flex justify-center items-center">
          <img
            width={100}
            src="/pfizer_logo.svg"
            alt="Pfizer Logo"
            className="cursor-pointer"
          />
        </div>
      </div>
      
      {/* Programs Section */}
      <div className="px-6 pt-8">
        <h2 className="text-[20px] font-bold mb-4 text-black">Programs</h2>
        
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 mt-6">
          <div className="flex justify-between items-center mb-2">
            <div className='flex gap-4'>
              <h3 className="text-lg font-semibold">Palbace</h3>
              <span className="px-4 py-1 bg-[#D9FFD5] text-[#3B3B3B] text-[14px] rounded-full">
                Active
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <button className="text-white bg-primary py-[4px] px-[14px]  rounded-[6px]  text-sm font-medium">
                View History
              </button>
            </div>
          </div>
          
          <div className="space-y-[6px] text-gray-600">
            <p className='text-[#767676] text-[14px] font-open-sans font-bold'>UID 10015</p>
            <p className='text-[#767676] text-[14px]'>Enrollment Date - 9th Jun, 2021</p>
            <p className='text-[#767676] text-[14px]'>Schemes - 9+LFT</p>
            <p className='text-[#767676] text-[14px]'>Doctor's Name - Dr. John Doe</p>
          </div>
        </div>
      </div>

      {/* Value Added Services */}
      <div className="px-6">
        <h2 className="text-[20px] font-semibold mb-4">Value Added Services</h2>
        
        <div className="space-y-6 pb-30">
          {/* Physical Verification Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex gap-4 mb-3">
              <div className=" p-3 rounded-lg ">
                <Physicalverification width={70}/>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-[#616161]">Physical Verification</h3>
                <p className="text-[13px] text-[#606060]">
                  Complete your physical verification by submitting documents and booking an appointment.
                </p>
              </div>
            </div>
            <button className="w-full text-sm bg-primary text-white py-3 rounded-[6px] font-medium">
              START YOUR PHYSICAL VERIFICATION
            </button>
          </div>

          {/* eKYC Verification Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex gap-4 mb-3">
              <div className=" p-3 rounded-lg">
                <Ekyc width={70}/>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-[#616161]">eKYC Verification</h3>
                <p className="text-[13px] text-[#606060]">
                  Verify your identity digitally using Aadhaar and other valid documents.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex-1 text-sm bg-primary text-white py-3 rounded-[6px] font-medium">
                INITIATE YOUR EKYC VERIFICATION
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-24 z-30 w-full">
        <FabButton />
      </div>
      <MenuFooter />
    </div>
  );
};

export default UploadInvoiceDashboard;
