import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import CurrentTobaccoConsumptionForm from "./CurrentTobaccoConsumptionForm";

import useApi from "../../../hooks/useApi";
import {
  setPatientDetails,
  changeStep,
  selectCurrentStep,
  selectPatientDetails,
} from "../../../slice/patient-detail-form";
import { combinedValidationSchema } from "./validationSchemas";
import {
  getCurrentTobaccoConsumptionInitialValues,
  getPastTobaccoConsumptionFormInitialValues,
  getCurrentAlcoholConsumptionFormInitialValues,
  getRegularPhysicalActivityFormInitialValues,
  getRegularDietFormInitialValues,
} from "./initialValues";
import FormSection from "../components/FormSection";
import FormSubmitFooter from "../components/FormSubmitFooter";
import PastTobaccoConsumptionForm from "./PastTobaccoConsumptionForm";
import CurrentAlcoholConsumptionForm from "./CurrentAlcoholConsumptionForm";
import RegularPhysicalActivityForm from "./RegularPhysicalActivityForm";
import RegularDietForm from "./RegularDietForm";
import useLocalStorage from "../../../hooks/useLocalstorage";

const PersonalisingCancerRiskFactorsForm = () => {
  const dispatch = useDispatch();

  const currentStep = useSelector(selectCurrentStep);

  const [formData, setFormData] = useLocalStorage("formData", {});


  const initialValues = {
    ...getCurrentTobaccoConsumptionInitialValues(formData.cancer_risk_factors),
    ...getPastTobaccoConsumptionFormInitialValues(formData.cancer_risk_factors),
    ...getCurrentAlcoholConsumptionFormInitialValues(
      formData.cancer_risk_factors
    ),
    ...getRegularPhysicalActivityFormInitialValues(
      formData.cancer_risk_factors
    ),
    ...getRegularDietFormInitialValues(formData.cancer_risk_factors),
  };

  console.log("initialValues step 2", initialValues);

  const onSubmit = async (values) => {
    console.log("Form submitted with values:", values);

    setFormData({
      ...formData,
      cancer_risk_factors: values,
      currentStep,
    });

    // Next step
    dispatch(changeStep(currentStep + 1));
  };

  const formSections = [
    {
      title: "Current Tobacco Consumption",
      isSubmitted: false,
      isDefaultOpen: true,
      component: (
        <CurrentTobaccoConsumptionForm />
      ),
    },
    {
      title: "Past Tobacco Consumption",
      isSubmitted: false,
      isDefaultOpen: false,
      component: <PastTobaccoConsumptionForm />,
    },
    {
      title: "Current Alcohol Consumption",
      isSubmitted: false,
      isDefaultOpen: false,
      component: <CurrentAlcoholConsumptionForm />,
    },
    {
      title: "Regular Physical Activity Details",
      isSubmitted: false,
      isDefaultOpen: false,
      component: <RegularPhysicalActivityForm />,
    },
    {
      title: "Regular Diet Details",
      isSubmitted: false,
      isDefaultOpen: false,
      component: <RegularDietForm />,
    },
  ];

  return (
    <div className="w-full pb-24">
      <div className="mx-auto w-full rounded-2xl">
        <Formik
          initialValues={initialValues}
          validationSchema={combinedValidationSchema}
          validateOnMount={
            formData?.cancer_risk_factors && Object.keys(
              formData?.cancer_risk_factors
            ).length > 0
              ? true
              : false
          }
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

export default PersonalisingCancerRiskFactorsForm;
