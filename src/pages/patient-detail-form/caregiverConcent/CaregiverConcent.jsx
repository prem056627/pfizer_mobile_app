import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProgramEnrollmentConsent,
  selectSelectedProgram,
  setCaregiver_enroll_consent,
  setDocUploadStatus,
} from "../../../slice/patient-detail-form";

export const CaregiverConcentTermsCondition = () => {
    return (
      <div className="bg-white">
        <div>
          <h1 className="text-xl font-bold mb-4 pt-4">
            Caretaker's certification
          </h1>
          <div className="h-1 w-8 rounded-full bg-primary"></div>
        </div>
  
        <div className="space-y-4 mt-5">
          <div className="modal-body concent_form">
            <ul style={{ textAlign: "justify" }} className="space-y-3">
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I hereby voluntarily agree, consent and authorize Pfizer Product India Private Limited (Pfizer),
                  Patient Access Program Team - Service provider of Pfizer which includes TATA 1MG Private
                  Limited, Rx Consultants Private Limited or any other service provider appointed by Pfizer to
                  receive, collect, upload/store, use, transfer, possess, store, deal, evaluate, handle or have
                  access (in physical/electronic form) to the information, communication and documents (including
                  this enrollment form, identity, address and financial documents) shared by me or my caregiver(s)
                  or other family members as required under Law or otherwise by Pfizer(i) in connection with me
                  availing the benefit and participating in the program, and (ii) for the purpose of
                  administration and implementation of the Patient Access Program, for which I have made
                  this application as well as to:
                </span>
              </li>
              
              <ul className="pl-8 space-y-2">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>
                    Contact me for purposes including but not limited to verification of my identity, proof of
                    life, prescription, medical as well as financial status;
                  </span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>
                    Undertake any verification process for the determination of the genuineness of the
                    information, validate financial records, communication and documents provided by me;
                  </span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>
                    Send me program-related information in any manner including sending me SMS (one-way) alerts
                    for the program;
                  </span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>
                    Determine my eligibility to the appropriate Patient Access Program and also to provide value
                    added services to me under the program by undertaking inquiries we deem appropriate to
                    evaluate and satisfy ourselves about any information either provided by you or available to
                    us from any other source including obtaining information from banks, reference schemes or
                    credit information and also to provide any such information to them. We may exchange or
                    share any information with respect to your account with our affiliates or business partners
                    for the purpose of verification or determining eligibility, or as required by law.
                  </span>
                </li>
              </ul>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I hereby agree, acknowledge and confirm that I am voluntarily signing up as caretaker of the
                  Patient for this Program and for that purpose consent and agree to undergo the verification
                  process and submit the information, communication and documents as may be required for Patient
                  from time to time to establish Patient's eligibility to avail the benefit and participate in the
                  program.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I agree that this enrolment form as well as UID generation does not guarantee that Patient shall
                  be admitted into the program and only if this enrolment application is approved is when
                  Patient's participation in the program will be confirmed.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I hereby agree and understand that Patient's Treating Oncologist's prescription prescribing
                  Patient the drug for an on-label indication (only) is mandatory for enrolment into and for being
                  eligible for the program. I further agree and understand that the information and documents
                  required under this form to be submitted by Patient is required for Patient to avail the benefit
                  of and participate in the program.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I understand that Patient and I have the option to opt out of the program at our will and we
                  shall communicate the same to Patient Access Program Team. I further understand that
                  Patient and I have the option to not provide any information or document or verification
                  requested under this form or withdraw my consent provided herein at any time without giving any
                  reason and writing to Patient Access Program Team. In the event of such a refusal or
                  withdrawal at my/Patient's end. I understand that Patient will not be entitled to any further
                  assistance under the Patient Access Program.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I understand not to sell or transfer the assistance received by me on behalf of Patient under
                  the Patient Access Program to any other party.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I understand that in the event the assistance provided is no longer required by Patient due to
                  change in indication or line of treatment by Patient's Treating Oncologist or any other reason,
                  I or any person authorized by Patient shall intimate the Patient Access Program Team or
                  any other service provider appointed by Pfizer on the same and return the unused/unutilized
                  assistance received under the Patient Access Program to the Patient Access Program
                  Team promptly.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  By signing this enrolment form and basis authorisation provided to me by patient, I certify and
                  attest that all information given by me / Patient to Patient Access Program Team in the
                  enrolment form, including but not limited to Patients medical and financial history current
                  status and documents submitted by me / Patient, is complete, true and accurate to the best of my
                  knowled geand the Patient has authorised me to share the same.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I am authorised by Patient to provide additional information and/or documents to verify
                  Patient's financial or insurance status, to Pfizer, Patient Access Program Team or any
                  service provider appointed by Pfizer to determine Patient eligibility to the program and also to
                  provide value added services to Patient under the program.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I consent to my conversations with Pfizer, Patient Access Program Team, any third party
                  appointed by Pfizer being recorded for information and documentation processes in relation to
                  the program.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I as authorised by the Patient consent to Pfizer, Patient Access Program Team or any
                  other servicer provider of Pfizer:
                </span>
              </li>
              
              <ul className="pl-8 space-y-2">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>
                    Using my/Patient's de-identified data as well as sharing the same with any government or
                    judicial bodies on consolidated basis to obtain insights about the trends of Patient Access
                    Programs and improving the overall program to provide better services to patients
                  </span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>
                    Submitting Patient's identifiable personal and sensitive personal information/data before
                    any government or judicial bodies as and when demanded by the same
                  </span>
                </li>
              </ul>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I agree to inform immediately Patient Access Program Team and Patient's Treating
                  Oncologist if Patient's financial or insurance status changes.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I authorize Pfizer, Patient Access Program Team or any other service provider appointed
                  by Pfizer to obtain and access health information from Patients Treating Oncologist, Insurance
                  Company(s) and Retailer/Stockiest from whom I on behalf of Patient / Patient made purchases for
                  Palbace® or other information necessary to complete the application process, to verify the
                  accuracy of any information (including the prescription submitted for Patient) provided in this
                  enrolment form, and to administer and implement the program and to extend the benefit of the
                  program to Patient. I hereby authorise Patients Treating Oncologist to share and provide to
                  Pfizer, Patient Access Program Team or any other service provider appointed by Pfizer
                  access to information as may be requested by Pfizer, Patient Access Program Team or any
                  other service provider appointed by Pfizer in connection with this program.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I understand that Pfizer and Patient Access Program Team has the right to revise, change,
                  assign or terminate this program (and the assistance provided) at any time without notice and in
                  such an event I consent to my information being transferred accordingly for the purposes of
                  receiving uninterrupted assistance
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I hereby agree that in case the information provided by me / Patient in this form is found to be
                  incorrect, inaccurate or false, I shall be liable to indemnify Pfizer for the same and I
                  understand that the Patients enrolment shall be removed from this program.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I understand that my personal identified information would not be sold or rented or exchanged
                  for any commercial use or for purpose other than mentioned herein.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I hereby give my consent to Pfizer, Patient Access Program Team or any third party
                  appointed by Pfizer, to conduct audit (including video/audio/physical verification) in relation
                  to the assistance received by the patient under this program including the verification of
                  products dispensed to Patient and I confirm to co-operate and provide such information as is
                  sought by Pfizer/by Patient Access Program Team/third party appointed by Pfizer. In the
                  event of fraudulent disclosures received by Pfizer or Patient Access Program Team or any
                  third party appointed by Pfizer or any intimation of products being misused by any third party,
                  I agree and confirm that Pfizer, Patient Access Program Team or any third party appointed
                  by Pfizer may contact me and that Pfizer reserves the right to take appropriate actions as it
                  deems fit.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I understand accept and acknowledge that Patient shall not be provided assistance in the event
                  Patient fails to complete the video/Audio/physical verification and that the assistance will be
                  provided for approved label indication only.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I hereby consent to the supply and dispatch of the drug assistance under this program by
                  Patient Access Program Team or any other service provider of Pfizer at the address specified by
                  me / Patient under this enrolment form and agree and understand that the drug assistance under
                  this program will be dispatched only to the address for supply of medicine as specified by me /
                  Patient in this form. In the event, if there is any change in the address for supply of
                  medicine, I shall inform the Patient Access Program Team through self-attested letter or
                  an email immediately stating the reason for change along with required supporting documentation
                  for address proof.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I understand that in the absence of providing the aforesaid information in connection with the
                  change of address, Pfizer and Patient Access Program Team will not be in a position to
                  supply the drug assistance as per timelines.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I understand that while Pfizer takes all reasonable efforts to supply/provide product(s) under
                  this program as per the prescription of Patient's Treating Oncologist, Pfizer assumes no
                  responsibility whatsoever including that of any claims, damages and/or compensations on account
                  of any drug supplied to Patient as per the prescription submitted by me / Patient under this
                  program or for any delayed shipments beyond its control. I hereby irrevocably and
                  unconditionally release and discharge Pfizer from all and every claim, liabilities, damages etc.
                  arising out of this Program including any delays in delivery of the product(s).
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I understand that it is critical that in the event of such delay in delivery of the Product, it
                  is my responsibility to bring it to the attention of Patient's Treating Oncologist to ensure
                  continuity of Patients treatment
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I confirm that I am a citizen of India and have the power and authority to sign this form.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I have read the content of this form carefully been explained in detail in a language that I
                  comprehend, have had the opportunity to ask questions and get clarification on them, and have
                  fully understood the contents.
                </span>
              </li>
              
              <li className="flex">
                <span className="mr-2">•</span>
                <span>
                  I grant permission to Pfizer or Patient Access Program Team to contact me or Patient's
                  Health Care Professional (HCP) for any additional information in case of adverse event.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };


// CaregiverConcent Component
function CaregiverConcent() {

  const dispatch = useDispatch();

  function handleClose(){
    dispatch(setCaregiver_enroll_consent(false))
  }

  return (
    <div className="complete-hidden-scroll-style flex grow flex-col gap-4 overflow-y-auto">
    <div className="flex grow flex-col gap-[16px]">
      {/* Render the consent component */}
      <CaregiverConcentTermsCondition />
    </div>
  
    <div className="sticky bg-white py-1  bottom-0 flex flex-col gap-[8px] pt-[12px] font-lato text-[#696969] md:items-end px-4">
      <button
        type="button"
        onClick={handleClose} // Replace this with your actual modal close logic
        className="w-full text-[14px] font-sans font-bold bg-primary text-white py-4 rounded-lg"
        
      >
        <span>close</span>
      </button>
    </div>
  </div>
  
  );
}

export default CaregiverConcent;
