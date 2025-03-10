// import * as Yup from "yup";
// import moment from "moment";



// // validationSchemas.js
// export const combinedValidationSchema = Yup.object().shape({
//   // Personal Details
//   full_name: Yup.string().required("Full Name is required"),
//   gender: Yup.string().required("Gender is required"),
// //   date_of_birth: Yup.date()
// //     .nullable()
// //     .required("Date of Birth is required")
// //     .max(moment().toDate(), "Date of Birth cannot be in the future"),
//   mobile_number: Yup.string()
//     .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
//     .required("Mobile Number is required"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email ID is required"),
//   nationality: Yup.string().required("Nationality is required"),

//   // Address Proof
//   permanent_addressline1: Yup.string().required("Address Line 1 is required"),
//   permanent_addressline2: Yup.string(),
//   permanent_city: Yup.string().required("City is required"),
//   permanent_state: Yup.string().required("State is required"),
//   permanent_pincode: Yup.string()
//     .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
//     .required("Pincode is required"),

//   // Current Residential Address
//   same_as_permanent: Yup.boolean(),
//   current_addressline1: Yup.string().when("same_as_permanent", {
//     is: false,
//     then: () => Yup.string().required("Address Line 1 is required"),
//   }),
//   current_addressline2: Yup.string(),
//   current_city: Yup.string().when("same_as_permanent", {
//     is: false,
//     then: () => Yup.string().required("City is required"),
//   }),
//   current_state: Yup.string().when("same_as_permanent", {
//     is: false,
//     then: () => Yup.string().required("State is required"),
//   }),
//   current_pincode: Yup.string().when("same_as_permanent", {
//     is: false,
//     then: () => 
//       Yup.string()
//         .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
//         .required("Pincode is required"),
//   }),

//   // ID Details
//   id_card_type: Yup.string().required("ID Card Type is required"),
//   id_number: Yup.string().required("ID Number is required"),
// });