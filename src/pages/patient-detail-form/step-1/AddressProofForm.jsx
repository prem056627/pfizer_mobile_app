import React from "react";
import InputField from "../../../components/Form/InputField";

const AddressProofForm = ({ formik }) => {
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
        error={formik.touched.permanent_addressline1 && formik.errors.permanent_addressline1}
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
        error={formik.touched.permanent_addressline2 && formik.errors.permanent_addressline2}
      />

      <InputField
        key="permanent_city"
        label="City"
        name="permanent_city"
        id="permanent_city"
        placeholder="Enter City"
        value={formik.values.permanent_city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.permanent_city && formik.errors.permanent_city}
      />

      <InputField
        key="permanent_state"
        label="State"
        name="permanent_state"
        id="permanent_state"
        placeholder="Enter State"
        value={formik.values.permanent_state}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.permanent_state && formik.errors.permanent_state}
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
        error={formik.touched.permanent_pincode && formik.errors.permanent_pincode}
      />
    </div>
  );
};

export default AddressProofForm;