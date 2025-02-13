import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalstorage";
import {
	changeStep,
	selectCurrentStep
} from "../../../slice/patient-detail-form";
import FormSection from "../components/FormSection";
import FormSubmitFooter from "../components/FormSubmitFooter";
import EnvironmentalAndOccupationalForm from "./EnvironmentalAndOccupationalForm";
import { getEnvironmentalAndOccupationalFormInitialValues } from "./initialValues";
import { combinedValidationSchema } from "./validationSchemas";

const ToxicExposureForm = () => {
  const dispatch = useDispatch();

  const currentStep = useSelector(selectCurrentStep);

  const [formData, setFormData] = useLocalStorage("formData", {});

  const initialValues = {
    ...getEnvironmentalAndOccupationalFormInitialValues(
      formData.toxic_exposure
    ),
  };

  const onSubmit = async (values) => {
    console.log("Form submitted with values:", values);

    setFormData({
      ...formData,
      toxic_exposure: values,
      currentStep,
    });

    // Next step
    dispatch(changeStep(currentStep + 1));
  };

  const formSections = [
    {
      title: "Environmental and Occupational Health Risks",
      isSubmitted: false,
      isDefaultOpen: true,
      component: <EnvironmentalAndOccupationalForm />,
    },
  ];

  return (
    <div className="w-full pb-24">
      <div className="mx-auto w-full rounded-2xl">
        <Formik
          initialValues={initialValues}
          validationSchema={combinedValidationSchema}
        //   validateOnMount={true}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              {formSections.map((section, index) => (
                <FormSection
                  key={section.title}
                  title={section.title}
                  isSubmitted={section.isSubmitted}
                  isDefaultOpen={section.isDefaultOpen}
                >
                  {React.cloneElement(section.component, { formik })}
                </FormSection>
              ))}
              <FormSubmitFooter formik={formik} step={currentStep} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ToxicExposureForm;
