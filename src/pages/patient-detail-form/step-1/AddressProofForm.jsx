import React, { useEffect } from "react";
import InputField from "../../../components/Form/InputField";
import SelectField from "../../../components/Form/SelectField";
import { useSelector } from "react-redux";
import { selectInitializeData } from "../../../slice/patient-detail-form";

const AddressProofForm = ({ formik }) => {
  let initialDataa = useSelector(selectInitializeData);

  const STATE_MAPPING = initialDataa?.state;
  const CITY_MAPPING = initialDataa?.city;

  return (
    <div className="flex grow flex-col gap-4">
      <InputField
        key="address.permanent.line1"
        label="Address Line 1"
        name="address.permanent.line1"
        id="address.permanent.line1"
        placeholder="Enter Address Line 1"
        value={formik.values.address.permanent.line1}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.address?.permanent?.line1 &&
          formik.errors.address?.permanent?.line1
        }
      />

      <InputField
        key="address.permanent.line2"
        label="Address Line 2"
        name="address.permanent.line2"
        id="address.permanent.line2"
        placeholder="Enter Address Line 2"
        value={formik.values.address.permanent.line2}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.address?.permanent?.line2 &&
          formik.errors.address?.permanent?.line2
        }
      />

      <SelectField
        key="address.permanent.city"
        label={<>City</>}
        name="address.permanent.city"
        id="address.permanent.city"
        formik={formik}
        placeholder="Select"
        value={formik.values.address.permanent.city}
        optionsDataName="address.permanent.city"
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
        key="address.permanent.state"
        label={<>State</>}
        name="address.permanent.state"
        id="address.permanent.state"
        formik={formik}
        placeholder="Select"
        value={formik.values.address.permanent.state}
        optionsDataName="address.permanent.state"
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
        key="address.permanent.pincode"
        label="Pincode"
        name="address.permanent.pincode"
        id="address.permanent.pincode"
        placeholder="Enter Pincode"
        value={formik.values.address.permanent.pincode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.address?.permanent?.pincode && 
          formik.errors.address?.permanent?.pincode
        }
      />
    </div>
  );
};

export default AddressProofForm;