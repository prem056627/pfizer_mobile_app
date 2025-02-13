export const getCancerRiskAndWarningSignsInitialValues = (initialData) => {

  return {
    do_you_have_any_following_symptoms_or_warning_signs_related_to_cancer_would_prompt_you_to_seek_medical_advice:
      initialData?.do_you_have_any_following_symptoms_or_warning_signs_related_to_cancer_would_prompt_you_to_seek_medical_advice ||
      "",
  };
};
