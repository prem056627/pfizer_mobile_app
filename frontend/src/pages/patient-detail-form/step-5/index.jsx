import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import useApi from "../../../hooks/useApi";
import useLocalStorage from "../../../hooks/useLocalstorage";
import { selectCurrentStep } from "../../../slice/patient-detail-form";
import FormSection from "../components/FormSection";
import FormSubmitFooter from "../components/FormSubmitFooter";
import CancerRiskAndWarningSigns from "./CancerRiskAndWarningSigns";
import { getCancerRiskAndWarningSignsInitialValues } from "./initialValues";
import { combinedValidationSchema } from "./validationSchemas";
import { useNavigate } from "react-router-dom";

const ControllableCancerRiskExposure = () => {
  const triggerApi = useApi();
  	const navigate = useNavigate();

  const currentStep = useSelector(selectCurrentStep);

  const [formData, setFormData] = useLocalStorage("formData", {});

  const initialValues = {
    ...getCancerRiskAndWarningSignsInitialValues(
      formData.controllable_cancer_risk_exposure
    ),
  };

  const onSubmit = async (values) => {
    setFormData({
      ...formData,
      controllable_cancer_risk_exposure: values,
      currentStep,
    });

    console.log("Form submitted with values:", values);

    const postData = {
      ...formData,
      controllable_cancer_risk_exposure: values,
    };

    delete postData.currentStep;

    const makeApiCall = async (step) => {
      console.log("test 123");
      try {
        const { response, success } = await triggerApi({
          url: `/patient-initialize/`,
          type: "POST",
          loader: true,
          payload: postData,
        });

        if (success && response) {
          navigate("submission");

        }
      } catch (error) {
        console.error("Error during API call:", error);
      }
    };
    
    // makeApiCall()
  };

  const formSections = [
    {
      title: "Controllable Cancer Risks and Early Warning Signs",
      isSubmitted: false,
      isDefaultOpen: true,
      component: <CancerRiskAndWarningSigns />,
    },
  ];

  return (
    <div className="w-full pb-80">
      <div className="mx-auto w-full rounded-2xl">
        <Formik
          initialValues={initialValues}
          validationSchema={combinedValidationSchema}
          validateOnMount={true}
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

export default ControllableCancerRiskExposure;
