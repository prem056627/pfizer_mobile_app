import React, { useId } from 'react';
import Radio from '../../../components/Form/Radio';
import SelectField from '../../../components/Form/SelectMultipleField';
import HeadingWithTooltipText from "../../../components/HeadingWithIcon";
const Options = [
	{ id: 'Cigarettes/Bidi', label: 'Cigarettes/Bidi' },
	{ id: 'Cigars', label: 'Cigars' },
	{ id: 'Cigarettes', label: 'E-Cigarettes' },
	{ id: 'Pipes', label: 'E-Pipes' },
	{ id: 'Hukkah Consumption', label: 'Hukkah Consumption' },
	{ id: 'Paan Consumption', label: 'Paan Consumption' },
	{ id: 'Paan Masala/Gutka Consumption', label: 'Paan Masala/Gutka Consumption' },
	{ id: 'Chewing Tobacco ', label: 'Chewing Tobacco ' },
];

export default function CurrentTobaccoConsumptionForm({ formik }) {

	const radioOptions = [
		{ id: useId(), value: 'Yes', label: 'Yes' },
		{ id: useId(), value: 'No', label: 'No' }
	];

	return (
    <>
      <div className="flex grow flex-col gap-[16px] ">
        <HeadingWithTooltipText
          headTtext={"Tobacco Consumption"}
          tooltipText={
            "Consumption of tobacco products is the single largest preventable cause of cancer. It damages cells throughout the body and increases the risk of various cancers, including lung, mouth, throat, esophagus, bladder, kidney, pancreas, stomach, cervix, and leukemia. Tobacco consumption is also leads to many diseases and health conditions, including: heart disease, stroke, lung diseases, diabetes, and chronic obstructive pulmonary disease (COPD), etc."
          }
          steps={[]}
        />
        <Radio
          label="Do you currently smoke or consume tobacco products ?"
          name="do_you_currently_smoke_or_consume_tobacco_products"
          radioData={radioOptions}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        <SelectField
          key="type_of_tobacco"
          label={
            <>
              Select All That Apply <span className="text-red-500">*</span>
            </>
          }
          name="type_of_tobacco"
          id="type_of_tobacco"
          formik={formik}
          placeholder="Select"
          value={formik.values.type_of_tobacco}
          optionsDataName="type_of_tobacco"
          optionsData={Options}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-1/2"
        />
        <Radio
          label="How long have you been Consuming any form of tobacco ?"
          name="how_long_have_you_been_consuming_any_form_of_tobacco"
          radioData={[
            { id: useId(), value: "less_then_10_years", label: "<10 years" },
            { id: useId(), value: "more_then_10_years", label: ">10 years" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        <Radio
          label=" How much do you consume cigarettes /Bidi  | Cigars|E-cigarates|pipes|hukkash Consumption ?"
          name="how_much_do_you_consume_cigarettes_bidi_cigars_e_cigarettes_pipes_hukkah_consumption"
          radioData={[
            {
              id: useId(),
              value: "less_then_12_cigarates_per_day",
              label: "<12 Cigarates per day",
            },
            {
              id: useId(),
              value: "more_then_20_cigarates_per_day",
              label: ">20 Cigarates per day",
            },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        <Radio
          label="How much do you consume Paan Consumption |Tobacco / Paan Masala / Gutka Consumption /Chewing Tobacco ?"
          name="how_much_do_you_consume_paan_consumption_tobacco_paan_masala_gutka_consumption_chewing_tobacco"
          radioData={[
            {
              id: useId(),
              value: "less_then_12_cigarates_per_day",
              label: "<12 Cigarates per day",
            },
            {
              id: useId(),
              value: "more_then_20_cigarates_per_day",
              label: ">20 Cigarates per day",
            },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
      </div>
      {/* <div className="sticky bottom-0 flex flex-col gap-[8px] bg-[#ffffff] pt-[24px] font-lato text-[#696969]">
				<button
					type="submit"
					className="flex w-full items-center justify-end  px-[16px] py-[14px] font-lato text-[14px] font-bold leading-[20px] text-white"
				>
					<div className="flex items-center justify-center gap-4 text-primary">
						<NextDownChevron />
						<span className="text-base font-bold">Next</span>
					</div>
				</button>
			</div> */}
    </>
  );
}
