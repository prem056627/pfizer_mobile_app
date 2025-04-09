

import * as Yup from "yup";
import moment from "moment";


// ID Card validation patterns and examples
const idValidationConfig = {
  passport: {
    pattern: /^[A-Z][0-9]{7}$/,
    example: "A1234567",
    message: "Passport number must be 1 letter followed by 7 digits (e.g., A1234567)"
  },
  aadhaar: {
    pattern: /^[0-9]{12}$/,
    example: "123456789012",
    message: "Aadhaar number must be 12 digits (e.g., 123456789012)"
  },
  pan: {
    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    example: "ABCDE1234F",
    message: "PAN Card must be in format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)"
  },
  // voter: {
  //   pattern: /^[A-Z]{3}[0-9]{7}$/,
  //   example: "ABC1234567",
  //   message: "Voter ID must be 3 letters followed by 7 digits (e.g., ABC1234567)"
  // },
  driving: {
    pattern: /^[A-Z]{2}[0-9]{13}$/,
    example: "DL0420180012345",
    message: "Driving License must be 2 letters followed by 13 digits (e.g., DL0420180012345)"
  }
};

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
      address_proof_type: Yup.string().required("Address Proof Type is required"),
      address_proof_number: Yup.string()
        .required("Address Proof Number is required")
        .test(
          "address-proof-format-validation",
          function(value) {
            const proofType = this.parent.address_proof_type;
            if (!proofType || !value) return true; // Skip validation if no proof type selected yet
            
            const config = idValidationConfig[proofType];
            if (!config) return true; // Skip if unknown proof type
            
            return config.pattern.test(value) ? 
              true : 
              this.createError({ message: config.message });
          }
        )
    }),
    
    // Current Residential Address
    current: Yup.object().shape({
      // same_as_permanent: Yup.boolean(),
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
      address_proof_type: Yup.string().when("same_as_permanent", {
        is: false,
        then: (schema) => schema.required("Address Proof Type is required"),
        otherwise: (schema) => schema,
      }),
      address_proof_number: Yup.string().when("same_as_permanent", {
        is: false,
        then: (schema) => schema
          .required("Address Proof Number is required")
          .test(
            "address-proof-format-validation",
            function(value) {
              const proofType = this.parent.address_proof_type;
              if (!proofType || !value) return true; // Skip validation if no proof type selected yet
              
              const config = idValidationConfig[proofType];
              if (!config) return true; // Skip if unknown proof type
              
              return config.pattern.test(value) ? 
                true : 
                this.createError({ message: config.message });
            }
          ),
        otherwise: (schema) => schema,
      }),
    }),
  }),

  // ID Details
  // ID Details with dynamic validation
  id_card_type: Yup.string().required("ID Card Type is required"),
  id_number: Yup.string()
    .required("ID Number is required")
    .test(
      "id-format-validation",
      function(value) {
        const idType = this.parent.id_card_type;
        if (!idType || !value) return true; // Skip validation if no ID type selected yet
        
        const config = idValidationConfig[idType];
        if (!config) return true; // Skip if unknown ID type
        
        return config.pattern.test(value) ? 
          true : 
          this.createError({ message: config.message });
      }
    )
});


