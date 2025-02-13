import React from 'react';
import SelectField from '../../../components/Form/SelectMultipleField';
const Options = [
  { id: 'Cigarettes/Bidi', label: "Fatigue or extreme tiredness that doesn't get better with rest" },
  { id: 'Cigars', label: 'Weight loss or gain of 10 pounds or more for no known reason' },
  { id: 'Cigarettes', label: 'Eating problems such as not feeling hungry, trouble swallowing, belly pain, or nausea and vomiting' },
  { id: 'Pipes', label: 'Swelling or lumps anywhere in the body' },
  { id: 'Hukkah Consumption', label: 'Thickening or lump in the breast or other part of the body' },
  { id: 'Paan Consumption', label: 'Cough or hoarseness that does not go away' },
  { id: 'Paan Masala/Gutka Consumption', label: 'Unusual bleeding or bruising for no known reason' },
];

export default function CancerRiskAndWarningSigns({ formik }) {
  return (
    <>
      <div className="flex grow flex-col gap-[16px] mb-[80px]">
        <SelectField
          key="do_you_have_any_following_symptoms_or_warning_signs_related_to_cancer_would_prompt_you_to_seek_medical_advice"
          label={
            <>
              Do you have any following symptoms or warning signs related to
              cancer would prompt you to seek medical advice? Select any that
              apply <span className="text-red-500">*</span>
            </>
          }
          name="do_you_have_any_following_symptoms_or_warning_signs_related_to_cancer_would_prompt_you_to_seek_medical_advice"
          id="do_you_have_any_following_symptoms_or_warning_signs_related_to_cancer_would_prompt_you_to_seek_medical_advice"
          formik={formik}
          placeholder="Select"
          value={
            formik.values
              .do_you_have_any_following_symptoms_or_warning_signs_related_to_cancer_would_prompt_you_to_seek_medical_advice
          }
          optionsDataName="do_you_have_any_following_symptoms_or_warning_signs_related_to_cancer_would_prompt_you_to_seek_medical_advice"
          optionsData={Options}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className=""
        />
      </div>
    </>
  );
}
