import { get } from "lodash";
import moment from "moment";
import React from "react";
import FormDatePicker from "../../../components/Form/FormDatePicker";
import InputField from "../../../components/Form/InputField";
import SelectField from "../../../components/Form/SelectField";
import { nationalityOptions } from "../../../utils/constants";
import { selectInitializeData } from "../../../slice/patient-detail-form";
import { useSelector } from "react-redux";

const genderOptions = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "other", label: "Other" },
];

export default function PersonalDetailsForm({ formik }) {
  const initiaData = useSelector(selectInitializeData);

  const patient_mobile_number = initiaData?.mobile;

  // Add this useEffect to set the mobile number in Formik values when the component mounts
  React.useEffect(() => {
    if (patient_mobile_number) {
      formik.setFieldValue("mobile_number", patient_mobile_number);
    }
  }, [patient_mobile_number]);

  // console.log("mobile number",)
  return (
    <div className="flex grow flex-col gap-[16px]">
      <InputField
        key="full_name"
        label={
                <>
                  Full Name <span className="text-red-500">*</span>
                </>
              }
        name="full_name"
        id="full_name"
        placeholder="Enter"
        value={formik.values.full_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="md:grid md:grid-cols-2 flex flex-col gap-4">
        <SelectField
          key="gender"
          label={
                <>
                  Gender <span className="text-red-500">*</span>
                </>
              }
          name="gender"
          id="gender"
          formik={formik}
          placeholder="Select"
          value={formik.values.gender}
          optionsDataName="gender"
          optionsData={genderOptions}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-1/2"
        />

        <FormDatePicker
        key={'date_of_birth'}
        label="Date of Birth"
        name={'date_of_birth'}
        id={'date_of_birth'}
        placeholder="Select"
        value={formik.values.date_of_birth}
        formik={formik}
        min={moment().subtract(100, 'years')}
        max={moment()}
      />
        
      </div>

      <div className="flex flex-col gap-[4px]">
        <label
          htmlFor="mobile_number"
          className="font-open-sans text-form-xs font-semibold text-[#595454]"
        >
          Mobile Number
        </label>
        <div className="flex gap-[12px] rounded-md border border-[#ACA9A9] px-[12px] py-[14px] bg-white">
          <span className="font-open-sans text-[#6C747D]">+91</span>
          <input
            id="mobile_number"
            name="mobile_number"
            type="text"
            readOnly
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength="10"
            value={formik.values.mobile_number} // Change this to use formik.values
            className="h-full w-full font-open-sans text-[#283A46] placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0 disabled:bg-[#f2f2f2]"
            placeholder="0000000000"
          />
        </div>
   
      </div>
      <InputField
        key="email"
         label={
                <>
                  Email ID <span className="text-red-500">*</span>
                </>
              }
        name="email"
        id="email"
        placeholder="john.doe@xyz.com"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <SelectField
        key="nationality"
        label={
                <>
                  Nationality <span className="text-red-500">*</span>
                </>
              }
        name="nationality"
        id="nationality"
        formik={formik}
        placeholder="Select"
        value={formik.values.nationality}
        optionsDataName="nationality"
        optionsData={nationalityOptions}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-1/2"
      />
    </div>
  );
}
