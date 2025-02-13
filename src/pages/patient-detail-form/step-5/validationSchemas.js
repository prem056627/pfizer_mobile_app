import * as Yup from "yup";

export const personalDetailsValidationSchema = {
  do_you_have_any_following_symptoms_or_warning_signs_related_to_cancer_would_prompt_you_to_seek_medical_advice:
    Yup.array().required("Required"),
};

export const combinedValidationSchema = Yup.object({
  ...personalDetailsValidationSchema,
});
