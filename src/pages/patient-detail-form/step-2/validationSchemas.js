
import * as Yup from "yup";

const relationshipOptions = [
  { id: "Father", label: "Father" },
  { id: "Mother", label: "Mother" },
  { id: "Daughter", label: "Daughter" },
  { id: "Son", label: "Son" },
  { id: "Spouse", label: "Spouse" },
  { id: "Sister", label: "Sister" },
  { id: "Brother", label: "Brother" },
  { id: "Father-In-Law", label: "Father-In-Law" },
  { id: "Mother-In-Law", label: "Mother-In-Law" },
  { id: "Daughter-In-Law", label: "Daughter-In-Law" },
  { id: "Son-In-Law", label: "Son-In-Law" },
  { id: "Sister-In-Law", label: "Sister-In-Law" },
  { id: "Brother-In-Law", label: "Brother-In-Law" },
  { id: "Cousin", label: "Cousin" },
  { id: "Other", label: "Other" }
];
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
        
        // if (!validRelationshipIds.some(id => id.toLowerCase() === normalizedValue.toLowerCase())) {
        //   return this.createError({
        //     message: "Invalid relationship"
        //   });
        // }
        
        return true;
      }
    })
  ),
  };
};

// Generate validation schema combining required first caregiver and conditional additional caregivers
export const combinedValidationSchema = Yup.object().shape({
  // ...firstCaregiverValidationSchema,
  // ...conditionalCaregiverValidationSchema(1),
  // ...conditionalCaregiverValidationSchema(2),
});

// Function to initialize caregiver details dynamically
export const getCaregiverDetailsInitialValues = (initialData = {}) => {
  const defaultValues = {};
  
  [0, 1, 2].forEach((id) => {
    defaultValues[`caregiver_${id}_mobile_verify`] = initialData[`caregiver_${id}_mobile_verify`] || "";
    defaultValues[`caregiver_${id}_mobile`] = initialData[`caregiver_${id}_mobile`] || "";
    defaultValues[`caregiver_${id}_name`] = initialData[`caregiver_${id}_name`] || "";
    defaultValues[`caregiver_${id}_email`] = initialData[`caregiver_${id}_email`] || "";
    defaultValues[`relationship_${id}`] = initialData[`relationship_${id}`] || "";
  });
  
  return defaultValues;
};