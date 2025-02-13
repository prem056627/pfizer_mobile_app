import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import PersonlDetailsForm from "./PersonlDetailsForm";

import FormSubmitFooter from "../components/FormSubmitFooter";
import FormSection from "../components/FormSection";
import {
  changeStep,
  selectCurrentStep,
} from "../../../slice/patient-detail-form";
import { combinedValidationSchema } from "./validationSchemas";
import { getPersonalDetailsInitialValues } from "./initialValues";
import useLocalStorage from "../../../hooks/useLocalstorage";

const PersonalDetails = () => {
  const dispatch = useDispatch();

  const currentStep = useSelector(selectCurrentStep);

  const [formData, setFormData] = useLocalStorage("formData", {});

  const initialValues = {
    ...getPersonalDetailsInitialValues(formData.personal_details),
  };

  const onSubmit = async (values) => {
    console.log("Form submitted with values:", values);

    setFormData({
      ...formData,
      personal_details: values,
      currentStep,
    });

    // Next step
    dispatch(changeStep(currentStep + 1));
  };

  const formSections = [
    {
      title: "Personal Details",
      isSubmitted: false,
      isDefaultOpen: true,
      component: <PersonlDetailsForm />,
    },
  ];

  return (
    <div className="w-full pb-24">
      <div className="mx-auto w-full rounded-2xl">
        <Formik
          initialValues={initialValues}
          validationSchema={combinedValidationSchema}
          //   validateOnMount={true}
          validateOnBlur
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

export default PersonalDetails;
