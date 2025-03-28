import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import PersonlDetailsForm from "./PersonlDetailsForm";
import FormSubmitFooter from "../components/FormSubmitFooter";
import FormSection from "../components/FormSection";
import {
  changeStep,
  selectCurrentPageState,
  selectCurrentStep,
  selectInitializeData,
  setCurrentPageState,
} from "../../../slice/patient-detail-form";
import { combinedValidationSchema } from "./validationSchemas";
import useLocalStorage from "../../../hooks/useLocalstorage";
import AddressProofForm from "./AddressProofForm";
import CurrentResidentialAddress from "./CurrentResidentialAddress";
import IDDetails from "./IDDetails";
import { getProfileInitialValues,fieldGroups } from "./initialValues";
import useApi from "../../../hooks/useApi";

const FormDebugger = ({ values, errors, touched }) => {
  React.useEffect(() => {
    console.log('Current Values:', values);
    console.log('Current Errors:', errors);
    console.log('Touched Fields:', touched);
  }, [values, errors, touched]);

  return null;
};











const PersonalDetails = () => {
  const dispatch = useDispatch();
  // const currentStep = useSelector(selectCurrentStep);

  const currentPageState = useSelector(selectCurrentPageState);


  const initialDataa = useSelector(selectInitializeData);
// // Avoid accessing undefined properties
// const step1Data = initialDataa?.enrollment_details?.step_data?.personal_details || {};


const [formData, setFormData] = useLocalStorage("formData", {});
const [isLoading, setIsLoading] = useState(true);
  const triggerApi = useApi();
  
  // Get initial values from stored data
  const initialValues = getProfileInitialValues(formData.profile_details);



// And here's the fixed client-side function:
const makeApiCall = async (values) => {
  // console.log("form Val!!! " , values ) ;
  const payload_val = JSON.stringify(values);
  try {
    setIsLoading(true);

    // Set current_step parameter in the URL
    const currentStep = currentPageState; // This should be dynamically assigned
   const url = `/patient_dashboard/?current_step=${currentStep}`;

    const { response, success } = await triggerApi({
      url: url,
      type: "POST",
      payload: payload_val || {},
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
      loader: true,
    });

    if (success && response) {
      console.log("Form data submitted successfully:", response.current_step);
      dispatch(setCurrentPageState(response?.current_step))
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

    console.log('valuessss!!',values);
    try {
      // Save to local storage
      setFormData({
        ...formData,
        profile_details: values,
      });
      
      // Submit data to API
      const result = await makeApiCall(values);
      
      if (result.success) {
        // Navigate to next step or show success message
        // dispatch(changeStep(currentStep + 1));
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  //   {
  //     title: "Personal Details",
  //     isSubmitted: false,
  //     isDefaultOpen: true,
  //     component: <PersonlDetailsForm />,
  //     fields: [
  //       'full_name',
  //       'gender',
  //       'date_of_birth',
  //       'mobile_number',
  //       'email',
  //       'nationality'
  //     ]
  //   },
  //   {
  //     title: "Address proof",
  //     isSubmitted: false,
  //     isDefaultOpen: false,
  //     component: <AddressProofForm />,
  //     fields: [
  //       'permanent_addressline1',
  //       'permanent_addressline2',
  //       'permanent_city',
  //       'permanent_state',
  //       'permanent_pincode'
  //     ]
  //   },
  //   {
  //     title: "Current Residential Address",
  //     isSubmitted: false,
  //     isDefaultOpen: false,
  //     component: <CurrentResidentialAddress />,
  //     fields: [
  //       'same_as_permanent',
  //       'current_addressline1',
  //       'current_addressline2',
  //       'current_city',
  //       'current_state',
  //       'current_pincode'
  //     ]
  //   },
  //   {
  //     title: "ID Details",
  //     isSubmitted: false,
  //     isDefaultOpen: false,
  //     component: <IDDetails />,
  //     fields: ['id_card_type', 'id_number']
  //   },
  // ];
  const formSections = [
    {
      title: "Personal Details",
      isSubmitted: false,
      isDefaultOpen: true,
      component: <PersonlDetailsForm />,
      fields: fieldGroups.personalDetails
    },
    {
      title: "Address proof",
      isSubmitted: false,
      isDefaultOpen: false,
      component: <AddressProofForm />,
      fields: fieldGroups.addressProof
    },
    {
      title: "Current Residential Address",
      isSubmitted: false,
      isDefaultOpen: false,
      component: <CurrentResidentialAddress />,
      fields: fieldGroups.currentResidentialAddress
    },
    {
      title: "ID Details",
      isSubmitted: false,
      isDefaultOpen: false,
      component: <IDDetails />,
      fields: fieldGroups.idDetails
    },
  ];

  // const initialDataaaaa = useSelector(selectInitializeData);

  // console.log( "initialaaaaaa!!!!!",initialDataaaaa);

  return (
    <div className="w-full pb-24">
      <div className="mx-auto w-full rounded-2xl">
        <Formik
          initialValues={initialValues}
          validationSchema={combinedValidationSchema}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={onSubmit}
          enableReinitialize={false}
        >
          {(formik) => (
            <Form>
              <FormDebugger 
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />

              {formSections.map((section) => (
                <FormSection
                  key={section.title}
                  title={section.title}
                  isSubmitted={section.isSubmitted}
                  isDefaultOpen={section.isDefaultOpen}
                >
                  {React.cloneElement(section.component, {
                    formik,
                    fields: section.fields,
                    values: formik.values,
                    errors: formik.errors,
                    touched: formik.touched
                  })}
                </FormSection>
              ))}
              <FormSubmitFooter
                formik={formik}
               
                disabled={!formik.isValid || formik.isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PersonalDetails;