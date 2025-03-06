import React from "react";
import { ReactComponent as Pap } from "../../assets/images/Ekyc/pap.svg";
import { ReactComponent as ProgramSucess } from "../../assets/images/Ekyc/relax.svg";
import { ReactComponent as Waiting } from "../../assets/images/Ekyc/waiting.svg";
import { ReactComponent as Tick } from "../../assets/images/Ekyc/tick.svg";
function EkycSuccess() {
  return (
    <div className="flex flex-col items-center justify-between  gap-6   h-screen  ">
      <div className=" bg-primary">
        <div className=" flex flex-col items-center justify-between  bg-white rounded-b-lg border border-[#DBDBDB]">
          <div className="flex flex-col items-center justify-center gap-4 px-6 pt-10 ">
            <div className=" flex gap-4 px-6 pt-6">
              {/* <span className="text-primary font-semibold font-sans text-[18px]"></span>{" "} */}
              <Tick className="ml-1 w-12" />
              <p className="text-gray-700 text-[16px] font-medium font-sans">
                We have shared the{" "}
                <strong className="text-primary">KYC link</strong> on your{" "}
                <strong className="text-primary">registered number</strong>{" "}
              </p>
            </div>

            <div className="flex gap-8 items-center px-6">
              <Waiting className="w-16 h-12" />
              <h4 className="text-md text-[28px]  font-sans font-extralight text-[#707070] text-start">
                Complete your Verification
              </h4>
            </div>
          </div>

          <div className="flex justify-center items-center w-full px-4 rela rounded-lg ">
            <ProgramSucess className="w-[350px] h-[250px] top-4" />
          </div>
        </div>
        <div className="flex gap-4 px-6  justify-center items-center">
          <Pap className="w-28 h-20" />
          <p className="font-italic font-open-sans text-[14px] italic text-white">
            Please connect with the PAP Team if you have not received the KYC
            link
          </p>
        </div>
      </div>
    </div>
  );
}

export default EkycSuccess;
