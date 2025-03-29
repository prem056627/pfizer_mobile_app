import { FieldArray } from 'formik';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
import shortid from 'shortid';
import { ReactComponent as DeleteFieldIcon } from '../../../assets/images/svg/delete-icon.svg';
import InputField from '../../../components/Form/InputField';
import SelectField from '../../../components/Form/SelectField';
import MultiFileUpload from '../../../components/Form/MultiFileUpload';

function DynamicCaregiverFieldArray({ id, formik, dropdownData }) {
  // Track initialization to avoid double initialization
  const [isInitialized, setIsInitialized] = useState(false);

  // Initial caregiver value structure
  const createInitialCaregiver = () => ({
    key: shortid.generate(),
    caregivername: "",
    caregiveremail: "",
    relationship: "",
    // Primary ID details
    id_card_type: "",
    id_number: "",
    id_doc_upload: [],
    // Additional ID details
    id_card_1_type_00: "",
    id_number_1_00: "",
    id_doc_1_upload: []
  });

  // Get ordinal suffix for numbers (1st, 2nd, 3rd, etc.)
  const getOrdinalSuffix = (num) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) {
      return num + "st";
    }
    if (j === 2 && k !== 12) {
      return num + "nd";
    }
    if (j === 3 && k !== 13) {
      return num + "rd";
    }
    return num + "th";
  };

  // Check and initialize caregivers array if empty on component mount
  useEffect(() => {
    if (isInitialized) return;
    
    const caregivers = get(formik.values, id);
    
    // If caregivers field doesn't exist or is not an array, initialize it with an empty array
    if (!caregivers || !Array.isArray(caregivers)) {
      formik.setFieldValue(id, []);
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, [id, isInitialized]);

  return (
    <FieldArray
      name={id}
      render={(arrayHelpers) => {
        // Get the current value of caregivers
        const caregivers = get(formik.values, id, []);

        // Function to handle adding a new caregiver
        const handleAddCaregiver = () => {
          // Create a new caregiver object
          const newCaregiver = createInitialCaregiver();
          
          // Add it to the array
          arrayHelpers.push(newCaregiver);
        };

        return (
          <div className="flex grow flex-col gap-[40px]">
            {Array.isArray(caregivers) && caregivers.length > 0 && 
              caregivers.map((caregiver, index) => {
                // Ensure caregiver exists and has a key, or generate one
                const caregiverKey = caregiver?.key || `caregiver-${index}-${shortid.generate()}`;
                
                return (
                  <div key={caregiverKey} className="flex flex-col gap-[24px] p-6 border border-gray-200 rounded-md">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-lato text-[16px] font-semibold text-[#000]">
                        {`${getOrdinalSuffix(index + 1)} Caregiver`}
                      </span>

                      <button
                        type="button"
                        className="flex justify-end focus:outline-none"
                        onClick={() => arrayHelpers.remove(index)}
                        aria-label={`Remove ${getOrdinalSuffix(index + 1)} caregiver`}
                      >
                        <DeleteFieldIcon />
                      </button>
                    </div>
                    <div className="flex flex-col gap-4">
                      {/* Basic Caregiver Information */}
                      <InputField
                        key={`${id}.${index}.caregivername`}
                        label="Caregiver Name"
                        name={`${id}.${index}.caregivername`}
                        id={`${id}.${index}.caregivername`}
                        placeholder="Enter full name"
                        value={get(formik.values, `${id}.${index}.caregivername`, '')}
                        onChange={formik.handleChange}
                        formik={formik}
                      />

                      <InputField
                        key={`${id}.${index}.caregiveremail`}
                        label="Email"
                        name={`${id}.${index}.caregiveremail`}
                        id={`${id}.${index}.caregiveremail`}
                        placeholder="example@email.com"
                        value={get(formik.values, `${id}.${index}.caregiveremail`, '')}
                        onChange={formik.handleChange}
                        formik={formik}
                      />

                      <SelectField
                        key={`${id}.${index}.relationship`}
                        label="Relationship"
                        name={`${id}.${index}.relationship`}
                        id={`${id}.${index}.relationship`}
                        placeholder="Select relationship"
                        value={get(formik.values, `${id}.${index}.relationship`, '')}
                        optionsDataName={`${id}.${index}.relationship`}
                        optionsData={
                          dropdownData?.relationship_dict
                            ? dropdownData?.relationship_dict
                            : []
                        }
                        onChange={formik.handleChange}
                        formik={formik}
                      />

                      {/* Primary ID Section */}
                      <div className="mt-2 border-t border-gray-200 pt-4">
                        <h3 className="mb-2 font-lato text-[14px] font-semibold text-[#333]">Primary ID Details</h3>
                        <div className="flex flex-col gap-4">
                          <SelectField
                            key={`${id}.${index}.id_card_type`}
                            label="ID Card Type"
                            name={`${id}.${index}.id_card_type`}
                            id={`${id}.${index}.id_card_type`}
                            placeholder="Select ID type"
                            value={get(formik.values, `${id}.${index}.id_card_type`, '')}
                            optionsDataName={`${id}.${index}.id_card_type`}
                            optionsData={
                              dropdownData?.id_types
                                ? dropdownData?.id_types
                                : []
                            }
                            onChange={formik.handleChange}
                            formik={formik}
                          />

                          <InputField
                            key={`${id}.${index}.id_number`}
                            label="ID Number"
                            name={`${id}.${index}.id_number`}
                            id={`${id}.${index}.id_number`}
                            placeholder="Enter ID number"
                            value={get(formik.values, `${id}.${index}.id_number`, '')}
                            onChange={formik.handleChange}
                            formik={formik}
                          />

                          <MultiFileUpload
                            isMultiple={true}
                            formik={formik}
                            label="Upload ID Document"
                            id={`${id}.${index}.id_doc_upload`}
                          />
                        </div>
                      </div>

                      {/* Additional ID Section */}
                      <div className="mt-2 border-t border-gray-200 pt-4">
                        <h3 className="mb-2 font-lato text-[14px] font-semibold text-[#333]">Additional ID Details</h3>
                        <div className="flex flex-col gap-4">
                          <SelectField
                            key={`${id}.${index}.id_card_1_type_00`}
                            label="Additional ID Card Type"
                            name={`${id}.${index}.id_card_1_type_00`}
                            id={`${id}.${index}.id_card_1_type_00`}
                            placeholder="Select additional ID type"
                            value={get(formik.values, `${id}.${index}.id_card_1_type_00`, '')}
                            optionsDataName={`${id}.${index}.id_card_1_type_00`}
                            optionsData={
                              dropdownData?.id_types
                                ? dropdownData?.id_types
                                : []
                            }
                            onChange={formik.handleChange}
                            formik={formik}
                          />

                          <InputField
                            key={`${id}.${index}.id_number_1_00`}
                            label="Additional ID Number"
                            name={`${id}.${index}.id_number_1_00`}
                            id={`${id}.${index}.id_number_1_00`}
                            placeholder="Enter additional ID number"
                            value={get(formik.values, `${id}.${index}.id_number_1_00`, '')}
                            onChange={formik.handleChange}
                            formik={formik}
                          />

                          <MultiFileUpload
                            isMultiple={true}
                            formik={formik}
                            label="Upload Additional ID Document"
                            id={`${id}.${index}.id_doc_1_upload`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
            <div className="flex flex-col gap-[4px]">
              {(Array.isArray(caregivers) && caregivers.length < 3) && (
                <>
                  <button
                    type="button"
                    className="flex w-fit justify-start focus:outline-none disabled:opacity-75 px-4 py-2 bg-primary bg-opacity-10 text-primary rounded-md hover:bg-opacity-20 transition-all"
                    onClick={handleAddCaregiver}
                  >
                    <span className="font-lato text-[14px] font-bold">
                      {caregivers.length === 0 ? "Add Caregiver" : `+ Add ${getOrdinalSuffix(caregivers.length + 1)} Caregiver`}
                    </span>
                  </button>
                  <p className="text-[14px] italic leading-[20px] text-[#696969] mt-2">
                    You can add up to 3 caregivers. Additional caregivers can be added later from your profile settings.
                  </p>
                </>
              )}
              {(Array.isArray(caregivers) && caregivers.length === 3) && (
                <p className="text-[14px] italic leading-[20px] text-[#696969] mt-2">
                  Maximum number of caregivers (3) reached. Additional caregivers can be added later from your profile settings.
                </p>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}

export default DynamicCaregiverFieldArray;