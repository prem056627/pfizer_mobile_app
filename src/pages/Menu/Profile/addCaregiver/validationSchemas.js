import * as Yup from "yup";

const relationshipOptions = [
  { id: "Father", label: "Father" },
  { id: "Mother", label: "Mother" },
  { id: "Daughter", label: "Daughter" },
  { id: "Son", label: "Son" },
  { id: "Son-In-Law", label: "	Son-In-Law" },
  { id: "Spouse", label: "Spouse" },
  { id: "Sister", label: "Sister" },
  { id: "Brother", label: "Brother" },
  { id: "Father-In-Law", label: "Father-In-Law" },
  { id: "Daughter-In-Law", label: "Daughter-In-Law" },
  { id: "Son-In-Law", label: "Son-In-Law" },
  { id: "Sister-In-Law", label: "Sister-In-Law" },
  { id: "Brother-In-Law", label: "Brother-In-Law" },
  { id: "Cousin", label: "Cousin" },
  { id: "Other", label: "Other" },
];
// ID Card validation patterns and examples
const idValidationConfig = {
  passport: {
    pattern: /^[A-Z][0-9]{7}$/,
    message: "Passport number must be 1 letter followed by 7 digits (e.g., A1234567)"
  },
  aadhaar: {
    pattern: /^[0-9]{12}$/,
    message: "Aadhaar number must be 12 digits (e.g., 123456789012)"
  },
  pan: {
    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    message: "PAN Card must be in format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)"
  },
  // voter: {
  //   pattern: /^[A-Z]{3}[0-9]{7}$/,
  //   message: "Voter ID must be 3 letters followed by 7 digits (e.g., ABC1234567)"
  // },
  driving: {
    pattern: /^[A-Z]{2}[0-9]{13}$/,
    message: "Driving License must be 2 letters followed by 13 digits (e.g., DL0420180012345)"
  }
};

// Function to validate ID numbers based on ID type
const validateIdNumber = function(value, idType) {
  if (!value || !idType) return true;
  
  const config = idValidationConfig[idType];
  if (!config) return true; // Skip if unknown ID type
  
  return config.pattern.test(value) ? 
    true : 
    this.createError({ message: config.message });
};

// Create validation schema for the first caregiver (required)
const firstCaregiverValidationSchema = {
  caregiver_0_name: Yup.string()
    .trim()
    .required(`Caregiver name is required`),
    
  caregiver_0_mobile_verify: Yup.string()
    .test(
      'len',
      'Mobile number must be exactly 10 digits',
      val => !val || val.length <= 10
    )
    .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number")
    .required(`Mobile number is required`),
    
  caregiver_0_mobile: Yup.string()
    .test(
      'len',
      'Mobile number must be exactly 10 digits',
      val => !val || val.length <= 10
    )
    .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number")
    .required(`Mobile number is required`)
    .nullable(),
    
  caregiver_0_email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required(`Email is required`),
    
  relationship_0: Yup.string()
    .oneOf([
      "Father", "Mother", "Daughter", "Son", "Spouse", "Sister", "Brother",
      "Father-In-Law", "Mother-In-Law", "Daughter-In-Law", "Son-In-Law",
      "Sister-In-Law", "Brother-In-Law", "Cousin", "Other"
    ], "Invalid relationship")
    .required(`Relationship is required`),

  // Primary ID validation with dynamic format checking
  id_card_type_0: Yup.string()
    .required(`ID card type is required`),

  id_number_0: Yup.string()
    .trim()
    .required(`ID number is required`)
    .test(
      "id-format-validation-0",
      function(value) {
        const idType = this.parent.id_card_type_0;
        return validateIdNumber.call(this, value, idType);
      }
    ),

  id_doc_upload_0: Yup.array()
    .min(1, `At least one document must be uploaded`),

  // Additional ID validation with dynamic format checking
  id_card_1_type_0: Yup.string()
    .required(`Additional ID card type is required`),

  id_number_1_0: Yup.string()
    .trim()
    .required(`Additional ID number is required`)
    .test(
      "id-format-validation-1-0",
      function(value) {
        const idType = this.parent.id_card_1_type_0;
        return validateIdNumber.call(this, value, idType);
      }
    ),

  id_doc_1_upload_0: Yup.array()
    .min(1, `At least one additional document must be uploaded`),
};

// Create conditional validation schema for additional caregivers
// Fields are only required if any field in that caregiver group has a value
const conditionalCaregiverValidationSchema = (id) => {
  const caregiverFields = [`caregiver_${id}_name`, `caregiver_${id}_mobile_verify`, 
                          `caregiver_${id}_mobile`, `caregiver_${id}_email`, `relationship_${id}`];
  
  // Condition to check if any field has a value (indicating user started filling this caregiver)
  const hasStartedFillingCaregiver = function(values) {
    return caregiverFields.some(field => values[field] && values[field].trim() !== "");
  };

  return {
    [`caregiver_${id}_name`]: Yup.string()
      .trim()
      .when('$self', (_, schema) => 
        schema.test({
          name: `caregiver_${id}_name_conditional`,
          test: function(value) {
            const hasValue = hasStartedFillingCaregiver(this.parent);
            return !hasValue || (value && value.trim() !== "") || this.createError({
              message: `Caregiver name is required if any caregiver ${id} information is provided`
            });
          }
        })
      ),
      
    [`caregiver_${id}_mobile_verify`]: Yup.string()
      .when('$self', (_, schema) => 
        schema.test({
          name: `caregiver_${id}_mobile_verify_conditional`,
          test: function(value) {
            const hasValue = hasStartedFillingCaregiver(this.parent);
            if (!hasValue) return true;
            if (!value) return this.createError({
              message: `Mobile number is required if any caregiver ${id} information is provided`
            });
            if (!/^\d{10}$/.test(value)) return this.createError({
              message: "Enter a valid 10-digit mobile number"
            });
            return true;
          }
        })
      ),
      
    [`caregiver_${id}_mobile`]: Yup.string()
      .nullable()
      .when('$self', (_, schema) => 
        schema.test({
          name: `caregiver_${id}_mobile_conditional`,
          test: function(value) {
            const hasValue = hasStartedFillingCaregiver(this.parent);
            if (!hasValue) return true;
            if (!value) return this.createError({
              message: `Mobile number is required if any caregiver ${id} information is provided`
            });
            if (!/^\d{10}$/.test(value)) return this.createError({
              message: "Enter a valid 10-digit mobile number"
            });
            return true;
          }
        })
      ),
      
    [`caregiver_${id}_email`]: Yup.string()
      .trim()
      .when('$self', (_, schema) => 
        schema.test({
          name: `caregiver_${id}_email_conditional`,
          test: function(value) {
            const hasValue = hasStartedFillingCaregiver(this.parent);
            if (!hasValue) return true;
            if (!value) return this.createError({
              message: `Email is required if any caregiver ${id} information is provided`
            });
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return this.createError({
              message: "Enter a valid email address"
            });
            return true;
          }
        })
      ),
      
    [`relationship_${id}`]: Yup.string()
      .when('$self', (_, schema) =>
        schema.test({
          name: `relationship_${id}_conditional`,
          test: function(value) {
            const hasValue = hasStartedFillingCaregiver(this.parent);
            if (!hasValue) return true;
            
            if (!value) return this.createError({
              message: `Relationship is required if any caregiver ${id} information is provided`
            });
            
            // Convert to lowercase and trim for more forgiving comparison
            const normalizedValue = String(value).trim();
            const validRelationshipIds = relationshipOptions.map(option => 
              String(option.id).trim());
            
            return true;
          }
        })
      ),

    // Primary ID validation with conditional requirements and format checking
    [`id_card_type_${id}`]: Yup.string()
      .when('$self', (_, schema) =>
        schema.test({
          name: `id_card_type_${id}_conditional`,
          test: function(value) {
            const hasValue = hasStartedFillingCaregiver(this.parent);
            if (!hasValue) return true;
            
            if (!value) return this.createError({
              message: `ID card type is required if any caregiver ${id} information is provided`
            });
            
            return true;
          }
        })
      ),

    [`id_number_${id}`]: Yup.string()
      .trim()
      .when('$self', (_, schema) =>
        schema.test({
          name: `id_number_${id}_conditional`,
          test: function(value) {
            const hasValue = hasStartedFillingCaregiver(this.parent);
            if (!hasValue) return true;
            
            if (!value) return this.createError({
              message: `ID number is required if any caregiver ${id} information is provided`
            });
            
            // Validate format based on ID type
            const idType = this.parent[`id_card_type_${id}`];
            return validateIdNumber.call(this, value, idType);
          }
        })
      ),

    [`id_doc_upload_${id}`]: Yup.array()
      .when('$self', (_, schema) =>
        schema.test({
          name: `id_doc_upload_${id}_conditional`,
          test: function(value) {
            const hasValue = hasStartedFillingCaregiver(this.parent);
            if (!hasValue) return true;
            
            if (!value || value.length === 0) return this.createError({
              message: `At least one document must be uploaded if any caregiver ${id} information is provided`
            });
            
            return true;
          }
        })
      ),

    // Additional ID validation with conditional requirements and format checking
    [`id_card_1_type_${id}`]: Yup.string()
      .when('$self', (_, schema) =>
        schema.test({
          name: `id_card_1_type_${id}_conditional`,
          test: function(value) {
            const hasValue = hasStartedFillingCaregiver(this.parent);
            if (!hasValue) return true;
            
            if (!value) return this.createError({
              message: `Additional ID card type is required if any caregiver ${id} information is provided`
            });
            
            return true;
          }
        })
      ),

    [`id_number_1_${id}`]: Yup.string()
      .trim()
      .when('$self', (_, schema) =>
        schema.test({
          name: `id_number_1_${id}_conditional`,
          test: function(value) {
            const hasValue = hasStartedFillingCaregiver(this.parent);
            if (!hasValue) return true;
            
            if (!value) return this.createError({
              message: `Additional ID number is required if any caregiver ${id} information is provided`
            });
            
            // Validate format based on ID type
            const idType = this.parent[`id_card_1_type_${id}`];
            return validateIdNumber.call(this, value, idType);
          }
        })
      ),

    [`id_doc_1_upload_${id}`]: Yup.array()
      .when('$self', (_, schema) =>
        schema.test({
          name: `id_doc_1_upload_${id}_conditional`,
          test: function(value) {
            const hasValue = hasStartedFillingCaregiver(this.parent);
            if (!hasValue) return true;
            
            if (!value || value.length === 0) return this.createError({
              message: `At least one additional document must be uploaded if any caregiver ${id} information is provided`
            });
            
            return true;
          }
        })
      ),
  };
};

// Generate validation schema combining required first caregiver and conditional additional caregivers
export const combinedAddValidationSchema = Yup.object().shape({
  ...firstCaregiverValidationSchema,
  ...conditionalCaregiverValidationSchema(1),
  ...conditionalCaregiverValidationSchema(2),
});

// Helper function to get ID validation format example based on ID type
export const getIdFormatExample = (idType) => {
  return idType && idValidationConfig[idType] 
    ? idValidationConfig[idType].example 
    : "";
};

// Function to initialize caregiver details dynamically
export const getAddCaregiverDetailsInitialValues = (initialData = {}) => {
  const defaultValues = {};

  [0, 1, 2].forEach((id) => {
    // Caregiver basic details
    defaultValues[`caregiver_${id}_mobile_verify`] = initialData[`caregiver_${id}_mobile_verify`] || "";
    defaultValues[`caregiver_${id}_mobile`] = initialData[`caregiver_${id}_mobile`] || "";
    defaultValues[`caregiver_${id}_name`] = initialData[`caregiver_${id}_name`] || "";
    defaultValues[`caregiver_${id}_email`] = initialData[`caregiver_${id}_email`] || "";
    defaultValues[`relationship_${id}`] = initialData[`relationship_${id}`] || "";

    // Caregiver Primary ID details
    defaultValues[`id_card_type_${id}`] = initialData[`id_card_type_${id}`] || "";
    defaultValues[`id_number_${id}`] = initialData[`id_number_${id}`] || "";
    defaultValues[`id_doc_upload_${id}`] = initialData[`id_doc_upload_${id}`] || [];

    // Caregiver First Additional ID details
    defaultValues[`id_card_1_type_${id}`] = initialData[`id_card_1_type_${id}`] || "";
    defaultValues[`id_number_1_${id}`] = initialData[`id_number_1_${id}`] || "";
    defaultValues[`id_doc_1_upload_${id}`] = initialData[`id_doc_1_upload_${id}`] || [];
  });

  return defaultValues;
};