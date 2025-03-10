import React, { useEffect } from "react";
import InputField from "../../../components/Form/InputField";
import SelectField from "../../../components/Form/SelectField";
import { useSelector } from "react-redux";
import { selectInitializeData } from "../../../slice/patient-detail-form";

const AddressProofForm = ({ formik }) => {
  let initialDataa = useSelector(selectInitializeData);

  const STATE_MAPPING = initialDataa?.response?.state;
  const CITY_MAPPING = initialDataa?.response?.city;

  return (
    <div className="flex grow flex-col gap-4">
      <InputField
        key="permanent_addressline1"
        label="Address Line 1"
        name="permanent_addressline1"
        id="permanent_addressline1"
        placeholder="Enter Address Line 1"
        value={formik.values.permanent_addressline1}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.permanent_addressline1 &&
          formik.errors.permanent_addressline1
        }
      />

      <InputField
        key="permanent_addressline2"
        label="Address Line 2"
        name="permanent_addressline2"
        id="permanent_addressline2"
        placeholder="Enter Address Line 2"
        value={formik.values.permanent_addressline2}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.permanent_addressline2 &&
          formik.errors.permanent_addressline2
        }
      />

      <SelectField
        key="permanent_city"
        label={<>City</>}
        name="permanent_city"
        id="permanent_city"
        formik={formik}
        placeholder="Select"
        value={formik.values.city}
        optionsDataName="permanent_city"
        optionsData={
          CITY_MAPPING
            ? CITY_MAPPING.map((stateItem) => ({
                id: stateItem[1], // Use the state name as ID
                label: stateItem[1], // Use the state name as label
              })).sort((a, b) => a.label.localeCompare(b.label)) // Sort alphabetically
            : []
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-1/2"
        bottomPadding={false}
      />

      <SelectField
        key="permanent_state"
        label={<>State</>}
        name="permanent_state"
        id="permanent_state"
        formik={formik}
        placeholder="Select"
        value={formik.values.state}
        optionsDataName="permanent_state"
        optionsData={
          STATE_MAPPING
            ? STATE_MAPPING.map((stateItem) => ({
                id: stateItem[1], // Use the state name as ID
                label: stateItem[1], // Use the state name as label
              })).sort((a, b) => a.label.localeCompare(b.label)) // Sort alphabetically
            : []
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-1/2"
        bottomPadding={false}
      />

      <InputField
        key="permanent_pincode"
        label="Pincode"
        name="permanent_pincode"
        id="permanent_pincode"
        placeholder="Enter Pincode"
        value={formik.values.permanent_pincode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.permanent_pincode && formik.errors.permanent_pincode
        }
      />
    </div>
  );
};

export default AddressProofForm;
