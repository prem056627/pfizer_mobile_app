

import * as Yup from "yup";
import moment from "moment";

export const combinedValidationSchema = Yup.object().shape({
  // Personal Details
  full_name: Yup.string().required("Full Name is required"),
  gender: Yup.string().required("Gender is required"),
  
  date_of_birth: Yup.date()
  // .required("Date of Birth is required")
  .test(
    "is-over-18",
    "You must be at least 18 years old",
    (value) => {
      if (!value) return false;
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return value <= eighteenYearsAgo;
    }
  ),
  
  // mobile_number: Yup.string()
  //   .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
  //   .required("Mobile Number is required"),
  
  email: Yup.string()
    .email("Invalid email format")
    .required("Email ID is required"),
  
  nationality: Yup.string().required("Nationality is required"),

  // Address
  address: Yup.object().shape({
    // Permanent Address
    permanent: Yup.object().shape({
      line1: Yup.string().required("Address Line 1 is required"),
      line2: Yup.string(),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.string()
        .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
        .required("Pincode is required"),
    }),
    
    // Current Residential Address
    current: Yup.object().shape({
      same_as_permanent: Yup.boolean(),
      line1: Yup.string().when("same_as_permanent", {
        is: false,
        then: (schema) => schema.required("Address Line 1 is required"),
        otherwise: (schema) => schema,
      }),
      line2: Yup.string(),
      city: Yup.string().when("same_as_permanent", {
        is: false,
        then: (schema) => schema.required("City is required"),
        otherwise: (schema) => schema,
      }),
      state: Yup.string().when("same_as_permanent", {
        is: false,
        then: (schema) => schema.required("State is required"),
        otherwise: (schema) => schema,
      }),
      pincode: Yup.string().when("same_as_permanent", {
        is: false,
        then: (schema) => schema
          .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
          .required("Pincode is required"),
        otherwise: (schema) => schema,
      }),
    }),
  }),

  // ID Details
  id_card_type: Yup.string().required("ID Card Type is required"),
  id_number: Yup.string()
    .required("ID Number is required")
    // .when("id_card_type", {
    //   is: "passport",
    //   then: Yup.string().matches(/^[A-Z0-9]{8}$/, "Invalid Passport number"),
    // })
    // .when("id_card_type", {
    //   is: "aadhaar",
    //   then: Yup.string().matches(/^\d{12}$/, "Aadhaar must be a 12-digit number"),
    // })
    // .when("id_card_type", {
    //   is: "pan",
    //   then: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN Card format"),
    // })
    // .when("id_card_type", {
    //   is: "voter",
    //   then: Yup.string().matches(/^[A-Z0-9]{10}$/, "Invalid Voter ID format"),
    // })
    // .when("id_card_type", {
    //   is: "driving",
    //   then: Yup.string().matches(/^[A-Z0-9]{16}$/, "Invalid Driving License format"),
    // }),
});






// // Validation Schema
// export const personalDetailsValidationSchema = Yup.object().shape({
//   full_name: Yup.string().required("Full Name is required"),
//   gender: Yup.string().required("Gender is required"),
  
//   mobile_number: Yup.string()
//     .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
//     .required("Mobile Number is required"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   nationality: Yup.string().required("Nationality is required"),
// });