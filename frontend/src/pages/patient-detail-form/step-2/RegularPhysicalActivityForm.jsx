import React, { useId } from 'react';
import Radio from '../../../components/Form/Radio';
import SelectField from '../../../components/Form/SelectMultipleField';
import HeadingWithTooltipText from '../../../components/HeadingWithIcon';
const Options = [
  { id: 'Cardiovascular/Aerobic', label: 'Cardiovascular/Aerobic' },
  { id: 'Strength Training/Resistance', label: 'Strength Training/Resistance' },
  { id: 'Flexibility/Balance', label: 'Flexibility/Balance' },
  { id: 'Walking', label: 'Walking' },
  { id: 'Jogging', label: 'Jogging' },
  { id: 'Swimming', label: 'Swimming' }
];

export default function RegularPhysicalActivityForm({ formik }) {

  return (
    <>
      <div className="flex grow flex-col gap-[16px] ">
        <HeadingWithTooltipText headTtext={"Pysical Inactivity"} tooltipText={"Regular physical activity and healthy dietary habits help reduce the risk of several cancers, including colon, breast, and endometrial cancer. Not being physically active is a risk factor for health problems. Physical inactivity is associated with an increased risk of developing many other diseases, including: Cardiovascular disease, High blood pressure, Type 2 diabetes, Anxiety and depression, etc."} steps={[]}
        />

        <Radio
          label="Have you engaged in regular physical exercise (minimum 30 minutes of moderate intensity exercise daily) over last 6 months ?"
          name="have_you_engaged_in_regular_physical_exercise_over_last_6_months"
          radioData={[
            {
              id: useId(),
              value: "Yes,consistently",
              label: "Yes,consistently",
            },
            { id: useId(), value: "no_rarely", label: "No,rarely" },
            { id: useId(), value: "occasionally", label: "Occasionally" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        <SelectField
          key="type_of_physical_activity"
          label={
            <>
              What type(s) of exercise or physical activities do you typically do?  <span className="text-red-500">*</span>
            </>
          }
          name="type_of_physical_activity"
          id="type_of_physical_activity"
          formik={formik}
          placeholder="Select"
          value={formik.values.type_of_physical_activity}
          optionsDataName="type_of_physical_activity"
          optionsData={Options}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-1/2"
        />
        <Radio
          label="What is your intensity of the physical activities that you are engaged in ?"
          name="what_is_your_intensity_of_the_physical_activities_that_you_are_engaged_in"
          radioData={[
            {
              id: useId(),
              value: "moderate_to_vigorous",
              label: "Moderate to vigorous",
            },
            {
              id: useId(),
              value: "varied_including_some_moderate",
              label: "Varied, including some moderate",
            },
            {
              id: useId(),
              value: "mostly_sedentary_or_light",
              label: "Mostly sedentary or light",
            },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        <Radio
          label="How often do you engage in physical exercise each week?"
          name="how_often_do_you_engage_in_physical_exercise_each_week"
          radioData={[
            {
              id: useId(),
              value: "at_least_5_times",
              label: "At least 5 times",
            },
            { id: useId(), value: "2_4_times", label: "2-4 times" },
            {
              id: useId(),
              value: "less_than_once_or_twice",
              label: "Less than once or twice",
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
