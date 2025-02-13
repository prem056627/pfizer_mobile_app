import * as Yup from "yup";

export const ValidationSchema = {
  caregiver_name: Yup.string().required("Caregiver name is required"),
  caregiver_mobile_verify: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Caregiver mobile number is required"),
  caregiver_mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Caregiver mobile is required"),
  caregiver_email: Yup.string()
    .email("Enter a valid email address")
    .required("Caregiver email is required"),
  relationship: Yup.string().required("Relationship is required"),
};

export const combinedValidationSchema = Yup.object(ValidationSchema);
