import * as Yup from "yup";

export const personalDetailsValidationSchema = {
  full_name: Yup.string().required("Required"),
  date_of_birth: Yup.string().required("Date of birth is required"),
  gender: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  mobile_number: Yup.string()
    .required("Required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  email: Yup.string().email("Invalid email format").required("Required"),
  weight: Yup.number()
    .required("Weight is required")
    .min(1, "Weight must be greater than 0")
    .typeError("Weight must be a number"),
  height: Yup.string()
    .required("Height is required")
    .matches(
      /^[0-9]+(\.[0-9]{1,2})?$/,
      "Height must be in the format feet.inches (e.g., 6.7 for 6 feet 7 inches)"
    )
    .test(
      "valid-height",
      "Height must be within a realistic range (e.g., 3 to 10 feet)",
      (value) => {
        if (!value) return false;
        const [feet, inches] = value.split(".").map(Number);
        return (
          feet >= 3 && feet <= 10 && (!inches || (inches >= 0 && inches < 12))
        );
      }
    ),
  bmi: Yup.number().typeError("BMI must be a number"),
};

export const combinedValidationSchema = Yup.object({
  ...personalDetailsValidationSchema,
});
