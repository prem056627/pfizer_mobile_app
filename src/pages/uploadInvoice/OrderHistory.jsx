import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FabButton from "../../components/FabButton";
import MenuFooter from "../../components/MenuFooter";
import { 
  selectSelectedProgram, 
  setRequestFocModalOpen, 
  setUploadInvoiceModalOpen, 
  setViewingOrderHistory 
} from "../../slice/patient-detail-form";
import { ReactComponent as Back } from "../../assets/images/svg/back.svg";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("paid");
  const dispatch = useDispatch();
  const program = useSelector(selectSelectedProgram);
  
  // Use actual data from Redux store, no fallback dummy data
  const paidOrders = program?.orders?.paid_orders || [];
  const focOrders = program?.orders?.foc_orders || [];
  
  console.log('paidOrders,focOrders', program);
  
  // Handle back navigation
  const handleBack = () => {
    dispatch(setViewingOrderHistory(false));
  };

  const UploadInvoiceHandle = () => {

    dispatch(setUploadInvoiceModalOpen(true));
  };

  const RequestFocHandle = () => {

    dispatch(setRequestFocModalOpen(true));
  };

  // Handle file view
  const handleFileView = (fileName) => {
    // console.log("Viewing file:", fileName);
    // Implement file viewing functionality here
  };

  // If no program is selected, show a fallback or redirect
  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center p-4">
          <p>No program selected. Please go back and select a program.</p>
          <button 
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
          >
            Back to Programs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="h-20 w-full flex justify-between items-center px-4">
        <button 
          onClick={handleBack}
          className="text-[18px] font-bold flex w-full items-center gap-[2px] "
        >
          <Back className="w-7 h-7 bg-[#F2F2FF] mr-2 rounded-md " />Back
        </button>
      
        <div className="w-10"></div> {/* Empty div for flex spacing */}
      </div>

      {/* Program Details */}
      <div className="px-6 pt-2">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-[18px] font-bold">{program.program_name}</h2>
          <span className={`px-2 py-1 ${
                    program.program_status === 'applied' 
                    ? 'bg-[#fffed5]' 
                    : program.program_status === 'active' 
                      ? 'bg-[#D9FFD5]' 
                      : ''
                  
                  } text-[#3B3B3B] text-sm rounded-full`}>
            {/* {program.program_status} */}

            {program.program_status === "applied" ? "Applied" 
        :program.program_status === "active" ? "Active" 

: ""}
          </span>
        </div>

        <div className="space-y-2 text-gray-600 mb-6">
          <p className="text-[#767676] text-[14px] font-sans font-bold">
            Program ID: {program.order_id || program.program_id || "N/A"}
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            FOC Orders - {focOrders.length}
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Paid Orders - {paidOrders.length}
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Enrollment Date - {program.order_date || program.program_enrollmentDate || "N/A"}
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Schemes - {program.program_scheme || program.order_scheme || "N/A"}
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Doctor's Name - {program.doctor_name || "N/A"}
          </p>
        </div>
      </div>

      {/* Order History Section */}
      <div className="px-6 relative">
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
        {/* Upload Invoice or Request FOC Section based on active tab */}
        <div className="flex justify-start gap-4 items-center mb-4">
         

            {program.program_status === "active" && (
      <>
        <p className="text-[#767676] font-open-sans text-14px font-normal text-[14px]">
          {activeTab === "paid" ? "Have new orders?" : "Need more free samples?"}
        </p>
        {activeTab === "paid" ? (
          <button
            onClick={UploadInvoiceHandle}
            className="border-bg-text-primary font-bold text-[14px] font-sans text-primary"
          >
            Upload Invoice
          </button>
        ) : (
          <button
            onClick={RequestFocHandle}
            className="border-bg-text-primary font-bold text-[14px] font-sans text-primary"
          >
            Request FOC
          </button>
        )}
      </>
    )}


        </div>
        <div className="pb-30">
          {/* Render orders based on active tab */}
          {(activeTab === "paid" ? paidOrders : focOrders).length > 0 ? (
            (activeTab === "paid" ? paidOrders : focOrders).map((order, index) => (
              <div key={index} className="bg-white rounded-lg border shadow-sm p-4 mb-4 mt-6">
                <div className="flex justify-between items-center pb-2">
                  <h3 className="text-[14px] font-bold text-[#212121]">
                    Order Code: {order.order_id}
                  </h3>
                  <p className="text-[#767676] text-[14px] font-open-sans font-bold">
                    <span 
                      className={`px-2 py-1 ${
                        order.order_status === 'Open' ? 'bg-[#D9FFD5] text-green-800' : 'bg-[#f8cdcd] text-red-800'
                      } text-[12px] rounded-full`}
                    >
                      {order.order_status}
                    </span>
                  </p>
                </div>
       
                <div className="space-y-[6px] text-gray-600">
                  <p className="text-[#767676] text-[14px]">
                    Order Date: {order.order_date}
                  </p>
                  <p className="text-[#767676] text-[14px]">
                    Scheme: {order.order_scheme}
                  </p>
                  <p className="text-[#767676] text-[14px]">
                    Doctor's Name: {order.doctor_name || program.doctor_name || "N/A"}
                  </p>
                  
                  {/* File list section */}
                  {order.order_file && order.order_file.length > 0 && (
                    <div className="mt-3 flex gap-4 items-center">
                      <p className="text-[#767676] text-[14px] ">View Files:</p>
                      <div className="flex flex-wrap gap-2">
                        {order.order_file.map((file, fileIndex) => (
                          <button 
                            key={fileIndex}
                            onClick={() => handleFileView(file)}
                            className="inline-block bg-primary-200 text-primary text-[12px] py-1 px-3 rounded-full border border-primary"
                          >
                            {`file-${fileIndex + 1}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No {activeTab === "paid" ? "paid" : "FOC"} orders available</p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-24 z-30 right-0">
        <FabButton />
      </div>
      <MenuFooter />
    </div>
  );
};

export default OrderHistory;