import React, { useId } from 'react';
import Radio from '../../../components/Form/Radio';
import SelectField from '../../../components/Form/SelectMultipleField';
import HeadingWithTooltipText from '../../../components/HeadingWithIcon';
const Options = [
  { id: 'Cigarettes/Bidi', label: 'Cigarettes/Bidi' },
	{ id: 'Cigars', label: 'Cigars' },
	{ id: 'Cigarettes', label: 'E-Cigarettes' },
	{ id: 'Pipes', label: 'Pipes' },
	{ id: 'Hukkah Consumption', label: 'Hukkah Consumption' },
	{ id: 'Paan Consumption', label: 'Paan Consumption' },
	{ id: 'Paan Masala/Gutka Consumption', label: 'Paan Masala/Gutka Consumption' },
	{ id: 'Chewing Tobacco ', label: 'Chewing Tobacco ' },
];

export default function PastTobaccoConsumptionForm({ formik, setStep, closeAccordion }) {

  const radioOptions = [
    { id: useId(), value: 'yes', label: 'Yes' },
    { id: useId(), value: 'no', label: 'No' }
  ];

  return (
    <>
      <div className="flex grow flex-col gap-[16px] ">
      <HeadingWithTooltipText headTtext={"Tobacco Consumption"} tooltipText={"Consumption of tobacco products is the single largest preventable cause of cancer. It damages cells throughout the body and increases the risk of various cancers, including lung, mouth, throat, esophagus, bladder, kidney, pancreas, stomach, cervix, and leukemia. Tobacco consumption is also leads to many diseases and health conditions, including: heart disease, stroke, lung diseases, diabetes, and chronic obstructive pulmonary disease (COPD), etc."} steps={[]}
				/>
        <Radio
          label="Have you smoked or consume tobacco products in the past ?"
          name="past_how_much_do_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco"
          radioData={radioOptions}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        <SelectField
          key="past_type_of_tobacco"
          label={
            <>
              Select All That Apply <span className="text-red-500">*</span>
            </>
          }
          name="past_type_of_tobacco"
          id="past_type_of_tobacco"
          formik={formik}
          placeholder="Select"
          value={formik.values.past_type_of_tobacco}
          optionsDataName="past_type_of_tobacco"
          optionsData={Options}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-1/2"
        />
        <Radio
          label="For how long have you quit any form of tobocco?"
          name="for_how_long_have_you_quit_any_form_of_tobacco"
          radioData={[
            { id: useId(), value: "less_then_10_years", label: "<10 years" },
            { id: useId(), value: "greater_then_10_years", label: ">10 years" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={(event) =>
            console.log("Radio changed:", event.target.value)
          }
        />
        <Radio
          label="For how long did you consume any form of tobacco throughout your lifetime ?"
          name="for_how_long_did_you_consume_any_form_of_tobacco_throughout_your_lifetime"
          radioData={[
            {
              id: useId(),
              value: "less_then_12_cigarates_per_day",
              label: "<12 Cigarates per day",
            },
            {
              id: useId(),
              value: "greater_then_20_cigarates_per_day",
              label: ">20 Cigarates per day",
            },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        <Radio
          label="How much do you consume Cigarettes / Bidi | Cigars |E-cigarettes [Pipes | Hukkah Consumption ?"
          name="past_how_much_do_you_consume_cigarettes_bidi_cigars_e_cigarettes_pipes_hukkah_consumption"
          radioData={[
            {
              id: useId(),
              value: "less then_12_cigarates_per_day",
              label: "<12 Cigarates per day",
            },
            {
              id: useId(),
              value: "greather_then_20_cigarates_per_day",
              label: ">20 Cigarates per day",
            },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        <Radio
          label="How much did you consume Paan Consumption |Tobacco / Paan Masala / Gutka Consumption / Chewing Tobacco ?"
          name="how_much_did_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco"
          radioData={[
            { id: useId(), value: "occasional", label: "Occasional" },
            { id: useId(), value: "regular", label: "Regular" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
      </div>
    </>
  );
}
