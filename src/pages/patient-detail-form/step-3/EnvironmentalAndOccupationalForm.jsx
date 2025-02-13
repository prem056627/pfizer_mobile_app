import React, { useId } from 'react';
import Radio from '../../../components/Form/Radio';
import HeadingWithIcon from '../../../components/HeadingWithIcon';

export default function EnvironmentalAndOccupationalForm({ formik }) {


  return (
    <>
      <div className="flex grow flex-col gap-[16px] pt-10 ">
        {/* <HeadingWithIcon text={"Secondhand Smoke Exposure"} /> */}
        <Radio
          label="Are you frequently exposed to secondhand smoke?"
          name="are_you_frequently_exposed_to_secondhand_smoke"
          radioData={[
            { id: useId(), value: "yes", label: "Yes" },
            { id: useId(), value: "no", label: "No" },
            { id: useId(), value: "occasionally", label: "Occasionally" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        {/* <HeadingWithIcon text={"Environmental Toxin Exposure"} /> */}
        <Radio
          label="Are you currently or in the past exposed to environmental toxins e.g. inhaling contaminated air (air pollution), drinking 
          contaminated water or any other toxins ?"
          name="are_you_currently_or_in_the_past_exposed_to_environmental_toxins"
          radioData={[
            { id: useId(), value: "yes", label: "Yes" },
            { id: useId(), value: "no", label: "No" },
            { id: useId(), value: "occasionally", label: "Occasionally" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        {/* <HeadingWithIcon text={"Occupational Toxin Exposure"} /> */}
        <Radio
          label="Are you currently or in the past have been exposed to occupational toxins (e.g., ionizing radiation from X-rays, nuclear sources),
        asbestos, benzene, formaldehyde, arsenic, vinyl chloride, polychlorinated biphenyls (PCBs), chromium, lead, or cadmium, all of
        which are known to be associated with health risks including cancer ?"
          name="are_you_currently_or_in_the_past_have_been_exposed_to_occupational_toxins"
          radioData={[
            {
              id: useId(),
              value: "no_never_exposed_toxins",
              label: "No,Never Exposed Toxins",
            },
            {
              id: useId(),
              value: "yes_less_than_10years",
              label: "Yes,Less than 10years",
            },
            {
              id: useId(),
              value: "yes_less_more_10years",
              label: "Yes,More than 10years",
            },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
      </div>
    </>
  );
}
