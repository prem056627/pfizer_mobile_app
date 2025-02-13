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
import { 
  getPersonalDetailsInitialValues,
  getAddressProofInitialValues,
  getCurrentResidentialAddressInitialValues,
  getIDDetailsInitialValues
} from "./initialValues";
import useLocalStorage from "../../../hooks/useLocalstorage";
import AddressProofForm from "./AddressProofForm";
import CurrentResidentialAddress from "./CurrentResidentialAddress";
import IDDetails from "./IDDetails";

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const [formData, setFormData] = useLocalStorage("formData", {});

  // Structure initial values to match validation schema
  const initialValues = {
    personal_details: getPersonalDetailsInitialValues(formData?.personal_details),
    address_proof: getAddressProofInitialValues(formData?.address_proof),
    current_residential_address: getCurrentResidentialAddressInitialValues(formData?.current_residential_address),
    id_details: getIDDetailsInitialValues(formData?.id_details)
  };

  // useEffect(() => {
  //   console.log('Initial Values:', initialValues);
  // }, []);

  const onSubmit = async (values, { setSubmitting, validateForm }) => {
    console.log("Form submitted with values:", values);
    
    // Validate the entire form
    const errors = await validateForm(values);
    console.log("Validation Errors:", errors);
    
    if (Object.keys(errors).length === 0) {
      setFormData({
        ...formData,
        ...values,  // Save all sections
        currentStep,
      });
      dispatch(changeStep(currentStep + 1));
    }
    
    setSubmitting(false);
  };

  const formSections = [
    {
      title: "Personal Details",
      isSubmitted: false,
      isDefaultOpen: true,
      component: <PersonlDetailsForm />,
      fieldPrefix: "personal_details"
    },
    {
      title: "Address proof",
      isSubmitted: false,
      isDefaultOpen: false,
      component: <AddressProofForm />,
      fieldPrefix: "address_proof"
    },
    {
      title: "Current Residential Address",
      isSubmitted: false,
      isDefaultOpen: false,
      component: <CurrentResidentialAddress />,
      fieldPrefix: "current_residential_address"
    },
    {
      title: "ID Details",
      isSubmitted: false,
      isDefaultOpen: false,
      component: <IDDetails />,
      fieldPrefix: "id_details"
    },
  ];

  return (
    <div className="w-full pb-24">
      <div className="mx-auto w-full rounded-2xl">
        <Formik
         initialValues={initialValues}
         validationSchema={combinedValidationSchema}
         validateOnBlur={true}
         validateOnChange={true}
         onSubmit={onSubmit}
        >
          {(formik) => {
            // Debug logging
            // useEffect(() => {
            //   console.log('Current Values:', formik.values);
            //   console.log('Current Errors:', formik.errors);
            //   console.log('Touched Fields:', formik.touched);
            // }, [formik.values, formik.errors, formik.touched]);

            return (
              <Form >
                {formSections.map((section) => (
                  <FormSection
                    key={section.title}
                    title={section.title}
                    isSubmitted={section.isSubmitted}
                    isDefaultOpen={section.isDefaultOpen}
                  >
                   {React.cloneElement(section.component, { 
  formik,
  fieldPrefix: section.fieldPrefix,
  values: formik.values[section.fieldPrefix],
  errors: formik.errors[section.fieldPrefix],
  touched: formik.touched[section.fieldPrefix]
})}

                  </FormSection>
                ))}
                <FormSubmitFooter 
                  formik={formik} 
                  step={currentStep}
                  disabled={!formik.isValid || formik.isSubmitting}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default PersonalDetails;