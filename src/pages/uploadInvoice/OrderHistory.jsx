import React, { useState } from "react";
import FabButton from "../../components/FabButton";
import MenuFooter from "../../components/MenuFooter";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("paid");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Pfizer Logo */}
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

      {/* Program Details */}
      <div className="px-6 pt-8">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-[18px] font-bold">Palbace</h2>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
            Active
          </span>
        </div>

        <div className="space-y-2 text-gray-600 mb-6">
          <p className="text-[#767676] text-[14px] font-sans font-bold">
            UID 10015
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            FOC Orders - 01
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Paid Orders - 04
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Enrollment Date - 9th Jun, 2021
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Schemes - 9+LFT
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Doctor's Name - Dr. John Doe
          </p>
        </div>
      </div>

      {/* Order History Section */}
      <div className="px-6">
        <h2 className="text-[18px] font-bold mb-4">Order History</h2>
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            className={`px-4 text-[16px] py-2 font-medium ${
              activeTab === "paid"
                ? "border-bg-text-primary border-b-2 border-primary"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("paid")}
          >
            Paid Orders
          </button>
          <button
            className={`px-4 text-[16px] py-2 font-medium ${
              activeTab === "foc"
                ? "border-bg-text-primary border-b-2 border-primary"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("foc")}
          >
            FOC Orders
          </button>
        </div>
        {/* Upload Invoice Section */}
        <div className="flex justify-start gap-4 items-center mb-4">
          <p className="text-[#767676] font-open-sans text-14px font-normal text-[14px]">
            Have new orders?
          </p>
          <button className="border-bg-text-primary font-bold text-[14px] font-sans text-primary">
            Upload Invoice
          </button>
        </div>
       <div className=" pb-30">

         {/* Order Card */}
         <div className="bg-white rounded-lg border shadow-sm p-4 mb-4 mt-6">
          <div className="flex  justify-between items-center pb-2">
            <h3 className="text-[14px] font-bold text-[#212121]">
              Order ID 10015
            </h3>

            <button className="text-white bg-primary py-[4px] px-[14px]  rounded-[6px]  text-[12px] font-sans font-medium">
              View Invoice
            </button>
          </div>

          <div className="space-y-[6px] text-gray-600">
            <p className="text-[#767676] text-[14px] font-open-sans font-bold">
              UID 10015
            </p>
            <p className="text-[#767676] text-[14px]">
              Enrollment Date - 9th Jun, 2021
            </p>
            <p className="text-[#767676] text-[14px]">Schemes - 9+LFT</p>
            <p className="text-[#767676] text-[14px]">
              Doctor's Name - Dr. John Doe
            </p>
          </div>
        </div>
       {/* Order Card */}
       <div className="bg-white rounded-lg border shadow-sm p-4 mb-4 mt-6">
          <div className="flex  justify-between items-center pb-2">
            <h3 className="text-[14px] font-bold text-[#212121]">
              Order ID 10015
            </h3>

            <button className="text-white bg-primary py-[4px] px-[14px]  rounded-[6px]  text-[12px] font-sans font-medium">
              View Invoice
            </button>
          </div>

          <div className="space-y-[6px] text-gray-600">
            <p className="text-[#767676] text-[14px] font-open-sans font-bold">
              UID 10015
            </p>
            <p className="text-[#767676] text-[14px]">
              Enrollment Date - 9th Jun, 2021
            </p>
            <p className="text-[#767676] text-[14px]">Schemes - 9+LFT</p>
            <p className="text-[#767676] text-[14px]">
              Doctor's Name - Dr. John Doe
            </p>
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

export default OrderHistory;
