import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import FormSubmitFooter from "../components/FormSubmitFooter";
import FormSection from "../components/FormSection";
import {
  changeStep,
  selectCurrentStep,
} from "../../../slice/patient-detail-form";
import { combinedValidationSchema } from "./validationSchemas";
import {
  getGeneticCancerRiskAssessmentInitialValues,
  getPersonalAndFamilyCancerHistoryFormInitialValues,
} from "./initialValues";
import PersonalAndFamilyCancerHistoryForm from "./PersonalAndFamilyCancerHistoryForm";
import GeneticCancerRiskAssessment from "./GeneticCancerRiskAssessment";
import useLocalStorage from "../../../hooks/useLocalstorage";

const InheritedCancerRiskExposure = () => {
  const dispatch = useDispatch();

  const currentStep = useSelector(selectCurrentStep);

  const [formData, setFormData] = useLocalStorage("formData", {});

  const initialValues = {
    ...getPersonalAndFamilyCancerHistoryFormInitialValues(
      formData.inherited_cancer_risk_exposure
    ),
    ...getGeneticCancerRiskAssessmentInitialValues(
      formData.inherited_cancer_risk_exposure
    ),
  };

  const onSubmit = async (values) => {
    let dataToSave =
      values.have_you_ever_been_a_cancer_patient == "no"
        ? {
            ...formData,
            inherited_cancer_risk_exposure: {
              ...values,
              are_you_currently_on_active_treatment: "",
              are_you_in_remission_and_off_active_treatment_for_more_than_12_months:
                "",
              have_you_had_cancer_multiple_times_in_the_past: "",
              what_type_of_cancer: "",
              at_what_age: "",
            },
            currentStep,
          }
        : {
            ...formData,
            inherited_cancer_risk_exposure: {
              ...values,
            },
            currentStep,
          };

    setFormData(dataToSave);

    console.log("dataaaa", values, dataToSave);

    // Next step
    dispatch(changeStep(currentStep + 1));
  };

  const formSections = [
    {
      title: "Personal & Family Cancer History ",
      isSubmitted: false,
      isDefaultOpen: true,
      component: <PersonalAndFamilyCancerHistoryForm />,
    },
    {
      title: "Genetic Susceptibility and Cancer Risk Assessment",
      isSubmitted: false,
      isDefaultOpen: false,
      component: <GeneticCancerRiskAssessment />,
    },
  ];

  return (
    <div className="w-full pb-80">
      <div className="mx-auto w-full rounded-2xl">
        <Formik
          initialValues={initialValues}
          validationSchema={combinedValidationSchema}
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

export default InheritedCancerRiskExposure;
