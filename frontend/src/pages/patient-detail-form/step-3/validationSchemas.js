import * as Yup from "yup";

export const personalDetailsValidationSchema = {
  are_you_frequently_exposed_to_secondhand_smoke:
    Yup.string().required("Required"),
  are_you_currently_or_in_the_past_exposed_to_environmental_toxins:
    Yup.string().required("Required"),
  are_you_currently_or_in_the_past_have_been_exposed_to_occupational_toxins:
    Yup.string().required("Required"),
};

export const combinedValidationSchema = Yup.object({
  ...personalDetailsValidationSchema,
});
