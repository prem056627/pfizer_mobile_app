import React, { useEffect, useState } from "react";
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
  selectCurrentPageState,
  setCurrentPageState,
  setProgramStatus,
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

  const currentPageState = useSelector(selectCurrentPageState);
  const [formData, setFormData] = useLocalStorage("formData", {});
const [isLoading, setIsLoading] = useState(true);
  const triggerApi = useApi();
  const initialValues = {
    ...getCaregiverDetailsInitialValues(formData)
  };

  let initiaData = useSelector(selectPatientDetails);
  // console.log('initiaDatainitiaDatainitiaDatainitiaDatainitiaDatainitiaData',initiaData?.data?.enrollment_details.step_data
  // );



// And here's the fixed client-side function:
const makeApiCall = async (values) => {
  try {
    setIsLoading(true);

    // Set current_step parameter in the URL
    const url = `/patient_dashboard/?current_step=caregiver_addition`;
    
    const { response, success } = await triggerApi({
      url: url,
      type: "POST",
      payload: values || {}, // Make sure we always send a valid object
      loader: true,
    });

    if (success && response) {
      console.log("Form data submitted successfully:", response);
      dispatch(setCurrentPageState(response?.current_step))
      dispatch(setProgramStatus(response?.program_status))
      
      return { success: true, data: response };
    } else {
      console.error("API call failed or returned no data.");
      return { success: false, error: "API call failed" };
    }
  } catch (error) {
    console.error("Error in makeApiCall:", error);
    return { success: false, error };
  } finally {
    setIsLoading(false);
  }
};


  const onSubmit = async (values) => {

    console.log("current 2nd step vlues" , values)


     try {
          // Save to local storage
          setFormData({
            ...formData,
            CaregiverDetails: values,
          });
          
          // Submit data to API
          const result = await makeApiCall(values);
          
          if (result.success) {
            dispatch(setPatientEnrollmentSuccessModalOpen(true));
            // Navigate to next step or show success message
            // dispatch(changeStep(currentStep + 1));
          }
        } catch (error) {
          console.error("Form submission error:", error);
        } finally {
          // setSubmitting(false);
        }
    // console.log("Form submitted with values:", values);

    // const postData = {
    //   ...formData,
    //   cancer_risk_factors: values,
    // };

    // delete postData.currentPageState;

   

    // setFormData({
    //   ...formData,
    //   cancer_risk_factors: values,
    //   currentPageState,
    // });

    // try {
    //   const { response, success } = await triggerApi({
    //     url: `/api/patient/enrol/`,
    //     type: "POST",
    //     loader: true,
    //     payload: postData,
    //   });

    //   if (success && response) {
    //     // navigate("submission");
    //     dispatch(setPatientEnrollmentSuccessModalOpen(true));
    //   }
    // } catch (error) {
    //   console.error("Error during API call:", error);
    // }

    // dispatch(changeStep(currentPageState + 1));
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
          // validateOnMount={
          //   formData?.cancer_risk_factors && 
          //   Object.keys(formData?.cancer_risk_factors).length > 0
          // }
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
              <FormSubmitFooter formik={formik} step={currentPageState} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CaregiverDetailsForm;