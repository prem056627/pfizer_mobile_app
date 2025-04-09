import React from "react";
import InputField from "../../../components/Form/InputField";
import SelectField from "../../../components/Form/SelectField";
import { selectInitializeData } from "../../../slice/patient-detail-form";
import { useSelector } from "react-redux";
import { ReactComponent as IconToggleTick } from "../../../assets/images/svg/checkbox-tick.svg";

const CurrentResidentialAddress = ({ formik }) => {
  let initialDataa = useSelector(selectInitializeData);

  console.log('initialDataa?.state',initialDataa?.state);
  
  
  const STATE_MAPPING = initialDataa?.state;
  const CITY_MAPPING = initialDataa?.city;

  const idCardOptions = [
    { id: "passport", label: "Passport" },
    { id: "aadhaar", label: "Aadhaar" },
    { id: "pan", label: "PAN Card" },
    { id: "others", label: "Others" },
    { id: "driving", label: "Driving License" },
  ];

  const handleSameAsPermanentChange = (e) => {
    const isChecked = e.target.checked;
    
    // Update the checkbox state
    formik.setFieldValue("address.current.same_as_permanent", isChecked);

    if (isChecked) {
      // Autofill current address with permanent address
      formik.setValues({
        ...formik.values,
        address: {
          ...formik.values.address,
          current: {
            line1: formik.values.address.permanent.line1 || "",
            line2: formik.values.address.permanent.line2 || "",
            city: formik.values.address.permanent.city || "",
            state: formik.values.address.permanent.state || "",
            pincode: formik.values.address.permanent.pincode || "",
            address_proof_type: formik.values.address.permanent.address_proof_type || "",
            address_proof_number: formik.values.address.permanent.address_proof_number || "",
            same_as_permanent: true
          }
        }
      });
    } else {
      // Clear current address fields when unchecked
      formik.setValues({
        ...formik.values,
        address: {
          ...formik.values.address,
          current: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            pincode: "",
            address_proof_type: "",
            address_proof_number: "",
            same_as_permanent: false
          }
        }
      });
    }
  };

  // Function to handle the checkbox click directly
  const handleCheckboxClick = () => {
    const newValue = !formik.values.address.current.same_as_permanent;
    
    // Call the existing handler with a simulated event object
    handleSameAsPermanentChange({
      target: {
        checked: newValue
      }
    });
  };

  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex items-center gap-2">
        {/* Clickable custom checkbox */}
        <div 
          onClick={handleCheckboxClick}
          className="cursor-pointer"
        >
          {formik.values.address.current.same_as_permanent ? (
            <div className="relative flex items-center justify-center h-[20px] w-[20px] rounded-sm bg-primary border-2 border-primary cursor-pointer">
              <IconToggleTick className="w-4 h-4" />
            </div>
          ) : (
            <div className="h-[20px] w-[20px] rounded-sm border-2 border-[#C4C4C4] cursor-pointer"></div>
          )}
        </div>
        
        {/* Hidden actual checkbox for form submission */}
        <input
          type="checkbox"
          id="address.current.same_as_permanent"
          name="address.current.same_as_permanent"
          checked={formik.values.address.current.same_as_permanent}
          onChange={handleSameAsPermanentChange}
          className="invisible absolute h-[0px] w-[0px]"
        />
        
        {/* Label only affects the text */}
        <label
          htmlFor="address.current.same_as_permanent"
          className="text-sm font-medium text-gray-700"
        >
          Same as Permanent Address
        </label>
      </div>

      <InputField
        key="address.current.line1"
        label="Address Line 1"
        name="address.current.line1"
        id="address.current.line1"
        placeholder="Enter Address Line 1"
        value={formik.values.address.current.line1}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.values.address.current.same_as_permanent}
        error={
          formik.touched.address?.current?.line1 && 
          formik.errors.address?.current?.line1
        }
      />

      <InputField
        key="address.current.line2"
        label="Address Line 2"
        name="address.current.line2"
        id="address.current.line2"
        placeholder="Enter Address Line 2"
        value={formik.values.address.current.line2}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.values.address.current.same_as_permanent}
        error={
          formik.touched.address?.current?.line2 && 
          formik.errors.address?.current?.line2
        }
      />

      <SelectField
        key="address.current.city"
        label={<>City</>}
        name="address.current.city"
        id="address.current.city"
        formik={formik}
        placeholder="Select City"
        value={formik.values.address.current.city}
        optionsDataName="address.current.city"
        optionsData={
          CITY_MAPPING 
            ? CITY_MAPPING.map(stateItem => ({
                id: stateItem[1],
                label: stateItem[1]
              })).sort((a, b) => a.label.localeCompare(b.label))
            : []
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.values.address.current.same_as_permanent}
        className="w-1/2"
        bottomPadding={false}
      />
   
      <SelectField
        key="address.current.state"
        label={<>State</>}
        name="address.current.state"
        id="address.current.state"
        formik={formik}
        placeholder="Select"
        value={formik.values.address.current.state}
        optionsDataName="address.current.state"
        optionsData={
          STATE_MAPPING 
            ? STATE_MAPPING.map(stateItem => ({
                id: stateItem[1],
                label: stateItem[1]
              })).sort((a, b) => a.label.localeCompare(b.label))
            : []
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.values.address.current.same_as_permanent}
        className="w-1/2"
        bottomPadding={false}
      />

      <InputField
        key="address.current.pincode"
        label="Pincode"
        name="address.current.pincode"
        id="address.current.pincode"
        placeholder="Enter Pincode"
        type="number"
        value={formik.values.address.current.pincode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.values.address.current.same_as_permanent}
        error={
          formik.touched.address?.current?.pincode && 
          formik.errors.address?.current?.pincode
        }
      />
      
      <SelectField
        key="address.current.address_proof_type"
        label="Address Proof Type"
        name="address.current.address_proof_type"
        id="address.current.address_proof_type"
        formik={formik}
        placeholder="Select Address Proof Type"
        value={formik.values.address.current.address_proof_type}
        optionsData={idCardOptions}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.values.address.current.same_as_permanent}
        error={
          formik.touched.address?.current?.address_proof_type && 
          formik.errors.address?.current?.address_proof_type
        }
      />

      <InputField
        key="address.current.address_proof_number"
        label="Address Proof Number"
        name="address.current.address_proof_number"
        id="address.current.address_proof_number"
        placeholder="Enter Address Proof Number"
        value={formik.values.address.current.address_proof_number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.values.address.current.same_as_permanent}
        error={
          formik.touched.address?.current?.address_proof_number && 
          formik.errors.address?.current?.address_proof_number
        }
      />
    </div>
  );
};

export default CurrentResidentialAddress;