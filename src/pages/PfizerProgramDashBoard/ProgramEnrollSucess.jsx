import React from "react";
import { ReactComponent as SuccessLogo } from "../../assets/images/svg/successEnrollment.svg";
import { ReactComponent as ProgramSucess } from "../../assets/images/ProgramCards/successEnrollment.svg";
import { ReactComponent as Refresh } from "../../assets/images/ProgramCards/refresh.svg";

function ProgramEnrollSucess() {
  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen w-full px-4 py-6 md:py-8">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto ">
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="animate-enter">
            <SuccessLogo />
          </div>

          <div className="flex flex-col items-center gap-2 text-center w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-open-sans font-semibold text-[#595454] text-center">
              You have <span className="text-[#208376]">successfully submitted</span> your{" "}
              <span className="text-[#208376]">program details</span>.
            </h2>
          </div>
        </div>

        <div className="flex justify-center items-center w-full my-8 md:my-10">
          <div className="w-full max-w-sm">
            <ProgramSucess />
          </div>
        </div>
        
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-opacity-90 transition"
        >
          <Refresh /> Refresh
        </button>
      </div>
    </div>
  );
}

export default ProgramEnrollSucess;