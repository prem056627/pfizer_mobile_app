import React, { useState } from "react";
import { ReactComponent as AvatarFemale } from "../../../../src/assets/images/Ekyc/female_avatar.svg";

import { ReactComponent as NotApprove } from "../../../../src/assets/images/Ekyc/notApprove.svg";
function KycHistory() {
  return (
    <div>
      <div>
        <h1 className="pb-2 font-open-sans text-[20px] font-semibold text-[#403939]">
          KYC History
        </h1>
        <div className="h-[4px] w-11 rounded-full bg-primary"></div>

        <div className="flex flex-col items-center w-full max-w-md mx-auto">
          {/* Header curved section */}
          <div className=" w-full">
            <div className=""></div>

            {/* Profile circle */}
            <div className=" w-full flex justify-center items-center py-2 mt-8">
              <AvatarFemale />
            </div>
          </div>

          {/* Status section */}
          <div className="flex items-center mb-4">
            <span className=" font-sans font-semibold ">Status : </span>
            <span className="text-[#AB3436] font-semibold mr-1 ml-1 ">
              Not Approved
            </span>

            <NotApprove />
          </div>

          {/* User details card */}
          <div className="w-full bg-[#FFF5F5] rounded-[24px] p-4">
            <div className="grid grid-cols-1 gap-2">
              <div>
                <span className="w-32 font-sans text-sm mr-2 ">Name :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                  Reeta
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">Gender :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                  Female
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">
                  Date of Birth :
                </span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                  30 May 1979
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">
                  Mobile Number :
                </span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                  +91 9876543210
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">Email ID :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                  jay.smith@gmail.com
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">Address :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                  205 Neelkanth, 98 Marine Drive
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">City :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                  Mumbai
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">State :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                  Maharashtra
                </span>
              </div>
              <div>
                <span className="w-32 font-sans text-sm mr-2">PIN Code :</span>
                <span className="font-sans font-medium text-sm mr-2 color-[#0E0C0C]">
                  400002
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="space-y-4 mt-8">
        {programsData.map((program) => (
          <div
            key={program.id}
            onClick={() => handleProgramClick(program.id)}
            className={`
              flex items-center rounded-lg overflow-hidden cursor-pointer 
              transition-all duration-200 
              ${selectedProgram === program.id 
                ? "bg-primary" 
                : "bg-[#F6F6FF]"}
              hover:shadow-md
            `}
          >
            <div className="w-24 h-24 flex-shrink-0">
              {program.image}
            </div>
            <div className="p-2 ps-8 flex-grow pl-12">
              <h3
                className={`
                  font-bold font-inter 
                  ${selectedProgram === program.id 
                    ? "text-white" 
                    : "text-[#474747]"}
                `}
              >
                {program.title}
              </h3>
              <p
                className={`
                  text-[12px] font-inter font-regular mt-2
                  ${selectedProgram === program.id 
                    ? "text-white " 
                    : "text-[#5B5B5B]"}
                `}
              >
                {program.description}
              </p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default KycHistory;
