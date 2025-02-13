import React, { useId } from "react";
import InputField from "../../../components/Form/InputField";
import Radio from "../../../components/Form/Radio";
import HeadingWithTooltipText from '../../../components/HeadingWithIcon';
const genderOptions = [
  { id: 'Cigarettes/Bidi', label: 'Cigarettes/Bidi' },
  { id: 'Cigars', label: 'Cigars' },
  { id: 'Cigarettes', label: 'E-Cigarettes' },
  { id: 'other', label: 'E-Cigarettes' },
  { id: 'other', label: 'E-Cigarettes' },
  { id: 'other', label: 'E-Cigarettes' },
];

export default function PersonalAndFamilyCancerHistoryForm({
  formik
}) {
  const radioOptions1 = [
    { id: useId(), value: "yes", label: "Yes" },
    { id: useId(), value: "no", label: "No" },
  ];

  const radioOptions2 = [
    { id: useId(), value: "yes", label: "Yes" },
    { id: useId(), value: "no", label: "No" },
  ];
  const radioOptions3 = [
    { id: useId(), value: "yes", label: "Yes" },
    { id: useId(), value: "no", label: "No" },
  ];
  const radioOptions4 = [
    { id: useId(), value: "yes", label: "Yes" },
    { id: useId(), value: "no", label: "No" },
  ];

  console.log("formik.values >>>>>", formik.values);

  return (
    <>
      <div className="flex grow flex-col gap-[16px] pt-10 ">
        {/* <HeadingWithIcon text={"Personal & Family Cancer History "} /> */}
        <HeadingWithTooltipText headTtext={"Personal & Family Cancer History"} tooltipText={"A previous cancer diagnosis increases the risk of developing another cancer, the specific risk depending on the type and stage of the previous cancer and the time elapsed since diagnosis. Additionally, a family history of certain cancers can also indicate an increased risk due to inherited genetic mutations that predispose individuals to specific cancers. However, it's important to note that having a family history doesn't guarantee developing cancer, and many individuals with such a history never develop the disease."} steps={[]}
				/>
        <Radio
          label="Have you ever been a cancer patient ?"
          name="have_you_ever_been_a_cancer_patient"
          radioData={[
            { id: useId(), value: "yes", label: "Yes" },
            { id: useId(), value: "no", label: "No" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        {formik.values.have_you_ever_been_a_cancer_patient === "yes" ? (
          <>
            <Radio
              label="are you currently on active treatment?"
              name="are_you_currently_on_active_treatment"
              radioData={radioOptions1}
              formik={formik}
              checkboxType="circle"
              onChange={formik.handleChange}
            />
            {formik.values.are_you_currently_on_active_treatment === "no" && (
              <Radio
                label="are you in remission and off active treatment for more than 12 months ?"
                name="are_you_in_remission_and_off_active_treatment_for_more_than_12_months"
                radioData={radioOptions2}
                formik={formik}
                checkboxType="circle"
                onChange={formik.handleChange}
              />
            )}
            <Radio
              label="Have you had cancer multiple times in the past ?"
              name="have_you_had_cancer_multiple_times_in_the_past"
              radioData={radioOptions3}
              formik={formik}
              checkboxType="circle"
              onChange={formik.handleChange}
            />
            <Radio
              label="What type of cancer?"
              name="what_type_of_cancer"
              radioData={radioOptions4}
              formik={formik}
              checkboxType="circle"
              onChange={formik.handleChange}
            />

            <InputField
              key="at_what_age"
              label={
                <>
                  At what age did you first notice signs of cancer ?{" "}
                  <span className="text-red-500">*</span>
                </>
              }
              name="at_what_age"
              id="at_what_age"
              placeholder="Enter"
              value={formik.values.at_what_age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <InputField
              key="what_type_of_cancer_text"
              label={
                <>
                  What type of cancer ? <span className="text-red-500">*</span>
                </>
              }
              name="what_type_of_cancer_text"
              id="what_type_of_cancer_text"
              placeholder="Enter"
              value={formik.values.what_type_of_cancer_text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </>
        ) : (
          <></>
        )}

        <Radio
          label="Are you currently suffering from specific medical conditions that increase the risk of cancer i.e. Diabetes, HIV, HPV, H. 
Pylori, EBV, HCV, HBV?"
          name="are_you_currently_suffering_from_specific_medical_conditions_that_increase_the_risk_of_cancer"
          radioData={[
            { id: useId(), value: "yes", label: "Yes" },
            { id: useId(), value: "no", label: "No" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        <Radio
          label="Have any of your first-degree relatives (parents, siblings, children) been diagnosed with cancer syndromes e.g. FAP, Lynch?"
          name="have_any_of_your_first_degree_relatives_been_diagnosed_with_cancer_syndromes"
          radioData={[
            { id: useId(), value: "yes", label: "Yes" },
            { id: useId(), value: "no", label: "No" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />

        <InputField
          key="relatives_what_type_of_cancer"
          label={
            <>
              What type of cancer ? <span className="text-red-500">*</span>
            </>
          }
          name="relatives_what_type_of_cancer"
          id="relatives_what_type_of_cancer"
          placeholder="Enter"
          value={formik.values.relatives_what_type_of_cancer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
    </>
  );
}
