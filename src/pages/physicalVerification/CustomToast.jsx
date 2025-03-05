import React from "react";
import { ReactComponent as Relax } from "../../../../pfizer-app/src/assets/images/physicalVerify/relax.svg";
import { ReactComponent as Pap } from "../../../../pfizer-app/src/assets/images/physicalVerify/pap.svg";
import { ReactComponent as Tick } from "../../../../pfizer-app/src/assets/images/physicalVerify/tick.svg";

function CustomToast({ date, time, closeToast }) {
  return (
    <div className="custom-toast-container flex flex-col">
      <div className="custom-toast-content">
        {/* Left Image */}
        {/* <img src="/your-image-path.png" alt="illustration" className="toast-image" /> */}
        <Relax className="w-28 h-28 " />

        {/* Text Content */}
        <div className="toast-text">
          <p className="text-gray-700 text-[17px] font-medium font-sans">
            Your <strong className="text-primary">physical verification</strong>{" "}
            is scheduled for 
          </p>
          <span className="text-primary font-semibold font-sans text-[15px]">{date} </span> <span className="text-gray-700 text-[15px] font-medium font-sans">at</span>
            <span className="inline-flex items-center ml-1">
              <span className="text-primary font-semibold font-sans text-[15px]">{time}</span> <Tick className="ml-1" />
            </span>
        </div>
      </div>
      <div className="bg-[#208376] w-full flex py-[2px] justify-center items-center">
      <Pap className="w-8 h-8 mx-2" />
        <p className="text-[13px] text-white  w-full">
          PAP Team will soon reach out for verification.
        </p>
      </div>
      {/* Close Button */}
      {/* <button className="close-btn" onClick={closeToast}>✖</button> */}
    </div>
  );
}

export default CustomToast;
