import React from "react";
import InputField from "../../../components/Form/InputField";
// import CheckboxField from "../../../components/Form/CheckBox";

const CurrentResidentialAddress = ({ formik }) => {
  const handleSameAsPermanentChange = (e) => {
    const isChecked = e.target.checked;
    
    // Update the checkbox state
    formik.setFieldValue("same_as_permanent", isChecked);

    if (isChecked) {
      // Autofill current address with permanent address
      formik.setValues({
        ...formik.values,
        current_addressline1: formik.values.permanent_addressline1 || "",
        current_addressline2: formik.values.permanent_addressline2 || "",
        current_city: formik.values.permanent_city || "",
        current_state: formik.values.permanent_state || "",
        current_pincode: formik.values.permanent_pincode || "",
        same_as_permanent: true
      });
    } else {
      // Clear current address fields when unchecked
      formik.setValues({
        ...formik.values,
        current_addressline1: "",
        current_addressline2: "",
        current_city: "",
        current_state: "",
        current_pincode: "",
        same_as_permanent: false
      });
    }
  };

  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="same_as_permanent"
          name="same_as_permanent"
          checked={formik.values.same_as_permanent}
          onChange={handleSameAsPermanentChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label 
          htmlFor="same_as_permanent" 
          className="text-sm font-medium text-gray-700"
        >
          Same as Permanent Address
        </label>
      </div>

      <InputField
        key="current_addressline1"
        label="Address Line 1"
        name="current_addressline1"
        id="current_addressline1"
        placeholder="Enter Address Line 1"
        value={formik.values.current_addressline1}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.values.same_as_permanent}
        error={formik.touched.current_addressline1 && formik.errors.current_addressline1}
      />

      <InputField
        key="current_addressline2"
        label="Address Line 2"
        name="current_addressline2"
        id="current_addressline2"
        placeholder="Enter Address Line 2"
        value={formik.values.current_addressline2}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.values.same_as_permanent}
        error={formik.touched.current_addressline2 && formik.errors.current_addressline2}
      />

      <InputField
        key="current_city"
        label="City"
        name="current_city"
        id="current_city"
        placeholder="Enter City"
        value={formik.values.current_city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.values.same_as_permanent}
        error={formik.touched.current_city && formik.errors.current_city}
      />

      <InputField
        key="current_state"
        label="State"
        name="current_state"
        id="current_state"
        placeholder="Enter State"
        value={formik.values.current_state}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.values.same_as_permanent}
        error={formik.touched.current_state && formik.errors.current_state}
      />

      <InputField
        key="current_pincode"
        label="Pincode"
        name="current_pincode"
        id="current_pincode"
        placeholder="Enter Pincode"
        value={formik.values.current_pincode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.values.same_as_permanent}
        error={formik.touched.current_pincode && formik.errors.current_pincode}
      />
    </div>
  );
};

export default CurrentResidentialAddress;