// import * as Yup from "yup";
// import moment from "moment";

// export const combinedValidationSchema = Yup.object().shape({
//   // Personal Details
//   full_name: Yup.string().required("Full Name is required"),
//   gender: Yup.string().required("Gender is required"),
//   date_of_birth: Yup.date()
//   .required('Date of birth is required')
//   .max(new Date(), 'Date of birth cannot be in the future'),
//   mobile_number: Yup.string()
//     .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
//     .required("Mobile Number is required"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email ID is required"),
//   nationality: Yup.string().required("Nationality is required"),

//   // Address
//   address: Yup.object().shape({
//     // Permanent Address
//     permanent: Yup.object().shape({
//       line1: Yup.string().required("Address Line 1 is required"),
//       line2: Yup.string(),
//       city: Yup.string().required("City is required"),
//       state: Yup.string().required("State is required"),
//       pincode: Yup.string()
//         .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
//         .required("Pincode is required"),
//     }),
    
//     // Current Residential Address
//     current: Yup.object().shape({
//       same_as_permanent: Yup.boolean(),
//       line1: Yup.string().when("same_as_permanent", {
//         is: false,
//         then: () => Yup.string().required("Address Line 1 is required"),
//         otherwise: () => Yup.string(),
//       }),
//       line2: Yup.string(),
//       city: Yup.string().when("same_as_permanent", {
//         is: false,
//         then: () => Yup.string().required("City is required"),
//         otherwise: () => Yup.string(),
//       }),
//       state: Yup.string().when("same_as_permanent", {
//         is: false,
//         then: () => Yup.string().required("State is required"),
//         otherwise: () => Yup.string(),
//       }),
//       pincode: Yup.string().when("same_as_permanent", {
//         is: false,
//         then: () => 
//           Yup.string()
//             .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
//             .required("Pincode is required"),
//         otherwise: () => Yup.string(),
//       }),
//     }),
//   }),

//   // ID Details
//   id_card_type: Yup.string().required("ID Card Type is required"),
//   id_number: Yup.string().required("ID Number is required"),
// });