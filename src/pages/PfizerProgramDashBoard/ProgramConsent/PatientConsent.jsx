import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProgramEnrollmentConsent, selectSelectedProgram, setDocUploadStatus } from '../../../slice/patient-detail-form'


export const LorbriquaCareConsent = () => {
  return (
    <div className=" bg-white">

<div>
				{/* <h1 className="pb-2 font-open-sans text-2xl font-semibold text-[#403939]">
                Patient Consent
				</h1> */}
        <h1 className="text-xl font-bold mb-4 pt-4">Lorbriqua Patient Access Program - Patient Certification</h1>
				<div className="h-1 w-8 rounded-full bg-primary"></div>
			</div>

     
      
      <div className="space-y-4 mt-5">
        <p>
          I hereby voluntarily agree, consent and authorize Pfizer Products India Private Limited (Pfizer), Lorbriqua Patient Access Program Team - Service provider of Pfizer, or any other third party contracted service provider appointed either by the service provider of Pfizer or by Pfizer directly, in order to receive, collect, upload, use, transfer, possess, store, deal, handle or have access (in physical/electronic form) to the information, communication and documents (including this enrolment form) shared by me or my caretaker as required under Law or otherwise by Pfizer (1) in connection with me availing the benefit and participating in the program, and (il) for the purpose of administration and implementation of the Lorbriqua Patient Access Program, for which I have made this application as well as to:
        </p>

        <ul className="list-disc pl-5">
          <li>Contact me for purposes including but not limited to verification of my identity, proof of life, prescription, medical as well as financial status.</li>
          <li>Undertake any verification process for the determination of the genuineness of the information, communication and documents provided by me.</li>
          <li>Send me program-related information in any manner including SMS (one-way) alerts for the program.</li>
          <li>Determine my eligibility to the program and also to provide value added services to me under the program.</li>
        </ul>

        <p>
          I hereby agree, acknowledge and confirm that I am voluntarily signing up for the program and for that purpose consent and agree to undergo the verification process and submit the information, communication and documents as may be required from me from time to time in order to establish my eligibility to avail the benefit and participate in the program.
        </p>

        <p>
          I agree that this enrolment form as well as UID generation does not guarantee that I shall be admitted into the program and only if this enrolment application is approved, is when my participation in the program will be confirmed.
        </p>

        <p>
          I hereby agree and understand that my Treating Oncologist's prescription prescribing me the drug for an on-label indication (only) is mandatory for enrolment into and for being eligible for the program. I further agree and understand that the information and documents required under this form to be submitted by me is required for me to avail the benefit of and participate in the program.
        </p>

        <p>
          I understand that I have the option to opt out of the program at my will and I shall communicate the same to Lorbriqua Patient Access Program Team. I further understand that I have the option to not provide any information or document or verification requested under this form or withdraw my consent provided herein at any time without giving any reason and writing to Lorbriqua Patient Access Program Team. In the event of such a refusal or withdrawal at my end I understand that I will not be entitled to any further assistance under the Lorbriqua Patient Access Program.
        </p>

        <p>
          I understand not to sell or transfer the assistance received by me/caretaker under the Lorbriqua Patient Access Program to any other party.
        </p>

        <p>
          I understand that in the event the assistance provided is no longer required by me due to change in indication or line of treatment by my Treating Oncologist or any other reason, I or any person authorized by me shall intimate the Lorbriqua Patient Access Program Team or any other third party contracted service provider appointed either by the service provider of Pfizer or by Pfizer on the same and return the unused/unutilized assistance received under the Lorbriqua Patient Access Program to the Lorbriqua Patient Access Program Team promptly.
        </p>

        {/* Continued sections for the full consent text */}
        
        <div className="mt-6 text-sm text-gray-600">
          <p>© 1 MG Technologies Pvt. Ltd. | Pfizer Products India Private Limited</p>
          <p>Contact: 1800 258 7008</p>
        </div>
      </div>
    </div>
  );
};





export const CrizalkProgramConsent = () => {
  return (
    <div className="consent-container ">
       <div className='pb-5'>
				<h1 className="pb-2 font-open-sans text-2xl font-semibold text-[#403939]">
        Crizalk Patient Access Program - Patient Certification
				</h1>
				<div className="h-1 w-8 rounded-full bg-primary"></div>
			</div>
     
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Program Information</h2>
          <p className="mb-2">Programs:</p>
          <ul className="list-disc pl-5 mb-3">
            <li>STAR Patient Access Program</li>
            <li>LorbriquaCare Patient Access Program</li>
            <li>Crizalk Patient Access Program</li>
          </ul>
          <p className="text-sm text-gray-600">Powered by TATA 1mg</p>
          <p className="text-sm text-gray-600">Contact: 18002587008</p>
        </div>

     

        <div className="consent-details space-y-4">
          <p>
            I hereby voluntarily agree, consent and authorize Pfizer Products India Private Limited (Pfizer), Crizalk Patient Access Program Team - Service provider of Pfizer, or any other third party contracted service provider appointed either by the service provider of Pfizer or by Pfizer directly, in order to receive, collect, upload, use, transfer, possess, store, deal, handle or have access (in physical/electronic form) to the information, communication and documents (including this enrolment form) shared by me or my caretaker as required under Law or otherwise by Pfizer:
          </p>

          <ul className="list-disc pl-5">
            <li>Contact me for purposes including but not limited to verification of my identity, proof of life, prescription, medical as well as financial status.</li>
            <li>Undertake any verification process for the determination of the genuineness of the information, communication and documents provided by me.</li>
            <li>Send me program-related information in any manner including SMS (one-way) alerts for the program.</li>
            <li>Determine my eligibility to the program and also to provide value added services to me under the program.</li>
          </ul>
        </div>

        <div className="key-agreements space-y-4">
          <p>
            I hereby agree, acknowledge and confirm that I am voluntarily signing up for the program and for that purpose consent and agree to undergo the verification process and submit the information, communication and documents as may be required from me from time to time in order to establish my eligibility to avail the benefit and participate in the program.
          </p>

          <p>
            I agree that this enrolment form as well as UID generation does not guarantee that I shall be admitted into the program and only if this enrolment application is approved, is when my participation in the program will be confirmed.
          </p>
        </div>

        <div className="program-details space-y-4">
          <p>
            I hereby agree and understand that my Treating Oncologist's prescription prescribing me the drug for an on-label indication (only) is mandatory for enrolment into and for being eligible for the program. I further agree and understand that the information and documents required under this form to be submitted by me is required for me to avail the benefit of and participate in the program.
          </p>

          <p>
            I understand that I have the option to opt out of the program at my will and I shall communicate the same to Crizalk Patient Access Program Team. I further understand that I have the option to not provide any information or document or verification requested under this form or withdraw my consent provided herein at any time without giving any reason and writing to Crizalk Patient Access Program Team.
          </p>
        </div>

        <div className="data-consent space-y-4">
          <p>
            I consent to Pfizer, Crizalk Patient Access Program Team or any other third party contracted service provider:
          </p>
          <ul className="list-disc pl-5">
            <li>For using my de-identified data as well as sharing the same with any government or judicial bodies on consolidated basis to obtain insights about the trends of Patient Access Programs and improving the overall program to provide better services to patients.</li>
            <li>For submitting my identifiable personal and sensitive personal information/data before any government or judicial bodies as and when demanded by the same.</li>
          </ul>
        </div>

        <div className="contact-info mt-6 text-sm text-gray-600">
          <p>1 MG Technologies Pvt. Ltd.</p>
          <p>5th floor, Block B, Presidency Tower</p>
          <p>46/4 Mehrauli Road, Opp. Govt. Girl's College</p>
          <p>Anamika Enclave, Sector 14, Gurugram, Haryana – 122001</p>
          <p>Toll Free: 1800 258 7008</p>
          <p>Email ID: access@mediangels.com</p>
          <p>® Trademark Proprietor: Pfizer Inc., USA</p>
          <p>Licensed User: Pfizer Products India Private Limited, India</p>
        </div>
      </div>
    </div>
  );
};



export const PalbaceProgramConsent = () => {
  return (
    <div className="consent-container">
       <div className='pb-5'>
				<h1 className="pb-2 font-open-sans text-2xl font-semibold text-[#403939]">
        Palbace Patient Access Program - Patient Certification
				</h1>
				<div className="h-1 w-8 rounded-full bg-primary"></div>
			</div>
     
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Program Information</h2>
          <p className="mb-2">Programs:</p>
          <ul className="list-disc pl-5 mb-3">
            <li>STAR Patient Access Program</li>
            <li>LorbriquaCare Patient Access Program</li>
            <li>Crizalk Patient Access Program</li>
          </ul>
          <p className="text-sm text-gray-600">Powered by TATA 1mg</p>
          <p className="text-sm text-gray-600">Contact: 18002587008</p>
        </div>

     

        <div className="consent-details space-y-4">
          <p>
            I hereby voluntarily agree, consent and authorize Pfizer Products India Private Limited (Pfizer), Crizalk Patient Access Program Team - Service provider of Pfizer, or any other third party contracted service provider appointed either by the service provider of Pfizer or by Pfizer directly, in order to receive, collect, upload, use, transfer, possess, store, deal, handle or have access (in physical/electronic form) to the information, communication and documents (including this enrolment form) shared by me or my caretaker as required under Law or otherwise by Pfizer:
          </p>

          <ul className="list-disc pl-5">
            <li>Contact me for purposes including but not limited to verification of my identity, proof of life, prescription, medical as well as financial status.</li>
            <li>Undertake any verification process for the determination of the genuineness of the information, communication and documents provided by me.</li>
            <li>Send me program-related information in any manner including SMS (one-way) alerts for the program.</li>
            <li>Determine my eligibility to the program and also to provide value added services to me under the program.</li>
          </ul>
        </div>

        <div className="key-agreements space-y-4">
          <p>
            I hereby agree, acknowledge and confirm that I am voluntarily signing up for the program and for that purpose consent and agree to undergo the verification process and submit the information, communication and documents as may be required from me from time to time in order to establish my eligibility to avail the benefit and participate in the program.
          </p>

          <p>
            I agree that this enrolment form as well as UID generation does not guarantee that I shall be admitted into the program and only if this enrolment application is approved, is when my participation in the program will be confirmed.
          </p>
        </div>

        <div className="program-details space-y-4">
          <p>
            I hereby agree and understand that my Treating Oncologist's prescription prescribing me the drug for an on-label indication (only) is mandatory for enrolment into and for being eligible for the program. I further agree and understand that the information and documents required under this form to be submitted by me is required for me to avail the benefit of and participate in the program.
          </p>

          <p>
            I understand that I have the option to opt out of the program at my will and I shall communicate the same to Crizalk Patient Access Program Team. I further understand that I have the option to not provide any information or document or verification requested under this form or withdraw my consent provided herein at any time without giving any reason and writing to Crizalk Patient Access Program Team.
          </p>
        </div>

        <div className="data-consent space-y-4">
          <p>
            I consent to Pfizer, Crizalk Patient Access Program Team or any other third party contracted service provider:
          </p>
          <ul className="list-disc pl-5">
            <li>For using my de-identified data as well as sharing the same with any government or judicial bodies on consolidated basis to obtain insights about the trends of Patient Access Programs and improving the overall program to provide better services to patients.</li>
            <li>For submitting my identifiable personal and sensitive personal information/data before any government or judicial bodies as and when demanded by the same.</li>
          </ul>
        </div>

        <div className="contact-info mt-6 text-sm text-gray-600">
          <p>1 MG Technologies Pvt. Ltd.</p>
          <p>5th floor, Block B, Presidency Tower</p>
          <p>46/4 Mehrauli Road, Opp. Govt. Girl's College</p>
          <p>Anamika Enclave, Sector 14, Gurugram, Haryana – 122001</p>
          <p>Toll Free: 1800 258 7008</p>
          <p>Email ID: access@mediangels.com</p>
          <p>® Trademark Proprietor: Pfizer Inc., USA</p>
          <p>Licensed User: Pfizer Products India Private Limited, India</p>
        </div>
      </div>
    </div>
  );
};



// PatientConsent Component
function PatientConsent({ 
  formik, 
  label = 'Submit', 
  theme = 'normal', 
  allowDisabled = false 
}) {
  const dispatch = useDispatch()

  const handleRequest = () => {
    dispatch(setDocUploadStatus("scheme_enroll_doc"));
  }

  const selectedProgram = useSelector(selectProgramEnrollmentConsent);
  console.log('selectedProgram', selectedProgram?.program?.program_name);

  const Program_name = selectedProgram?.program?.program_name;
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }


  const renderConsentComponent = () => {
    switch (Program_name) {
      case "Lorbriqua Care":
        return <LorbriquaCareConsent />;
      case "Palbace Program":
        return <PalbaceProgramConsent />;
      case "Crizalk Program":
        return <CrizalkProgramConsent />;
      default:
        return null;
    }
  };

  return (
    <form
      className="complete-hidden-scroll-style flex grow flex-col gap-4 overflow-y-auto"
      onSubmit={handleSubmit}
    >

      <div className="flex grow flex-col gap-[16px]">
{/* Render the consent component */}
{renderConsentComponent()}
     
      </div>
      
      <div className="sticky bottom-0 flex flex-col gap-[8px]  pt-[24px] font-lato text-[#696969] md:items-endpx-4 ">
        <button
          type="submit"
          className={`  w-full text-[14px] font-sans font-bold bg-primary text-white py-4 rounded-lg`}
          disabled={allowDisabled && formik ? !(formik.isValid && formik.dirty) : false}
        >
          <span>{label}</span>
        </button>
      </div>
    </form>
  )
}

export default PatientConsent