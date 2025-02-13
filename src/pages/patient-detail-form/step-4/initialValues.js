export const getPersonalAndFamilyCancerHistoryFormInitialValues = (
  initialData
) => {
  return {
    have_you_ever_been_a_cancer_patient:
      initialData?.have_you_ever_been_a_cancer_patient.toLowerCase() || "",
    are_you_currently_on_active_treatment:
      initialData?.are_you_currently_on_active_treatment.toLowerCase() || "",
    are_you_in_remission_and_off_active_treatment_for_more_than_12_months:
      initialData?.are_you_in_remission_and_off_active_treatment_for_more_than_12_months.toLowerCase() ||
      "",
    have_you_had_cancer_multiple_times_in_the_past:
      initialData?.have_you_had_cancer_multiple_times_in_the_past.toLowerCase() ||
      "",
    what_type_of_cancer: initialData?.what_type_of_cancer || "",
    what_type_of_cancer_text: initialData?.what_type_of_cancer_text || "",
    at_what_age: initialData?.at_what_age || "",
    are_you_currently_suffering_from_specific_medical_conditions_that_increase_the_risk_of_cancer:
      initialData?.are_you_currently_suffering_from_specific_medical_conditions_that_increase_the_risk_of_cancer.toLowerCase() ||
      "",
    have_any_of_your_first_degree_relatives_been_diagnosed_with_cancer_syndromes:
      initialData?.have_any_of_your_first_degree_relatives_been_diagnosed_with_cancer_syndromes.toLowerCase() ||
      "",
    relatives_what_type_of_cancer: initialData?.relatives_what_type_of_cancer ||
      "",
  };
};

export const getGeneticCancerRiskAssessmentInitialValues = (initialData) => {
  return {
    have_you_undergone_genetic_susceptibility_testing_for_cancer:
      initialData?.have_you_undergone_genetic_susceptibility_testing_for_cancer ||
      "",
  };
};