import { ReactComponent as WarningUpload } from "../../../assets/images/ProgramCards/WarningUpload.svg";
import { ReactComponent as ProgramWarning } from "../../../assets/images/ProgramCards/programWarning.svg";
import FabButton from "../../../components/FabButton";
import { ReactComponent as PfizerLogo } from '../../../assets/images/svg/pfizer_logo.svg';
import { selectInitializeData, selectIsProgramEnrollDocDuplicateFound } from "../../../slice/patient-detail-form";
import { useSelector } from "react-redux";

function ProgramEnrollDocDuplicateFound() {
  const initialData = useSelector(selectInitializeData);
  const isDuplicate = initialData?.duplicate;
  const isInactive = initialData?.patient_status === "Inactive";

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen max-w-md mx-auto relative pb-16">
      {/* Header */}
      <div className="flex justify-center items-center h-16 sm:h-20 w-full px-4 sm:px-6 py-2">
        <div className="w-24 sm:w-28">
          <PfizerLogo className="w-full h-auto" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow w-full px-4 sm:px-6 py-6">
        {/* Warning Icon */}
        <div className="mb-6 sm:mb-8 animate-enter">
          <ProgramWarning className="w-20 h-20 sm:w-24 sm:h-24" />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-3 text-center mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-[#595454]">
            Your profile is suspended for the enrolled program
          </h2>

          <p className="text-sm sm:text-base font-semibold text-[#595454]">
            {isDuplicate ? (
              <>
                due to <span className="text-[#AB3436]">duplication found</span> in the document and profile details provided.{" "}
                <span className="text-[#AB3436]">Please connect with the PAP Team for the next steps</span>
              </>
            ) : (
              <>
                <span className="text-[#AB3436]">Please connect with the PAP Team</span> for the next steps.
              </>
            )}
          </p>
        </div>

        {/* Warning Upload Image */}
        <div className="flex justify-center items-center w-full max-w-xs sm:max-w-sm">
          <WarningUpload className="w-full h-auto" />
        </div>
      </div>

      {/* FAB Button */}
      <div className="fixed bottom-8 right-4 z-30">
        <FabButton />
      </div>
    </div>
  );
}

export default ProgramEnrollDocDuplicateFound;