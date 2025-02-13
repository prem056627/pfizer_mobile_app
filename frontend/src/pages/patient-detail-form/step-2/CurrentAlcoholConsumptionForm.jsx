import React, { useId } from 'react';
import Radio from '../../../components/Form/Radio';
import SelectField from '../../../components/Form/SelectMultipleField';
import HeadingWithTooltipText from '../../../components/HeadingWithIcon';
const Options = [
  { id: 'Heavy', label: 'Heavy [> drink (30ml) per day for women and >2 drink (60 ml of hard drink) per day for men)' },
  { id: 'Occasional', label: 'Occasional' },
  { id: 'Moderate', label: 'Moderate [1 drink (30ml) per day for women and 2 drink (60 ml of hard drink) per day for men]' }
];

export default function CurrentAlcoholConsumptionForm({ formik, setStep, closeAccordion }) {
  const radioOptions = [
    { id: useId(), value: 'yes', label: 'Yes' },
    { id: useId(), value: 'no', label: 'No' }
  ];

  return (
    <>
      <div className="flex grow flex-col gap-[16px] ">
      <HeadingWithTooltipText headTtext={"Alcohol Consumption"} tooltipText={"Excessive alcohol consumption is linked to an increased risk of several cancers, including mouth, throat, esophagus, liver, breast, and colon cancer. The risk increases with the time period and amount of alcohol consumed. Alcohol consumption is also leads to many other diseases and health conditions, including: liver disease, including steatosis (accumulation of fat), steatohepatitis (inflammation), fibrosis and cirrhosis (scarring), hepatocellular carcinoma, etc."} steps={[]}
				/>

        <Radio
          label="Do you drink alcoholic beverages ?"
          name="do_you_drink_alcoholic_beverages"
          radioData={radioOptions}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        <SelectField
          key="type_of_alcohol"
          label={
            <>
              If yes, How much do you consume (per day) <span className="text-red-500">*</span>
            </>
          }
          name="type_of_alcohol"
          id="type_of_alcohol"
          formik={formik}
          placeholder="Select"
          value={formik.values.type_of_alcohol}
          optionsDataName="type_of_alcohol"
          optionsData={Options}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-1/2"
        />
        <Radio
          label="For how long did you consume any form of alcohol throughout your ?"
          name="for_how_long_did_you_consume_any_form_of_alcohol_throughout_your"
          radioData={[
            { id: useId(), value: "less_then_10_years", label: "<10 years" },
            { id: useId(), value: "greater_then_10_years", label: ">10 years" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
      </div>
    </>
  );
}
