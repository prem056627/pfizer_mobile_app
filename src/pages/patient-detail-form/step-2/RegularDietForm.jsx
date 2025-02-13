import React, { useId } from 'react';
import Radio from '../../../components/Form/Radio';
import { ReactComponent as NextDownChevron } from '../../../assets/images/svg/NextDownChevron.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeStep,
  selectCurrentStep,
  selectPatientDetails,
  setPatientDetails,
} from '../../../slice/patient-detail-form';
import SelectField from '../../../components/Form/SelectField';
import HeadingWithTooltipText from '../../../components/HeadingWithIcon';
const genderOptions = [
  { id: 'Cigarettes/Bidi', label: 'Cigarettes/Bidi' },
  { id: 'Cigars', label: 'Cigars' },
  { id: 'Cigarettes', label: 'E-Cigarettes' },
  { id: 'other', label: 'E-Cigarettes' },
  { id: 'other', label: 'E-Cigarettes' },
  { id: 'other', label: 'E-Cigarettes' },
];

export default function RegularDietForm({ formik, setStep, closeAccordion }) {
  const currentStep = useSelector(selectCurrentStep);
  const patientDetails = useSelector(selectPatientDetails);

  const dispatch = useDispatch();

  const handleCloseAccordion = () => {
    closeAccordion();
  };

  const onSubmit = (values) => {
    console.log('{ ...patientDetails, ...values }', {
      ...patientDetails,
      ...values,
    });

    setStep(2);
    handleCloseAccordion();
  };
  const radioOptions = [
    { id: useId(), value: 'Yes', label: 'Yes' },
    { id: useId(), value: 'No', label: 'No' }
  ];

  return (
    <>
      <div className="flex grow flex-col gap-[16px] ">
      <HeadingWithTooltipText headTtext={"Unhealthy Diet"} tooltipText={"Diets high in processed meats, red meat, unhealthy fats, refined carbohydrates, and low in fruits, vegetables, and whole grains can increase cancer risk. A healthy, balanced diet rich in fiber and antioxidants may help reduce cancer risk. Unhealthy Diet is associated with an increased risk of developing many other diseases, including: cardiovascular diseases, diabetes and other conditions linked to obesity."} steps={[]}
				/>
        <Radio
          label="How often do you consume processed or red meats in a typical week ?"
          name="how_often_do_you_consume_processed_or_red_meats_in_a_typical_week"
          radioData={[
            { id: useId(), value: "rarely", label: "Rarely" },
            { id: useId(), value: "weekly", label: "Weekly" },
            { id: useId(), value: "daily", label: "Daily" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        <Radio
          label="How often do you include high-fat or fried foods in your diet ?"
          name="how_often_do_you_include_high_fat_or_fried_foods_in_your_diet"
          radioData={[
            { id: useId(), value: "rarely", label: "Rarely" },
            { id: useId(), value: "weekly", label: "Weekly" },
            { id: useId(), value: "daily", label: "Daily" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
        <Radio
          label="How frequently do you consume sugary foods or beverages in your diet ?"
          name="how_frequently_do_you_consume_sugary_foods_or_beverages_in_your_diet"
          radioData={[
            { id: useId(), value: "rarely", label: "Rarely" },
            { id: useId(), value: "weekly", label: "Weekly" },
            { id: useId(), value: "daily", label: "Daily" },
          ]}
          formik={formik}
          checkboxType="circle"
          onChange={formik.handleChange}
        />
      </div>
    </>
  );
}
