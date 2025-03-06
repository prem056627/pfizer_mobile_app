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
  
  // Dummy data for paid orders
  const paidOrders = [
    {
      id: "PO12345",
      uid: program?.uid,
      enrollmentDate: program?.enrollmentDate,
      schemes: program?.schemes,
      doctorName: program?.doctorName
    },
    {
      id: "PO12346",
      uid: program?.uid,
      enrollmentDate: program?.enrollmentDate,
      schemes: program?.schemes,
      doctorName: program?.doctorName
    },
    {
      id: "PO12347",
      uid: program?.uid,
      enrollmentDate: program?.enrollmentDate,
      schemes: program?.schemes,
      doctorName: program?.doctorName
    }
  ];

  // Dummy data for FOC orders
  const focOrders = [
    {
      id: "FOC9876",
      uid: program?.uid,
      enrollmentDate: program?.enrollmentDate,
      schemes: program?.schemes,
      doctorName: program?.doctorName
    },
    {
      id: "FOC9877",
      uid: program?.uid,
      enrollmentDate: program?.enrollmentDate,
      schemes: program?.schemes,
      doctorName: program?.doctorName
    },
    {
      id: "FOC9878",
      uid: program?.uid,
      enrollmentDate: program?.enrollmentDate,
      schemes: program?.schemes,
      doctorName: program?.doctorName
    }
  ];
  
  // Handle back navigation
  const handleBack = () => {
    dispatch(setViewingOrderHistory(false));
  };

  const UploadInvoiceHandle = () => {
    // Implement upload invoice functionality here
    console.log("Upload invoice");
    dispatch(setUploadInvoiceModalOpen(true));
  };

  const RequestFocHandle = () => {
    // Implement request FOC functionality here
    console.log("Request FOC");
    // Add your request FOC logic here


    dispatch(setRequestFocModalOpen(true));
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
      {/* Header with Pfizer Logo and Back Button */}
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
          <h2 className="text-[18px] font-bold">{program.name}</h2>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
            {program.status}
          </span>
        </div>

        <div className="space-y-2 text-gray-600 mb-6">
          <p className="text-[#767676] text-[14px] font-sans font-bold">
            UID {program.uid}
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            FOC Orders - {focOrders.length || program.orders || "01"}
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Paid Orders - {paidOrders.length || "04"}
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Enrollment Date - {program.enrollmentDate}
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Schemes - {program.schemes}
          </p>
          <p className="text-[#767676] text-[14px] font-open-sans">
            Doctor's Name - {program.doctorName}
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
        {/* Upload Invoice or Request FOC Section based on active tab */}
        <div className="flex justify-start gap-4 items-center mb-4">
          <p className="text-[#767676] font-open-sans text-14px font-normal text-[14px]">
            {activeTab === "paid" ? "Have new orders?" : "Need more free samples?"}
          </p>
          {activeTab === "paid" ? (
            <button onClick={UploadInvoiceHandle} className="border-bg-text-primary font-bold text-[14px] font-sans text-primary">
              Upload Invoice
            </button>
          ) : (
            <button onClick={RequestFocHandle} className="border-bg-text-primary font-bold text-[14px] font-sans text-primary">
              Request FOC
            </button>
          )}
        </div>
        <div className="pb-30">
          {/* Render orders based on active tab */}
          {(activeTab === "paid" ? paidOrders : focOrders).map((order, index) => (
            <div key={index} className="bg-white rounded-lg border shadow-sm p-4 mb-4 mt-6">
              <div className="flex justify-between items-center pb-2">
                <h3 className="text-[14px] font-bold text-[#212121]">
                  Order ID {order.id}
                </h3>
                {activeTab === "paid" ?  <button className="text-white bg-primary py-[4px] px-[14px] rounded-[6px] text-[12px] font-sans font-medium">
                  View Invoice
                </button> :  <button className="text-white bg-primary py-[4px] px-[14px] rounded-[6px] text-[12px] font-sans font-medium">
                  View RX
                </button>}
               
              </div>

              <div className="space-y-[6px] text-gray-600">
                <p className="text-[#767676] text-[14px] font-open-sans font-bold">
                  UID {order.uid}
                </p>
                <p className="text-[#767676] text-[14px]">
                  Enrollment Date - {order.enrollmentDate}
                </p>
                <p className="text-[#767676] text-[14px]">Schemes - {order.schemes}</p>
                <p className="text-[#767676] text-[14px]">
                  Doctor's Name - {order.doctorName}
                </p>
              </div>
            </div>
          ))}
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