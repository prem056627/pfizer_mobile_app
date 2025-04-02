import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "../../../components/Form/InputField";
import SelectField from "../../../components/Form/SelectField";
import MultiFileUpload from "../../../components/Form/MultiFileUpload";
import { getCaregiverDetailsInitialValues } from "./initialValues";
import { transformToPatientDetailsFormData } from "../../../utils/forms";

// Relationship options for the dropdown
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
  { id: "Other", label: "Other" },
];

const idCardOptions = [
  { id: "passport", label: "Passport" },
  { id: "aadhaar", label: "Aadhaar" },
  { id: "pan", label: "PAN Card" },
  { id: "voter", label: "Voter ID" },
  { id: "driving", label: "Driving License" },
];

const CaregiverDetails = ({ formik }) => {
  // State to track caregivers and their details
  const [caregivers, setCaregivers] = useState([
    {
      id: 0,
      caregiver_id: 10009,
      isVerified: false,
      otpSent: false,
      otp: Array(6).fill(""),
      timerSeconds: 0,
    },
    {
      id: 1,
      caregiver_id: 10010,
      isVerified: false,
      otpSent: false,
      otp: Array(6).fill(""),
      timerSeconds: 0,
    },
    {
      id: 2,
      caregiver_id: 10011,
      isVerified: false,
      otpSent: false,
      otp: Array(6).fill(""),
      timerSeconds: 0,
    },
  ]);

  // State to track visible caregivers (starting with the first one)
  const [visibleCaregivers, setVisibleCaregivers] = useState([0]);

  // State to track if initialization has been done
  const [initialized, setInitialized] = useState(false);

  // State for timers
  const [timers, setTimers] = useState({});

  // Cleanup timers when component unmounts
  useEffect(() => {
    return () => {
      // Clear all active timers when component unmounts
      Object.values(timers).forEach((timerId) => {
        clearInterval(timerId);
      });
    };
  }, [timers]);

  // Add event listener for form submission
  useEffect(() => {
    if (!formik) return;

    // Store the original onSubmit function
    const originalOnSubmit = formik.handleSubmit;

    // Create a wrapper function that updates caregiverData before submitting
    const newOnSubmit = (e) => {
      // Prepare the updated caregiverData with grouped structure
      const caregiver0 = {
        caregiver_id: caregivers[0].caregiver_id,
        caregiver_name: formik.values[`caregiver_0_name`] || "",
        caregiver_email: formik.values[`caregiver_0_email`] || null,
        caregiver_mobile: formik.values[`caregiver_0_mobile`] || null,
        caregiver_relation: formik.values[`relationship_0`] || "NA",

        // Primary ID Details for Caregiver 0
        id_card_type: formik.values[`id_card_type_0`] || "",
        id_number: formik.values[`id_number_0`] || "",
        id_doc_upload: formik.values[`id_doc_upload_0`] || [],

        // First Additional ID Details for Caregiver 0
        id_card_type_1: formik.values[`id_card_1_type_0`] || "",
        id_number_1: formik.values[`id_number_1_0`] || "",
        id_doc_upload_1: formik.values[`id_doc_1_upload_0`] || [],
      };

      const caregiver1 = {
        caregiver_id: caregivers[1].caregiver_id,
        caregiver_name: formik.values[`caregiver_1_name`] || "",
        caregiver_email: formik.values[`caregiver_1_email`] || null,
        caregiver_mobile: formik.values[`caregiver_1_mobile`] || null,
        caregiver_relation: formik.values[`relationship_1`] || "NA",

        // Primary ID Details for Caregiver 1
        id_card_type: formik.values[`id_card_type_1`] || "",
        id_number: formik.values[`id_number_1`] || "",
        id_doc_upload: formik.values[`id_doc_upload_1`] || [],

        // First Additional ID Details for Caregiver 1
        id_card_type_1: formik.values[`id_card_1_type_1`] || "",
        id_number_1: formik.values[`id_number_1_1`] || "",
        id_doc_upload_1: formik.values[`id_doc_1_upload_1`] || [],
      };

      const caregiver2 = {
        caregiver_id: caregivers[2].caregiver_id,
        caregiver_name: formik.values[`caregiver_2_name`] || "",
        caregiver_email: formik.values[`caregiver_2_email`] || null,
        caregiver_mobile: formik.values[`caregiver_2_mobile`] || null,
        caregiver_relation: formik.values[`relationship_2`] || "NA",

        // Primary ID Details for Caregiver 2
        id_card_type: formik.values[`id_card_type_2`] || "",
        id_number: formik.values[`id_number_2`] || "",
        id_doc_upload: formik.values[`id_doc_upload_2`] || [],

        // First Additional ID Details for Caregiver 2
        id_card_type_1: formik.values[`id_card_1_type_2`] || "",
        id_number_1: formik.values[`id_number_1_2`] || "",
        id_doc_upload_1: formik.values[`id_doc_1_upload_2`] || [],
      };

      // Group the caregivers as separate objects in the caregiverData field
      formik.setFieldValue("caregiverData", {
        caregiver0,
        caregiver1,
        caregiver2,
      });

      // Continue with the original submit
      originalOnSubmit(e);
    };
    // Replace the handleSubmit method
    formik.handleSubmit = newOnSubmit;

    // Clean up
    return () => {
      formik.handleSubmit = originalOnSubmit;
    };
  }, [caregivers, visibleCaregivers]);

  // Return null if formik is not loaded yet
  if (!formik) return null;

  // Debug logging to verify files
  console.log("Uploaded Files:", formik.values[`id_doc_upload_0`]);
  // console.log('prepareFormDataprepareFormData',prepareFormData);

  // Send OTP to caregiver's mobile
  const sendOtp = (caregiverId) => {

    const caregiverIdVerify = {
      mobile: formik.values[`caregiver_${caregiverId}_mobile_verify`],
    }

    const preparedFormData = transformToPatientDetailsFormData(caregiverIdVerify);
    // In a real app, this would make an API call to send OTP
    fetch(
      `/patient_dashboard/?current_step=verify_mobile&mobile_no=${formik.values[`caregiver_${caregiverId}_mobile_verify`]}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: preparedFormData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update state to show OTP was sent
        setCaregivers((prevCaregivers) =>
          prevCaregivers.map((caregiver) =>
            caregiver.id === caregiverId
              ? {
                  ...caregiver,
                  otpSent: true,
                  otp: Array(6).fill(""),
                  timerSeconds: 30,
                }
              : caregiver
          )
        );

        // Start countdown timer
        startTimer(caregiverId);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  // Start the countdown timer for OTP resend
  const startTimer = (caregiverId) => {
    // Clear any existing timer for this caregiver
    if (timers[caregiverId]) {
      clearInterval(timers[caregiverId]);
    }

    const timerId = setInterval(() => {
      setCaregivers((prevCaregivers) => {
        // Find the caregiver to update
        const updatedCaregivers = prevCaregivers.map((caregiver) => {
          if (caregiver.id === caregiverId) {
            const newSeconds = caregiver.timerSeconds - 1;

            // If timer reached zero, clear the interval
            if (newSeconds <= 0) {
              clearInterval(timers[caregiverId]);
              // Update timers state to remove this timer
              setTimers((prev) => {
                const newTimers = { ...prev };
                delete newTimers[caregiverId];
                return newTimers;
              });
              return { ...caregiver, timerSeconds: 0 };
            }

            return { ...caregiver, timerSeconds: newSeconds };
          }
          return caregiver;
        });

        return updatedCaregivers;
      });
    }, 1000);

    // Store timer ID
    setTimers((prev) => ({
      ...prev,
      [caregiverId]: timerId,
    }));
  };

  // Verify the OTP entered by the user
  // Verify the OTP entered by the user
  const verifyOtp = (caregiverId) => {
    const caregiver = caregivers.find((c) => c.id === caregiverId);
    const enteredOtp = caregiver.otp.join("");


    const verifyOtp = {
      mobile_no: formik.values[`caregiver_${caregiverId}_mobile_verify`],
      otp: enteredOtp,
    }

    const preparedFormData = transformToPatientDetailsFormData(verifyOtp);

    // In a real app, this would verify OTP with the backend
    fetch(`/patient_dashboard/?current_step=verify_otp`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: preparedFormData
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if verification was successful based on the 'success' field
        if (data.success === true) {
          // OTP verification successful
          setCaregivers((prevCaregivers) =>
            prevCaregivers.map((c) =>
              c.id === caregiverId ? { ...c, isVerified: true } : c
            )
          );

          // Update formik values but not caregiverData yet
          formik.setFieldValue(
            `caregiver_${caregiverId}_mobile`,
            formik.values[`caregiver_${caregiverId}_mobile_verify`]
          );

          // Clear timer if it exists
          if (timers[caregiverId]) {
            clearInterval(timers[caregiverId]);
            setTimers((prev) => {
              const newTimers = { ...prev };
              delete newTimers[caregiverId];
              return newTimers;
            });
          }
        } else {
          // OTP verification failed
          setCaregivers((prevCaregivers) =>
            prevCaregivers.map((c) =>
              c.id === caregiverId
                ? { ...c, otpError: "Please enter valid OTP" }
                : c
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        // Show generic error
        setCaregivers((prevCaregivers) =>
          prevCaregivers.map((c) =>
            c.id === caregiverId
              ? { ...c, otpError: "Verification failed. Please try again." }
              : c
          )
        );
      });
  };

  // Handle input change for OTP fields
  // Updated OTP input fields to prevent alphabetic input and prevent zoom
  const handleOtpDigitChange = (caregiverId, index, value) => {
    // Only allow single digits, prevent alphabetic input
    if (value.length <= 1 && /^\d*$/.test(value)) {
      setCaregivers((prevCaregivers) => {
        return prevCaregivers.map((caregiver) => {
          if (caregiver.id === caregiverId) {
            const newOtp = [...caregiver.otp];
            newOtp[index] = value;

            return { ...caregiver, otp: newOtp };
          }
          return caregiver;
        });
      });

      // Auto-focus to next input if value is entered
      if (value !== "" && index < 5) {
        const nextInput = document.querySelector(
          `input[name=otp-${caregiverId}-${index + 1}]`
        );
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Add the next caregiver (show the next one from the predefined list)
  const addNewCaregiver = () => {
    const nextCaregiverId = visibleCaregivers.length;
    if (nextCaregiverId < caregivers.length) {
      setVisibleCaregivers((prev) => [...prev, nextCaregiverId]);
    }
  };

  // Check if all OTP digits are filled
  const isOtpComplete = (caregiverId) => {
    const caregiver = caregivers.find((c) => c.id === caregiverId);
    return caregiver && caregiver.otp.every((digit) => digit !== "");
  };

  // Example input handler for phone fields
  const handlePhoneInput = (e) => {
    // Only allow digits and limit to 10 characters
    const value = e.target.value.replace(/\D/g, "").substring(0, 10);
    e.target.value = value;
  };



  // Add this function to your component (inside the CaregiverDetails component but outside the return statement)
const clearOtp = (caregiverId) => {
  setCaregivers((prevCaregivers) =>
    prevCaregivers.map((caregiver) =>
      caregiver.id === caregiverId
        ? { ...caregiver, otp: Array(6).fill(""), otpError: null }
        : caregiver
    )
  );
  
  // Focus back on the first OTP input field
  const firstInput = document.querySelector(
    `input[name=otp-${caregiverId}-0]`
  );
  if (firstInput) firstInput.focus();
};

  return (
    <div className="flex flex-col gap-4">
      {visibleCaregivers.map((caregiverId) => {
        const caregiver = caregivers[caregiverId];
        return (
          <div key={caregiver.id} className="border-b pb-4 mb-4">
            {/* Caregiver title */}
            <h3 className="font-semibold text-[#283A46] font-sans text-[14px] pt-2">
              {caregiverId === 0
                ? "Primary Caregiver"
                : `Additional Caregiver ${caregiverId}`}
            </h3>

            {/* Mobile verification section (if not verified) */}
            {!caregiver.isVerified && (
              <>
                <h3 className="font-semibold text-black font-sans text-[12px] py-4">
                  Verify Caregiver's Mobile Number
                </h3>

                {/* Mobile input field */}
                <InputField
                  label="Caregiver's Mobile Number"
                  name={`caregiver_${caregiverId}_mobile_verify`}
                  id={`caregiver_${caregiverId}_mobile_verify`}
                  placeholder="Enter caregiver's mobile number"
                  value={
                    formik.values[`caregiver_${caregiverId}_mobile_verify`] ||
                    ""
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[`caregiver_${caregiverId}_mobile_verify`] &&
                    formik.errors[`caregiver_${caregiverId}_mobile_verify`]
                  }
                  disabled={caregiver.otpSent}
                  onInput={handlePhoneInput}
                  maxLength={10}
                />

                {/* OTP section - Show GET OTP button or OTP inputs */}
                {!caregiver.otpSent ? (
                  <>
                    <button
                      type="button"
                      onClick={() => sendOtp(caregiverId)}
                      disabled={
                        !formik.values[
                          `caregiver_${caregiverId}_mobile_verify`
                        ] ||
                        formik.values[`caregiver_${caregiverId}_mobile_verify`]
                          .length < 10
                      }
                      className={`text-primary text-[12px] font-semibold w-fit pt-5 ${
                        !formik.values[
                          `caregiver_${caregiverId}_mobile_verify`
                        ] ||
                        formik.values[`caregiver_${caregiverId}_mobile_verify`]
                          .length < 10
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:underline cursor-pointer"
                      }`}
                    >
                      GET OTP
                    </button>
                    {formik.values[`caregiver_${caregiverId}_mobile_verify`] &&
                      formik.values[`caregiver_${caregiverId}_mobile_verify`]
                        .length < 10 && (
                        <div className="text-red-500 text-xs mt-1">
                          Please enter 10 digit mobile number
                        </div>
                      )}
                  </>
                ) : (
                  <div className="flex flex-col gap-4 pt-4">
                    {/* OTP input section */}
                    <div className="flex flex-col gap-3">
                      <p className="text-gray-700">
                        Enter the OTP sent to{" "}
                        <b>
                          {
                            formik.values[
                              `caregiver_${caregiverId}_mobile_verify`
                            ]
                          }
                        </b>
                      </p>

                      {/* OTP input fields */}
                      {/* OTP input fields */}
                      <div className="flex gap-2">
                        {caregiver.otp.map((digit, index) => (
                          <input
                            key={index}
                            name={`otp-${caregiverId}-${index}`}
                            type="tel" // Change type to 'tel' to prevent zoom on mobile
                            inputMode="numeric" // Ensure numeric keyboard
                            pattern="[0-9]*" // Only allow numeric input
                            maxLength="1"
                            className="w-[52px] h-[52px] border rounded text-center text-lg"
                            value={digit}
                            onChange={(e) =>
                              handleOtpDigitChange(
                                caregiverId,
                                index,
                                e.target.value
                              )
                            }
                            onFocus={(e) => {
                              // Prevent zooming on mobile
                              e.target.setAttribute("readonly", true);
                              setTimeout(
                                () => e.target.removeAttribute("readonly"),
                                500
                              );
                            }}
                          />
                        ))}
                      </div>

                      {/* Add Clear OTP button here */}
                    <button
                      type="button"
                      onClick={() => clearOtp(caregiverId)}
                      className="text-primary text-sm font-semibold hover:underline mt-2 text-start"
                    >
                      Clear OTP
                    </button>

                      {/* Add this error message display */}
                      {caregiver.otpError && (
                        <div className="text-red-500 text-xs mt-1">
                          {caregiver.otpError}
                        </div>
                      )}
                    </div>

                    {/* Timer and verify button */}
                    <div className="flex flex-col gap-3">
                      {caregiver.timerSeconds > 0 ? (
                        <p className="text-gray-500">
                          Resend OTP in {caregiver.timerSeconds}
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={() => sendOtp(caregiverId)}
                          className="text-primary font-semibold hover:underline"
                        >
                          Resend OTP
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => verifyOtp(caregiverId)}
                        disabled={!isOtpComplete(caregiverId)}
                        className={`flex h-12 items-center justify-center gap-2 rounded-md bg-primary p-4 text-white font-open-sans font-semibold tracking-wide ${
                          !isOtpComplete(caregiverId)
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Caregiver details section (after verification) */}
            {caregiver.isVerified && (
              <div className="flex flex-col gap-2 pt-4">
                {/* Verified mobile number (readonly) */}
                <InputField
                  label="Caregiver's Mobile Number"
                  name={`caregiver_${caregiverId}_mobile`}
                  id={`caregiver_${caregiverId}_mobile`}
                  value={formik.values[`caregiver_${caregiverId}_mobile`] || ""}
                  error={
                    formik.touched[`caregiver_${caregiverId}_mobile`] &&
                    formik.errors[`caregiver_${caregiverId}_mobile`]
                  }
                  disabled
                />

                {/* Name field */}
                <InputField
                  label="Caregiver's Name"
                  name={`caregiver_${caregiverId}_name`}
                  id={`caregiver_${caregiverId}_name`}
                  placeholder="Enter name"
                  value={formik.values[`caregiver_${caregiverId}_name`] || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[`caregiver_${caregiverId}_name`] &&
                    formik.errors[`caregiver_${caregiverId}_name`]
                  }
                />

                {/* Email field */}
                <InputField
                  label="Caregiver's Email ID"
                  name={`caregiver_${caregiverId}_email`}
                  id={`caregiver_${caregiverId}_email`}
                  placeholder="Enter email"
                  value={formik.values[`caregiver_${caregiverId}_email`] || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[`caregiver_${caregiverId}_email`] &&
                    formik.errors[`caregiver_${caregiverId}_email`]
                  }
                />

                {/* Relationship dropdown */}
                <SelectField
                  label="Relationship"
                  name={`relationship_${caregiverId}`}
                  id={`relationship_${caregiverId}`}
                  formik={formik}
                  placeholder="Select"
                  value={formik.values[`relationship_${caregiverId}`] || ""}
                  optionsData={relationshipOptions}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[`relationship_${caregiverId}`] &&
                    formik.errors[`relationship_${caregiverId}`]
                  }
                />

                {/* Primary ID Details */}
                <div className="id-group flex flex-col gap-2">
                  {/* ID Card Type field */}
                  <SelectField
                    label="ID Card Type"
                    name={`id_card_type_${caregiverId}`}
                    id={`id_card_type_${caregiverId}`}
                    formik={formik}
                    placeholder="Select ID Card Type"
                    value={formik.values[`id_card_type_${caregiverId}`] || ""}
                    optionsData={idCardOptions}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {/* ID Number field */}
                  <InputField
                    label="ID Number"
                    name={`id_number_${caregiverId}`}
                    id={`id_number_${caregiverId}`}
                    placeholder="Enter ID Number"
                    value={formik.values[`id_number_${caregiverId}`] || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {/* Document Upload field */}
                  <MultiFileUpload
                    label="Primary Doc Upload"
                    isMultiple={true}
                    formik={formik}
                    id={`id_doc_upload_${caregiverId}`}
                    name={`id_doc_upload_${caregiverId}`}
                    description="The file must be in jpg/pdf/png format. Maximum size of the document should be 5MB. You can upload up to 5 files."
                  />
                </div>

                {/* Additional ID Details */}
                <div className="id-group flex flex-col gap-2">
                  {/* Additional ID Card Type field */}
                  <SelectField
                    label="Additional ID Card Type"
                    name={`id_card_1_type_${caregiverId}`}
                    id={`id_card_1_type_${caregiverId}`}
                    formik={formik}
                    placeholder="Select Additional ID Card Type"
                    value={
                      formik.values[
                        `id_card_1_type_${caregiverId}`
                      ] || ""
                    }
                    optionsData={idCardOptions}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {/* Additional ID Number field */}
                  <InputField
                    label="Additional ID Number"
                    name={`id_number_1_${caregiverId}`}
                    id={`id_number_1_${caregiverId}`}
                    placeholder="Enter Additional ID Number"
                    value={
                      formik.values[
                        `id_number_1_${caregiverId}`
                      ] || ""
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {/* Additional Document Upload field */}
                  <MultiFileUpload
                    label="Additional Doc Upload"
                    isMultiple={true}
                    formik={formik}
                    id={`id_doc_1_upload_${caregiverId}`}
                    name={`id_doc_1_upload_${caregiverId}`}
                    description="The file must be in jpg/pdf/png format. Maximum size of the document should be 5MB. You can upload up to 5 files."
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Add new caregiver button - only show if we have fewer than 3 caregivers and the last one is verified */}
      {visibleCaregivers.length < caregivers.length &&
        caregivers[visibleCaregivers[visibleCaregivers.length - 1]]
          .isVerified && (
          <button
            type="button"
            onClick={addNewCaregiver}
            className="mt-2 text-primary font-semibold hover:underline text-left"
          >
            + Add New Caregiver
          </button>
        )}
    </div>
  );
};

CaregiverDetails.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default CaregiverDetails;
