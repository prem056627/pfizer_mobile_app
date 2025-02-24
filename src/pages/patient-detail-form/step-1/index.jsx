import React from "react";
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
import useLocalStorage from "../../../hooks/useLocalstorage";
import AddressProofForm from "./AddressProofForm";
import CurrentResidentialAddress from "./CurrentResidentialAddress";
import IDDetails from "./IDDetails";
import { getProfileInitialValues,fieldGroups } from "./initialValues";

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
  const currentStep = useSelector(selectCurrentStep);
  const [formData, setFormData] = useLocalStorage("formData", {});
  
  // Get initial values from stored data
  const initialValues = getProfileInitialValues(formData?.profile_details);
  // Get initial values directly from stored data
  // const initialValues = formData?.profile_details || {
  //   // Personal Details
  //   full_name: "",
  //   gender: "",
  //   date_of_birth: null,
  //   mobile_number: "",
  //   email: "",
  //   nationality: "",
    
  //   // Address Proof
  //   permanent_addressline1: "",
  //   permanent_addressline2: "",
  //   permanent_city: "",
  //   permanent_state: "",
  //   permanent_pincode: "",
    
  //   // Current Residential Address
  //   same_as_permanent: false,
  //   current_addressline1: "",
  //   current_addressline2: "",
  //   current_city: "",
  //   current_state: "",
  //   current_pincode: "",
    
  //   // ID Details
  //   id_card_type: "",
  //   id_number: "",
  // };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setFormData({
        ...formData,
        profile_details: values,
      });
      dispatch(changeStep(currentStep + 1));
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // const formSections = [
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
                step={currentStep}
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