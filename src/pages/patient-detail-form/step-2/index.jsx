import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
// import { useNavigate } from "react-router-dom";

import useApi from "../../../hooks/useApi";
import {
  setPatientDetails,
  changeStep,
  selectCurrentStep,
  selectPatientDetails,
  setPatientEnrollmentSuccessModalOpen,
} from "../../../slice/patient-detail-form";
import { combinedValidationSchema } from "./validationSchemas";
import { getCaregiverDetailsInitialValues } from "./initialValues";
import FormSection from "../components/FormSection";
import FormSubmitFooter from "../components/FormSubmitFooter";
import useLocalStorage from "../../../hooks/useLocalstorage";
import CaregiverDetails from "./CaregiverDetails";

const CaregiverDetailsForm = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const triggerApi = useApi();
  const currentStep = useSelector(selectCurrentStep);
  const [formData, setFormData] = useLocalStorage("formData", {});

  const initialValues = {
    ...getCaregiverDetailsInitialValues(formData.cancer_risk_factors)
  };

  // let initiaData = useSelector(selectPatientDetails);
  // console.log('initiaDatainitiaDatainitiaDatainitiaDatainitiaDatainitiaData',initiaData?.data?.enrollment_details.step_data
  // );

  const onSubmit = async (values) => {
    console.log("Form submitted with values:", values);

    const postData = {
      ...formData,
      cancer_risk_factors: values,
    };

    delete postData.currentStep;

   

    setFormData({
      ...formData,
      cancer_risk_factors: values,
      currentStep,
    });

    try {
      const { response, success } = await triggerApi({
        url: `/api/patient/enrol/`,
        type: "POST",
        loader: true,
        payload: postData,
      });

      if (success && response) {
        // navigate("submission");
        dispatch(setPatientEnrollmentSuccessModalOpen(true));
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }

    dispatch(changeStep(currentStep + 1));
  };

  const formSections = [
    {
      title: "Caregiver Details",
      isSubmitted: false,
      isDefaultOpen: false,
      component: <CaregiverDetails />,
    },
  ];

  return (
    <div className="w-full pb-24">
      <div className="mx-auto w-full rounded-2xl">
        <Formik
          initialValues={initialValues}
          validationSchema={combinedValidationSchema}
          validateOnMount={
            formData?.cancer_risk_factors && 
            Object.keys(formData?.cancer_risk_factors).length > 0
          }
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              {formSections.map((section) => (
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

export default CaregiverDetailsForm;