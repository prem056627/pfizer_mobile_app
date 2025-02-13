import React from "react";
import Tooltip from "./Tooltip";



const HeadingWithTooltipText = ({
    tooltipText,
    headTtext,
    steps,
}) => {
    return (
        <h2 className="text-[#7BB68F] md:inline-flex gap-3 font-semibold items-center">
            <span className="mr-1">{headTtext}</span>
            <Tooltip steps={steps} tooltipText={tooltipText} position="bottom">
                <span className="px-2 ml-0 border-2 border-[#7BB68F] rounded-full font-bold">&#63;</span>
            </Tooltip>
        </h2>
    );
};

export default HeadingWithTooltipText;
