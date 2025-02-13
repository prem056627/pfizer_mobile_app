import React from 'react';
import SelectField from '../../../components/Form/SelectMultipleField';
import HeadingWithIcon from '../../../components/HeadingWithIcon';
import HeadingWithTooltipText from '../../../components/HeadingWithIcon';
const Options = [
	{ id: "111", label: 'No, I have not been tested for genetic susceptibility' },
	{ id: '222', label: 'Yes, I have been tested for genetic susceptibility to cancer, and the results were negative.' },
	{ id: '333', label: 'Yes, I have been tested for genetic susceptibility to cancer, and the results were positive.' },
];

export default function GeneticCancerRiskAssessment({ formik }) {

	return (
    <>
      <div className="flex grow flex-col gap-[16px] mb-[80px] pt-10">
        <HeadingWithTooltipText
          headTtext={"Known DNA Susceptibility"}
          tooltipText={
            "Certain genetic mutations or variations in an individual's DNA can increase cancer risk. Genetic testing may identify individuals with a higher risk for specific cancers."
          }
          steps={[]}
        />

        <SelectField
          key="have_you_undergone_genetic_susceptibility_testing_for_cancer"
          label={
            <>
              Have you undergone genetic susceptibility testing for cancer, such
              as the BRCA1/BRCA2 test? <span className="text-red-500">*</span>
            </>
          }
          name="have_you_undergone_genetic_susceptibility_testing_for_cancer"
          id="have_you_undergone_genetic_susceptibility_testing_for_cancer"
          formik={formik}
          placeholder="Select"
          value={
            formik.values
              .have_you_undergone_genetic_susceptibility_testing_for_cancer
          }
          optionsDataName="have_you_undergone_genetic_susceptibility_testing_for_cancer"
          optionsData={Options}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className=""
        />
      </div>
    </>
  );
}
