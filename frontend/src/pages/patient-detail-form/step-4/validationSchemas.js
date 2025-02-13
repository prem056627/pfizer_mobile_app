import * as Yup from "yup";

export const personalAndFamilyCancerHistoryValidationSchema = {
  have_you_ever_been_a_cancer_patient: Yup.string().required("Required"),
  are_you_currently_on_active_treatment: Yup.string().when(
    "have_you_ever_been_a_cancer_patient",
    {
      is: "yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().nullable(),
    }
  ),
  are_you_in_remission_and_off_active_treatment_for_more_than_12_months:
    Yup.string().when(
      [
        "have_you_ever_been_a_cancer_patient",
        "are_you_currently_on_active_treatment",
      ],
      {
        is: (cancerPatient, activeTreatment) =>
          cancerPatient === "yes" && activeTreatment === "no",
        then: Yup.string().required("Required"),
        otherwise: Yup.string().nullable(),
      }
    ),
  have_you_had_cancer_multiple_times_in_the_past: Yup.string().when(
    "have_you_ever_been_a_cancer_patient",
    {
      is: "yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().nullable(),
    }
  ),
  what_type_of_cancer: Yup.string().when(
    "have_you_ever_been_a_cancer_patient",
    {
      is: "yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().nullable(),
    }
  ),
  at_what_age: Yup.string().when("have_you_ever_been_a_cancer_patient", {
    is: "yes",
    then: Yup.string().required("Required"),
    otherwise: Yup.string().nullable(),
  }),
  what_type_of_cancer_text: Yup.string().when("have_you_ever_been_a_cancer_patient", {
    is: "yes",
    then: Yup.string().required("Required"),
    otherwise: Yup.string().nullable(),
  }),
  are_you_currently_suffering_from_specific_medical_conditions_that_increase_the_risk_of_cancer:
    Yup.string().required("Required"),
  have_any_of_your_first_degree_relatives_been_diagnosed_with_cancer_syndromes:
    Yup.string().required("Required"),
  relatives_what_type_of_cancer: Yup.string().required("Required"),
};

export const geneticCancerRiskAssessmentValidationSchema = {
  have_you_undergone_genetic_susceptibility_testing_for_cancer:
    Yup.array().required("Required"),
};

export const combinedValidationSchema = Yup.object({
  ...personalAndFamilyCancerHistoryValidationSchema,
  ...geneticCancerRiskAssessmentValidationSchema,
});
