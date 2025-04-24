import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FabButton from "../../components/FabButton";
import MenuFooter from "../../components/MenuFooter";
import {
  selectCurrentView,
  selectInitializeData,
  selectSelectedProgram,
  setCurrentPageState,
  setInitializeData,
  setRequestFocModalOpen,
  setUploadInvoiceModalOpen,
  setViewingOrderHistory,
} from "../../slice/patient-detail-form";
import { ReactComponent as Back } from "../../assets/images/svg/back.svg";
import useApi from "../../hooks/useApi";
import { LoaderContext } from "../../context/LoaderContextProvider";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("paid");
  const dispatch = useDispatch();
  const program = useSelector(selectSelectedProgram);
  const { setLoading, isLoading } = useContext(LoaderContext);
  const triggerApi = useApi();
  const [loadingFile, setLoadingFile] = useState(null);
  // Add a new state variable to track if data has loaded
  const [dataLoaded, setDataLoaded] = useState(false);

  const [visit, setVisit] = useState(false);

  const initiaData = useSelector(selectInitializeData);

  // Use actual data from Redux store, no fallback dummy data
  const paidOrders = program?.orders?.paid_orders || [];
  const focOrders = program?.orders?.foc_orders || [];

  const currentView = useSelector(selectCurrentView);
  const hasOpenOrders = paidOrders.some(
    (order) => order.order_status === "Open"
  );
  const hasOpenFocOrders = focOrders.some(
    (order) => order.order_status === "Open"
  );

  const showButton = initiaData?.program_data?.applied_programs?.some(
    (order) => order?.show_foc_button === true
  );

  // console.log('showButton', showButton);

  // console.log('paidOrders,focOrders', program?.orders?.paid_orders);

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

  const handleFileView = (file) => {
    // Extract file name and type (if possible)
    const fileName = file.split("/").pop() || "document";
    const fileType = fileName.split(".").pop().toLowerCase() || "pdf";

    // Set loading state for this file
    setLoadingFile(file);

    // Check if running inside a WebView (React Native)
    if (window.ReactNativeWebView) {
      // Send message to React Native
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "VIEW_FILE",
          fileUrl: file,
          fileName: fileName,
          fileType: fileType,
        })
      );

      // Reset loading state after a short delay
      setTimeout(() => setLoadingFile(null), 1500);
    } else {
      // Fallback for web browsers (when testing on web)
      window.open(file, "_blank");
      setLoadingFile(null);
    }
  };

  // const makeApiCall = async () => {
  //   try {
  //     setLoading(true);
  //     const url = `/patient_dashboard/?current_step=initialize`;
  //     const { response, success } = await triggerApi({
  //       url: url,
  //       type: "GET",
  //       loader: true,
  //     });

  //     if (success && response) {
  //       dispatch(setInitializeData(response));
  //       dispatch(setCurrentPageState(response.current_step));
  //       // Set dataLoaded to true after successful API call
  //       setDataLoaded(true);
  //     } else {
  //       console.error("API call failed or returned no data.");
  //     }
  //   } catch (error) {
  //     console.error("Error in makeApiCall:", error);
  //   } finally {
  //     setLoading(false); // Ensure loading state is reset
  //   }
  // };

  useEffect(() => {
    // console.log("visitCount",visit);
    // This will run once when the component mounts (user comes to this page)
    setVisit(true);
    // console.log("visitCount",visit);
  }, []);

  // Show loading state until data is loaded
  // if (!dataLoaded) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex justify-center items-center">
  //       <div className="text-center p-4">
  //         <p>Loading data...</p>
  //       </div>
  //     </div>
  //   );
  // }

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
          <Back className="w-7 h-7 bg-[#F2F2FF] mr-2 rounded-md " />
          Back
        </button>
        <div className="w-10"></div> {/* Empty div for flex spacing */}
      </div>

      {/* Program Details */}
      <div className="px-6 pt-2">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-[18px] font-bold">{program.program_name}</h2>
          <span
            className={`px-2 py-1 ${
              program.program_status === "applied"
                ? "bg-[#fffed5]"
                : program.program_status === "active"
                  ? "bg-[#D9FFD5]"
                  : ""
            } text-[#3B3B3B] px-[8px] rounded-[6px] text-[12px]`}
          >
            {program.program_status === "applied"
              ? "Applied"
              : program.program_status === "active"
                ? "Active"
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
            Enrollment Date -{" "}
            {program.order_date || program.program_enrollmentDate || "N/A"}
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
              {/* Show "Have new orders?" only if activeTab is "paid" and no open orders */}
              <p className="text-[#767676] font-open-sans text-[14px] font-normal">
                {activeTab === "paid"
                  ? !hasOpenOrders && "Have new orders?"
                  : showButton &&
                    !hasOpenFocOrders &&
                    "Need more free samples?"}
              </p>

              {/* Show "Upload Invoice" only if activeTab is "paid" and no open orders */}
              {activeTab === "paid" && !hasOpenOrders && (
                <button
                  onClick={UploadInvoiceHandle}
                  className="border-bg-text-primary font-bold text-[14px] font-sans text-primary"
                >
                  Upload Invoice
                </button>
              )}

              {/* Always show "Request FOC" when activeTab is NOT "paid" */}
              {showButton && activeTab !== "paid" && !hasOpenFocOrders && (
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
            (activeTab === "paid" ? paidOrders : focOrders).map(
              (order, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border shadow-sm p-4 mb-4 mt-6"
                >
                  <div className="flex justify-between items-center pb-2">
                    <h3 className="text-[14px] font-bold text-[#212121]">
                      Order Code: {order.order_id}
                    </h3>

                    {activeTab === "paid" ? (
                      <p className="text-[#767676] text-[14px] font-open-sans">
                        <span
                          className={`px-2 py-1 ${
                            order.order_status === "Open" ||
                            order.order_status === "Active" ||
                            order.order_status === "Approved"
                              ? "bg-[#D9FFD5] text-green-800"
                              : "bg-[#f8cdcd] text-red-800"
                          } rounded-[6px] text-[12px]`}
                        >
                          {order.order_status}
                        </span>
                      </p>
                    ) : (
                      <p className="text-[#767676] text-[14px] font-open-sans">
                        {order?.onemg_status && order.onemg_status !== "NA" && (
                          <span className="px-2 py-1 bg-[#d5dcff] text-blue-800 rounded-[6px] text-[12px]">
                            {order.onemg_status}
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  <div className="space-y-[6px] text-gray-600">
                    <p className="text-[#767676] text-[14px]">
                      Order Date: {order.order_date}
                    </p>

                    {activeTab !== "paid" && (
                      <p className="text-[#767676] text-[14px]">
                        Approval status:{" "}
                        {order.order_status === "Open"
                          ? "Under Review"
                          : order.order_status === "Cancelled"
                            ? "Cancelled"
                            : "Approved"}
                      </p>
                    )}
                    {/* {order?.onemg_status ? (
                      <p className="text-[#767676] text-[14px]">
                        One mg Status: {order?.onemg_status || "N/A"}
                      </p>
                    ) : null} */}

                    {/* Display any additional fields from API response */}
                    {/* {Object.entries(order).map(([key, value]) => {
                    // Skip fields we already display explicitly or array/object values
                    if (['order_id', 'order_date', 'order_status', 'onemg_status', 'order_file'].includes(key) || 
                        typeof value === 'object') {
                      return null;
                    }
                    return (
                      <p key={key} className="text-[#767676] text-[14px]">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}: {value}
                      </p>
                    );
                  })} */}

                    {/* File list section */}
                    <div className="flex gap-1">
                      {order.order_file.map((file, fileIndex) => (
                        <button
                          key={fileIndex}
                          onClick={() => handleFileView(file)}
                          className={`inline-block text-[12px] py-1 px-3 rounded-full border ${
                            loadingFile === file
                              ? "bg-gray-200 text-gray-600 border-gray-400"
                              : "bg-primary-200 text-primary border-primary"
                          }`}
                          disabled={loadingFile === file}
                        >
                          {loadingFile === file
                            ? "Loading..."
                            : `file-${fileIndex + 1}`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">
                No {activeTab === "paid" ? "paid" : "FOC"} orders available
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-30 z-30 right-0">
        <FabButton />
      </div>
      <MenuFooter />
    </div>
  );
};

export default OrderHistory;
