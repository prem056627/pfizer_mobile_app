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
const programsData = [
  {
    id: 1,
    title: "Program-1",
    description: "Explore innovative medical research and development strategies.",
    image: <Img1 />,
  },
  {
    id: 2,
    title: "Program-2",
    description: "Advanced clinical trial management and patient care solutions.",
    image: <Img2 />,
  },
  {
    id: 3,
    title: "Program-3",
    description: "Cutting-edge pharmaceutical technology and neural research.",
    image: <Img3 />,
  },
  {
    id: 4,
    title: "Program-4",
    description: "Global health initiatives and patient support programs.",
    image: <Img4 />,
  },
  {
    id: 5,
    title: "Program-5",
    description: "Precision medicine and diagnostic innovation.",
    image: <Img5 />,
  },
  {
    id: 6,
    title: "Program-6",
    description: "Molecular biology and cellular research breakthroughs.",
    image: <Img6 />,
  },
  {
    id: 7,
    title: "Program-7",
    description: "Genomic data analysis and personalized treatment approaches.",
    image: <Img7 />,
  },
  {
    id: 8,
    title: "Program-8",
    description: "AI-driven diagnostics and healthcare automation.",
    image: <Img8 />,
  },
  {
    id: 9,
    title: "Program-9",
    description: "Bioinformatics and computational biology advancements.",
    image: <Img9 />,
  },
  {
    id: 10,
    title: "Program-10",
    description: "Epidemiology and disease prevention strategies.",
    image: <Img10 />,
  },
  {
    id: 11,
    title: "Program-11",
    description: "Telemedicine and remote patient monitoring solutions.",
    image: <Img11 />,
  },
  {
    id: 12,
    title: "Program-12",
    description: "Regenerative medicine and stem cell therapy innovations.",
    image: <Img12 />,
  },
  {
    id: 13,
    title: "Program-13",
    description: "Advanced surgical robotics and minimally invasive procedures.",
    image: <Img13 />,
  },
  {
    id: 14,
    title: "Program-14",
    description: "Nutrigenomics and personalized nutrition research.",
    image: <Img14 />,
  },
  {
    id: 15,
    title: "Program-15",
    description: "Chronic disease management and lifestyle medicine.",
    image: <Img15 />,
  }
];

function MoreProgram() {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleProgramClick = (programId) => {
    setSelectedProgram(selectedProgram === programId ? null : programId);
  };

  return (
    <div>
      <div>
        <h1 className="pb-2 font-open-sans text-[20px] font-semibold text-[#403939]">
          Available Programs List
        </h1>
        <div className="h-[4px] w-11 rounded-full bg-primary"></div>
      </div>

      <div className="space-y-4 mt-8">
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
      </div>
    </div>
  );
}

export default MoreProgram;