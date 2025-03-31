import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";

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
import { transformToFormDataOrder, transformToPatientDetailsFormData } from "../../../utils/forms";

const CaregiverDetailsForm = () => {
  const dispatch = useDispatch();

  const currentPageState = useSelector(selectCurrentPageState);
  const [formData, setFormData] = useLocalStorage("formData", {});
  const [isLoading, setIsLoading] = useState(true);
  const triggerApi = useApi();
  
  const initialValues = {
    ...getCaregiverDetailsInitialValues(formData)
  };

  let initiaData = useSelector(selectPatientDetails);

  // const [caregivers, setCaregivers] = useState([
  //   {
  //     id: 0,
  //     caregiver_id: 10009,
  //     isVerified: false,
  //     otpSent: false,
  //     otp: Array(6).fill(""),
  //     timerSeconds: 0,
  //   },
  //   {
  //     id: 1,
  //     caregiver_id: 10010,
  //     isVerified: false,
  //     otpSent: false,
  //     otp: Array(6).fill(""),
  //     timerSeconds: 0,
  //   },
  //   {
  //     id: 2,
  //     caregiver_id: 10011,
  //     isVerified: false,
  //     otpSent: false,
  //     otp: Array(6).fill(""),
  //     timerSeconds: 0,
  //   },
  // ]);

  // const prepareFormData = (values) => {
  //   const formData = new FormData();
  
  //   // Function to handle file uploads for a specific caregiver
  //   const processCaregiver = (caregiverId) => {
  //     const caregiver = {
  //       caregiver_id: caregivers[caregiverId].caregiver_id,
  //       caregiver_name: values[`caregiver_${caregiverId}_name`] || "",
  //       caregiver_email: values[`caregiver_${caregiverId}_email`] || null,
  //       caregiver_mobile: values[`caregiver_${caregiverId}_mobile`] || null,
  //       caregiver_relation: values[`relationship_${caregiverId}`] || "NA",
        
  //       // Primary ID Details
  //       id_card_type: values[`id_card_type_${caregiverId}`] || "",
  //       id_number: values[`id_number_${caregiverId}`] || "",
        
  //       // First Additional ID Details
  //       id_card_type_1: values[`id_card_1_type_${caregiverId}${caregiverId}`] || "",
  //       id_number_1: values[`id_number_1_${caregiverId}${caregiverId}`] || "",
  //     };
  
  //     // Process file uploads for primary and first additional IDs
  //     const fileUploads = [
  //       { 
  //         key: `id_doc_upload_${caregiverId}`, 
  //         prefix: 'primary' 
  //       },
  //       { 
  //         key: `id_doc_1_upload_${caregiverId}`, 
  //         prefix: 'additional1' 
  //       }
  //     ];
      
  //     fileUploads.forEach(({ key, prefix }) => {
  //       const files = values[key] || []; // Get files array from formik.values, default to empty array
      
  //       if (Array.isArray(files) && files.length > 0) {
  //         files.forEach((file, index) => {
  //           if (file instanceof File) {
  //             const fileName = `caregiver_${caregiverId}_${prefix}_${index}_${file.name}`;
      
  //             // Append each file uniquely
  //             formData.append(`${key}_${index}`, file, fileName);
      
  //             // Ensure caregiver object tracks all filenames
  //             if (!caregiver[`${key}_names`]) {
  //               caregiver[`${key}_names`] = [];
  //             }
  //             caregiver[`${key}_names`].push(fileName);
  //           }
  //         });
  //       }
  //     });
      
  //     return caregiver;
  //   };
  
  //   // Prepare data for each caregiver
  //   const caregiverData = {
  //     caregiver0: processCaregiver(0),
  //     caregiver1: processCaregiver(1),
  //     caregiver2: processCaregiver(2)
  //   };
  
  //   // Append caregiver data as JSON
  //   formData.append('caregiverData', JSON.stringify(caregiverData));
  
  //   return formData;
  // };

    // Function to refresh the application
    const refreshApplication = () => {
      window.location.reload();
    };

  const makeApiCall = async (values) => {
    try {
      setIsLoading(true);

      const url = `/patient_dashboard/?current_step=caregiver_addition`;
      
      // Prepare FormData using values
      const preparedFormData = transformToPatientDetailsFormData(values);
      
      const { response, success } = await triggerApi({
        url: url,
        type: "POST",
        payload: preparedFormData, 
        loader: true,
      });

      if (success && response) {
        dispatch(setCurrentPageState(response?.current_step));

        // setTimeout(() => {
        //   refreshApplication();
        // }, 500);
        // const refreshApplication = () => {
        //   window.location.reload();
        // };
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

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      // Log values to debug
      console.log("Form Values:", values);

      setFormData({
        ...formData,
        CaregiverDetails: values,
      });
      
      const result = await makeApiCall(values);
      
      if (result.success) {
        dispatch(setPatientEnrollmentSuccessModalOpen(true));
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formSections = [
    {
      title: "Caregiver Details",
      isSubmitted: false,
      isDefaultOpen: true,
      component: <CaregiverDetails />,
    },
  ];

  return (
    <div className="w-full pb-24">
      <div className="mx-auto w-full rounded-2xl">
        <Formik
          initialValues={initialValues}
          validationSchema={combinedValidationSchema}
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