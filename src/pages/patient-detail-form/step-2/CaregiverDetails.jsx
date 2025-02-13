import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../components/Form/InputField';
import SelectField from '../../../components/Form/SelectField';

const relationshipOptions = [
  { id: 'parent', label: 'Parent' },
  { id: 'spouse', label: 'Spouse' },
  { id: 'sibling', label: 'Sibling' },
  { id: 'guardian', label: 'Guardian' },
  { id: 'other', label: 'Other' },
];

const CaregiverDetails = ({ formik }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isOtpComplete, setIsOtpComplete] = useState(false);

  useEffect(() => {
    const isComplete = otp.every(digit => digit !== '');
    setIsOtpComplete(isComplete);
  }, [otp]);

  if (!formik) {
    return null;
  }

  const handleSendOtp = () => {
    if (formik.validateField) {
      formik.validateField('caregiver_mobile_verify').then(() => {
        if (!formik.errors.caregiver_mobile_verify) {
          setOtpSent(true);
        }
      });
    }
  };

  const handleVerify = () => {
    setIsVerified(true);
    if (formik.setFieldValue) {
      formik.setFieldValue('caregiver_mobile', formik.values.caregiver_mobile_verify);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value !== '' && index < 5) {
        const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const values = formik.values || {};
  const touched = formik.touched || {};
  const errors = formik.errors || {};

  return (
    <div className="flex flex-col gap-4">
      {!isVerified && (
        <>
          <h3 className="font-semibold text-[#283A46] font-sans text-[16px] py-4">
            Verify Caregiver's Mobile Number
          </h3>
          <InputField
            key="caregiver_mobile_verify"
            label="Caregiver's Mobile Number"
            name="caregiver_mobile_verify"
            id="caregiver_mobile_verify"
            placeholder="Enter caregiver's mobile number"
            value={values.caregiver_mobile_verify || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={touched.caregiver_mobile_verify && errors.caregiver_mobile_verify}
            disabled={otpSent}
          />
          
          {!otpSent ? (
            <button
              onClick={handleSendOtp}
              disabled={!values.caregiver_mobile_verify || errors.caregiver_mobile_verify}
              className={`text-primary text-[12px] font-semibold w-fit ${
                !values.caregiver_mobile_verify || errors.caregiver_mobile_verify
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:underline cursor-pointer'
              }`}
            >
              GET OTP
            </button>
          ) : (
            <>
              <p className="text-gray-700">
                Enter the OTP sent to <b>{values.caregiver_mobile_verify}</b>
              </p>
              <div className="flex gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    name={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    className="w-[52px] h-[52px] border rounded text-center"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
              <p className="text-gray-500">Resend OTP in 30</p>
              <button
                onClick={handleVerify}
                disabled={!isOtpComplete}
                className={`flex h-12 items-center justify-center gap-2 rounded-md bg-primary p-4 text-white font-open-sans font-semibold tracking-wide ${
                  !isOtpComplete ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Verify
              </button>
            </>
          )}
        </>
      )}

      {isVerified && (
        <>
          <InputField
            key="caregiver_mobile"
            label="Caregiver's Mobile Number"
            name="caregiver_mobile"
            id="caregiver_mobile"
            value={values.caregiver_mobile || ''}
            error={touched.caregiver_mobile && errors.caregiver_mobile}
            disabled
          />
          <InputField
            key="caregiver_name"
            label="Caregiver's Name"
            name="caregiver_name"
            id="caregiver_name"
            placeholder="Enter name"
            value={values.caregiver_name || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={touched.caregiver_name && errors.caregiver_name}
          />
          <InputField
            key="caregiver_email"
            label="Caregiver's Email ID"
            name="caregiver_email"
            id="caregiver_email"
            placeholder="Enter email"
            value={values.caregiver_email || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={touched.caregiver_email && errors.caregiver_email}
          />
          <SelectField
            key="relationship"
            label="Relationship"
            name="relationship"
            id="relationship"
            formik={formik}
            placeholder="Select"
            value={values.relationship || ''}
            optionsData={relationshipOptions}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={touched.relationship && errors.relationship}
          />
          <button className="mt-2 text-blue-600 font-semibold hover:underline text-left">
            + Add New Caregiver
          </button>
        </>
      )}
    </div>
  );
};

CaregiverDetails.propTypes = {
  formik: PropTypes.object.isRequired
};

export default CaregiverDetails;