import React, { useState } from "react";
import { ReactComponent as Img1 } from '../../../../src/assets/images/more_programs/img-1.svg';
import { ReactComponent as Img2 } from '../../../../src/assets/images/more_programs/img-2.svg';
import { ReactComponent as Img3 } from '../../../../src/assets/images/more_programs/img-3.svg';
import { ReactComponent as Img4 } from '../../../../src/assets/images/more_programs/img-4.svg';
import { ReactComponent as Img5 } from '../../../../src/assets/images/more_programs/img-5.svg';
import { ReactComponent as Img6 } from '../../../../src/assets/images/more_programs/img-6.svg';
import { ReactComponent as Img7 } from '../../../../src/assets/images/more_programs/img-6.svg';
import { ReactComponent as Img8 } from '../../../../src/assets/images/more_programs/img-6.svg';
import { ReactComponent as Img9 } from '../../../../src/assets/images/more_programs/img-6.svg';
import { ReactComponent as Img10 } from '../../../../src/assets/images/more_programs/img-6.svg';
import { ReactComponent as Img11 } from '../../../../src/assets/images/more_programs/img-6.svg';
import { ReactComponent as Img12 } from '../../../../src/assets/images/more_programs/img-6.svg';
import { ReactComponent as Img13 } from '../../../../src/assets/images/more_programs/img-6.svg';
import { ReactComponent as Img14 } from '../../../../src/assets/images/more_programs/img-6.svg';
import { ReactComponent as Img15 } from '../../../../src/assets/images/more_programs/img-6.svg';
import { useDispatch, useSelector } from "react-redux";
import { selectInitializeData, setCurrentView, setIsMoreProgramPageOpen, setProgramEnrollmentConsent } from "../../../slice/patient-detail-form";
// const programsData = [

  
//   {
//     program_id: 1,
//     title: "Program-1",
//     description: "Explore innovative medical research and development strategies.",
//     program_image: <Img1 />,
//   },
//   {
//     program_id: 2,
//     title: "Program-2",
//     description: "Advanced clinical trial management and patient care solutions.",
//     program_image: <Img2 />,
//   },
//   {
//     program_id: 3,
//     title: "Program-3",
//     description: "Cutting-edge pharmaceutical technology and neural research.",
//     program_image: <Img3 />,
//   },
//   {
//     program_id: 4,
//     title: "Program-4",
//     description: "Global health initiatives and patient support programs.",
//     program_image: <Img4 />,
//   },
//   {
//     program_id: 5,
//     title: "Program-5",
//     description: "Precision medicine and diagnostic innovation.",
//     program_image: <Img5 />,
//   },
//   {
//     program_id: 6,
//     title: "Program-6",
//     description: "Molecular biology and cellular research breakthroughs.",
//     program_image: <Img6 />,
//   },
//   {
//     program_id: 7,
//     title: "Program-7",
//     description: "Genomic data analysis and personalized treatment approaches.",
//     program_image: <Img7 />,
//   },
//   {
//     program_id: 8,
//     title: "Program-8",
//     description: "AI-driven diagnostics and healthcare automation.",
//     program_image: <Img8 />,
//   },
//   {
//     program_id: 9,
//     title: "Program-9",
//     description: "Bioinformatics and computational biology advancements.",
//     program_image: <Img9 />,
//   },
//   {
//     program_id: 10,
//     title: "Program-10",
//     description: "Epidemiology and disease prevention strategies.",
//     program_image: <Img10 />,
//   },
//   {
//     program_id: 11,
//     title: "Program-11",
//     description: "Telemedicine and remote patient monitoring solutions.",
//     program_image: <Img11 />,
//   },
//   {
//     program_id: 12,
//     title: "Program-12",
//     description: "Regenerative medicine and stem cell therapy innovations.",
//     program_image: <Img12 />,
//   },
//   {
//     program_id: 13,
//     title: "Program-13",
//     description: "Advanced surgical robotics and minimally invasive procedures.",
//     program_image: <Img13 />,
//   },
//   {
//     program_id: 14,
//     title: "Program-14",
//     description: "Nutrigenomics and personalized nutrition research.",
//     program_image: <Img14 />,
//   },
//   {
//     program_id: 15,
//     title: "Program-15",
//     description: "Chronic disease management and lifestyle medicine.",
//     program_image: <Img15 />,
//   }
// ];

// program_name: "Lorbriqua Care",
//         program_status: "Active",
//         program_id: 10011,
//         program_image: ProgramCard1,
//         program_type: ["Oncology", "Patient Assistance"],
function MoreProgram() {
  // const [selectedProgram, setSelectedProgram] = useState(null);

  // const handleProgramClick = (programId) => {
  //   setSelectedProgram(selectedProgram === programId ? null : programId);
  // };

  const initiaData = useSelector(selectInitializeData);
  const dispatch = useDispatch();

  const AVAILABLE_PROGRAMS = initiaData?.program_data?.available_programs||[];

    const handleRequest = () => {
       
        // dispatch(setCurrentView("home"));
      // dispatch(setProgramEnrollmentConsent(true));

        // dispatch(setIsMoreProgramPageOpen(false));
    };

  return (
    <div>
      <div>
        <h1 className="pb-2 font-open-sans text-[20px] font-semibold text-[#403939]">
          Available Programs List
        </h1>
        <div className="h-[4px] w-11 rounded-full bg-primary"></div>
      </div>

      {/* <div className="space-y-4 mt-8">
        {programsData.map((program) => (
          <div
            key={program.program_id}
            onClick={() => handleProgramClick(program.program_id)}
            className={`
              flex items-center rounded-lg overflow-hidden cursor-pointer 
              transition-all duration-200 
              ${selectedProgram === program.program_id 
                ? "bg-primary" 
                : "bg-[#F6F6FF]"}
              hover:shadow-md
            `}
          >
            <div className="w-24 h-24 flex-shrink-0">
              {program.program_image}
            </div>
            <div className="p-2 ps-8 flex-grow pl-12">
              <h3
                className={`
                  font-bold font-inter 
                  ${selectedProgram === program.program_id 
                    ? "text-white" 
                    : "text-[#474747]"}
                `}
              >
                {program.title}
              </h3>
              <p
                className={`
                  text-[12px] font-inter font-regular mt-2
                  ${selectedProgram === program.program_id 
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


<div className="space-y-4 w-full pb-20 pt-10">
    {AVAILABLE_PROGRAMS.map((program) => (
      <div key={program.program_id} className="w-full bg-white rounded-lg shadow-md border">
        <div className="p-4 flex gap-4">
        <div>
        <img src={program.program_image} alt={program.program_name} className="w-20 h-20" />
      </div>
          <div className="flex-1">
            <h3 className="text-md font-semibold">{program.program_name}</h3>
            <div className="flex gap-2 mt-2">
              {program.program_type.map((type, index) => (
                <span 
                  key={index} 
                  className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => handleRequest(program)}
          className="w-full text-[14px] font-sans font-bold bg-primary text-white py-4 rounded-b-lg"
        >
          ENROL
        </button>
      </div>
    ))}
  </div>
    </div>
  );
}

export default MoreProgram;