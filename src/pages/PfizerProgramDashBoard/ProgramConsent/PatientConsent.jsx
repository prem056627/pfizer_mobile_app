import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProgramEnrollmentConsent,
  selectSelectedProgram,
  setCurrentView,
  setDocUploadStatus,
  setProgramEnrollmentConsent,
} from "../../../slice/patient-detail-form";
import { ReactComponent as PfizerLogo } from '../../../assets/images/svg/pfizer_logo.svg';


export const LorbriquaCareConsent = () => {
  return (
    <div className=" bg-white">
      <div>
        {/* <h1 className="pb-2 font-open-sans text-2xl font-semibold text-[#403939]">
                Patient Consent
				</h1> */}
        <h1 className="text-xl font-bold mb-4 pt-4">
          Patient Certification
        </h1>
        <div className="h-1 w-8 rounded-full bg-primary"></div>
      </div>


      <div className="space-y-4 mt-5 concent_form">
        {/* <div className="modal-header">
            <h5 className="modal-title" id="modal-label">Patient Certification</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div> */}
        <div className="modal-body concent_form">
            <ul style={{ textAlign: "justify" }} className="space-y-3">
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I hereby voluntarily agree, consent and authorize Pfizer Products India Private Limited
                        (Pfizer), Lorbriqua Patient
                        Access Program Team - Service provider of Pfizer, or any other third party contracted
                        service provider
                        appointed either by the service provider of Pfizer or by Pfizer directly, in order to
                        receive, collect, upload, use,
                        transfer, possess, store, deal, handle or have access (in physical/electronic form) to
                        the information,
                        communication and documents (including this enrolment form) shared by me or my caretaker
                        as required under Law or
                        otherwise by Pfizer (1) in connection with me availing the benefit and participating in
                        the program,
                        and (il) for the purpose of administration and implementation of the Lorbriqua Patient
                        Access Program, for which I
                        have made this application as well as to:
                    </span>
                </li>
                <ul className="pl-8 space-y-2">
                    <li className="flex">
                        <span className="mr-2">•</span>
                        <span>Contact me for purposes including but not limited to verification of my
                            identity, proof of life,
                            prescription, medical as well as financial status.</span>
                    </li>
                    <li className="flex">
                        <span className="mr-2">•</span>
                        <span>Undertake any verification process for the determination of the genuineness of
                            the information,
                            communication and documents provided by me.</span>
                    </li>
                    <li className="flex">
                        <span className="mr-2">•</span>
                        <span>Send me program-related information in any manner including SMS (one-way) alerts
                            for the program.</span>
                    </li>
                    <li className="flex">
                        <span className="mr-2">•</span>
                        <span>Determine my eligibility to the program and also to provide value added services
                            to me under the program.</span>
                    </li>
                </ul>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I hereby agree, acknowledge and confirm that I am voluntarily signing up for the
                        program and for that purpose
                        consent and agree to undergo the verification process and submit the information,
                        communication and
                        documents as may be required from me from time to time in order to establish my
                        eligibility to avail the benefit and
                        participate in the program.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I agree that this enrolment form as well as UID generation does not guarantee that I
                        shall be admitted into the
                        program and only if this enrolment application is approved, is when my participation in
                        the program
                        will be confirmed.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I hereby agree and understand that my Treating Oncologist's prescription prescribing me
                        the drug for an on-label
                        indication (only) is mandatory for enrolment into and for being eligible for the
                        program. I further agree
                        and understand that the information and documents required under this form to be
                        submitted by me is required for me
                        to avail the benefit of and participate in the program.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I understand that I have the option to opt out of the program at my will and I shall
                        communicate the same to
                        Lorbriqua Patient Access Program Team. I further understand that I have the option to
                        not provide any
                        information or document or verification requested under this form or withdraw my consent
                        provided herein at any time
                        without giving any reason and writing to Lorbriqua Patient Access Program Team. In the
                        event of
                        such a refusal or withdrawal at my end I understand that I will not be entitled to any
                        further assistance under the
                        Lorbriqua Patient Access Program.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I understand not to sell or transfer the assistance received by me/caretaker under the
                        Lorbriqua Patient Access
                        Program to any other party.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        l understand that in the event the assistance provided is no longer required by me due
                        to change in indication or
                        line of treatment by my Treating Oncologist or any other reason, I or any person
                        authorized by me shall intimate the
                        Lorbriqua Patient Access Program Team or any other third party contracted service
                        provider appointed either by the
                        service provider of Pfizer or by Pfizer on the same and return the unused/unutilized
                        assistance received under the
                        Lorbriqua Patient Access Program to the Lorbriqua Patient Access Program Team promptly.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        By signing this enrolment form, I certify and attest that all information given by me to
                        Lorbriqua Patient Access
                        Program Team, or any third party contracted service provider appointed either by the
                        service provider of Pfizer or
                        by
                        Pfizer in the enrolment form, including but not limited to my medical and financial
                        history, current status and
                        documents submitted by me, is complete, true and accurate to the best of my knowledge.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I authorize my caretaker to provide additional information and/or documents to verify my
                        financial or insurance
                        status to Pfizer, Lorbriqua Patient Access Program Team or any third party contracted
                        service provider appointed
                        either
                        by the service provider of Pfizer or by Pfizer to determine my eligiblity to the program
                        and also to provide value
                        added services to me under the program.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I consent to my conversations with Pfizer, Lorbriqua Patient Access Program Team or any
                        third party contracted
                        service provider appointed either by the service provider of Pfizer or by Pfizer being
                        recorded for information and
                        documentation processes in relation to the program.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I consent to Pfizer, Lorbriqua Patient Access Program Team or any other third party
                        contracted service provider
                        appointed either by the service provider of Pfizer or by Pfizer:
                    </span>
                </li>
                <ul className="pl-8 space-y-2">
                    <li className="flex">
                        <span className="mr-2">•</span>
                        <span>
                            For using my de-identified data as well as sharing the same with any government
                            or judicial bodies on
                            consolidated basis to obtain insights about the trends of Patient Access
                            Programs and improving the overall program
                            to provide better services to patients.
                        </span>
                    </li>
                    <li className="flex">
                        <span className="mr-2">•</span>
                        <span>
                            For submitting my identifiable personal and sensitive personal information/data
                            before any government or judicial
                            bodies as and when demanded by the same.
                        </span>
                    </li>
                </ul>

                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I agree to inform immediately Lorbriqua Patient Access Program Team and my Treating
                        Oncologist if my financial or
                        insurance status changes.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I authorize Pfizer, Lorbriqua Patient Access Program Team or any third party contracted
                        service provider appointed
                        either by the service provider of Pfizer or by Pfizer to obtain and access health
                        information from my Treating
                        Oncologist, Insurance Company(s) and Retailer/Stockist from whom I have made purchases
                        for Lorbriqua or other
                        information necessary to complete the application process, to verify the accuracy of any
                        information (including the
                        prescription submitted by me) provided in this enrolment form, and to administer and
                        implement the program and to
                        extend the benefit of the program to me. I hereby authorise my Treating Oncologist to
                        share and provide to Pfizer,
                        Lorbriqua Patient Access Program Team or any other third party contracted service
                        provider appointed either by the
                        service provider of Pfizer or by Pfizer access to information as may be requested by
                        Pfizer, Lorbriqua Patient
                        Access
                        Program Team or any other third party contracted service provider appointed either by
                        the service provider of Pfizer
                        or by Pfizer in connection with this program.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        l understand that Pfizer and Lorbriqua Patient Access Program Team has the right to
                        revise, change, assign or
                        terminate this program (and the assistance provided) at any tire without notice and in
                        such an event I consent to my
                        information being transferred accordingly for the purposes of receiving uninterrupted
                        assistance.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I hereby agree that in case the information provided by me in this form is found to be
                        incorrect, inaccurate or
                        false, I shall be liable to indemnify Pfizer for the same and I understand that my
                        enrolment shall be removed from
                        this
                        program.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I understand that my personal identified information would not be sold or rented or
                        exchanged for any commercial use
                        or for purpose other than mentioned herein.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I hereby give my consent to Pfizer, Lorbriqua Patient Access Program Team or any third
                        party contracted service
                        provider appointed either by the service provider of Pfizer or by Pfizer, to conduct
                        audit (including
                        video/audio/physical
                        verification) in relation to the assistance received by the patient under this program
                        including the verification of
                        products dispensed to me and I confirm to co-operate and provide such information as is
                        sought by Pfizer or by
                        Lorbriqua Patient Access Program Team or any third party contracted service provider
                        appointed either by the service
                        provider of Pfizer or by Pfizer. In the event of fraudulent disclosures received by
                        Pfizer or Lorbriqua Patient
                        Access
                        Program Team or any third party appointed by Pfizer or any intimation of products being
                        misused by any third party,
                        I agree and confirm that Pfizer, Lorbriqua Patient Access Program Tear or any third
                        party appointed by Pfizer may
                        contact me and that Pfizer reserves the right to take appropriate actions as it deems
                        fit.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I understand, accept and acknowledge that I shall not be provided assistance in the
                        event I fail to complete the
                        video/audio/physical verification and that the assistance will be provided for approved
                        label indication only.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I hereby consent to the supply and dispatch of the drug assistance under this program by
                        Pfizer, Lorbriqua Patient
                        Access Program Team or any other third party contracted service provider appointed
                        either by the service provider
                        of Pfizer or by Pfizer at the address specified by me under this enrolment form and
                        agree and understand that the
                        drug assistance under this program will be dispatched only to the address for supply of
                        medicine as specified by me
                        in this form. in the event, if there is any change in the address for supply of
                        medicine, I shall inform the
                        Lorbriqua Patient Access Program Team through sell attested letter or an email
                        immediately stating the reason for
                        change along
                        with required supporting documentation for address proof.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I understand that in the absence of providing the aforesaid information in connection
                        with the change of address,
                        Pfizer and Lorbriqua Patient Access Program Team will not be in a position to supply the
                        drug assistance as per
                        timelines
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I understand that while Pfizer takes all reasonable efforts to supply/provide products)
                        under this program as per
                        the prescription of my Treating Oncologist, Pfizer assumes no responsibility whatsoever
                        including that of any
                        claims,
                        damages and/or compensations on account of any drug supplied to me as per the
                        prescription submitted by me under
                        this program or for any delayed shipments beyond its control. I hereby irrevocably and
                        unconditionally release
                        and discharge Pfizer from all and every claim, liabilities, damages etc. arising out of
                        this Program including any
                        delays in delivery of the products).
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I understand that it is critical that in the event of such delay in delivery of the
                        Product, it is my responsibility
                        to bring it to the attention of my Treating Oncologist to ensure continuity of my
                        treatment.
                    </span>
                </li>
                <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                        I have read the content of this form carefully have been explained in detail in a
                        language that I comprehend, have
                        had the opportunity to ask questions and get certification on them, and have fully
                        understood the contents.
                    </span>
                </li>
            </ul>

            <p>&nbsp;</p>
  <p style={{ textAlign: 'left' }}>
    1 MG Technologies Pvt. Ltd.<br />
    5<sup>th</sup> floor, Block B, Presidency Tower, 46/4 Mehrauli Road, Opp. Govt. Girl's College, Anamika Enclave, Sector 14, Gurugram, Haryana – 122001<br />
    Toll Free: 1800 258 7008 | Email ID : access@mediangels.com
  </p>

  <p style={{ textAlign: 'left' }}>
    &#174; Trademark Proprietor: Pfizer Inc., USA Licensed User: Pfizer Products India Private Limited, India <br />
    Full Prescribing Information Available on Request
    <br />
    <span style={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
      <span>
        <PfizerLogo/>
        {/* <img width={78} height={35} src="{% zstatic 'patient_certification_pfizer.png' %}" alt="Pfizer logo" /> */}
      </span>
      <span style={{ marginLeft: '10px' }}>
        Pfizer Products India Private Limited, The Capital-B Wing, 1802, 18<sup>th</sup> floor, Plot No. C-70, G Block, Bandra – Kurla Complex, Bandra (East), Mumbai – 400 051, India
      </span>
    </span>
  </p>

  <p>&nbsp;</p>
        </div>
    
    </div>
    </div>
  );
};

export const CrizalkProgramConsent = () => {
  return (
    <div className="consent-container">
      <div className="pb-5">
        <h1 className="text-xl font-bold mb-4 pt-4">
          Patient Certification
        </h1>
        <div className="h-1 w-8 rounded-full bg-primary"></div>
      </div>

      <div className="space-y-4 concent_form">
        <ul className="list-disc pl-6 space-y-3 text-justify">
          <li>
            I hereby voluntarily agree, consent and authorize Pfizer Products India Private Limited (Pfizer), Crizalk Patient
            Access Program Team - Service provider of Pfizer, or any other third party contracted service provider appointed
            either by the service provider of Pfizer or by Pfizer directly, in order to receive, collect, upload, use,
            transfer, possess, store, deal, handle or have access (in physical/electronic form) to the information,
            communication and documents (including this enrolment form) shared by me or my caretaker as required under Law or
            otherwise by Pfizer (1) in connection with me availing the benefit and participating in the program, and (ii) for
            the purpose of administration and implementation of the Crizalk Patient Access Program, for which I have made this
            application as well as to:
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                Contact me for purposes including but not limited to verification of my identity, proof of life,
                prescription, medical as well as financial status.
              </li>
              <li>
                Undertake any verification process for the determination of the genuineness of the information,
                communication and documents provided by me.
              </li>
              <li>
                Send me program-related information in any manner including SMS (one-way) alerts for the program.
              </li>
              <li>
                Determine my eligibility to the program and also to provide value added services to me under the program.
              </li>
            </ul>
          </li>
          <li>
            I hereby agree, acknowledge and confirm that I am voluntarily signing up for the program and for that purpose
            consent and agree to undergo the verification process and submit the information, communication and documents as may
            be required from me from time to time in order to establish my eligibility to avail the benefit and participate in
            the program.
          </li>
          <li>
            I agree that this enrolment form as well as UID generation does not guarantee that I shall be admitted into the
            program and only if this enrolment application is approved, is when my participation in the program will be confirmed.
          </li>
          <li>
            I hereby agree and understand that my Treating Oncologist's prescription prescribing me the drug for an on-label
            indication (only) is mandatory for enrolment into and for being eligible for the program. I further agree and
            understand that the information and documents required under this form to be submitted by me is required for me
            to avail the benefit of and participate in the program.
          </li>
          <li>
            I understand that I have the option to opt out of the program at my will and I shall communicate the same to Crizalk
            Patient Access Program Team. I further understand that I have the option to not provide any information or document or
            verification requested under this form or withdraw my consent provided herein at any time without giving any reason
            and writing to Crizalk Patient Access Program Team. In the event of such a refusal or withdrawal at my end I understand
            that I will not be entitled to any further assistance under the Crizalk Patient Access Program.
          </li>
          <li>
            I understand not to sell or transfer the assistance received by me/caretaker under the Crizalk Patient Access
            Program to any other party.
          </li>
          <li>
            I understand that in the event the assistance provided is no longer required by me due to change in indication or
            line of treatment by my Treating Oncologist or any other reason, I or any person authorized by me shall intimate the
            Crizalk Patient Access Program Team or any other third party contracted service provider appointed either by the
            service provider of Pfizer or by Pfizer on the same and return the unused/unutilized assistance received under the
            Crizalk Patient Access Program to the Crizalk Patient Access Program Team promptly.
          </li>
          <li>
            By signing this enrolment form, I certify and attest that all information given by me to Crizalk Patient Access
            Program Team, or any third party contracted service provider appointed either by the service provider of Pfizer or
            by Pfizer in the enrolment form, including but not limited to my medical and financial history, current status and
            documents submitted by me, is complete, true and accurate to the best of my knowledge.
          </li>
          <li>
            I authorize my caretaker to provide additional information and/or documents to verify my financial or insurance
            status to Pfizer, Crizalk Patient Access Program Team or any third party contracted service provider appointed either by
            the service provider of Pfizer or by Pfizer to determine my eligibility to the program and also to provide value
            added services to me under the program.
          </li>
          <li>
            I consent to my conversations with Pfizer, Crizalk Patient Access Program Team or any third party contracted service
            provider appointed either by the service provider of Pfizer or by Pfizer being recorded for information and
            documentation processes in relation to the program.
          </li>
          <li>
            I consent to Pfizer, Crizalk Patient Access Program Team or any other third party contracted service provider
            appointed either by the service provider of Pfizer or by Pfizer:
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                For using my de-identified data as well as sharing the same with any government or judicial bodies on
                consolidated basis to obtain insights about the trends of Patient Access Programs and improving the overall program
                to provide better services to patients.
              </li>
              <li>
                For submitting my identifiable personal and sensitive personal information/data before any government or judicial
                bodies as and when demanded by the same
              </li>
            </ul>
          </li>
          <li>
            I agree to inform immediately Crizalk Patient Access Program Team and my Treating Oncologist if my financial or
            insurance status changes.
          </li>
          <li>
            I authorize Pfizer, Crizalk Patient Access Program Team or any third party contracted service provider appointed
            either by the service provider of Pfizer or by Pfizer to obtain and access health information from my Treating
            Oncologist, Insurance Company(s) and Retailer/Stockist from whom I have made purchases for Crizalk or other information
            necessary to complete the application process, to verify the accuracy of any information (including the prescription
            submitted by me) provided in this enrolment form, and to administer and implement the program and to extend the
            benefit of the program to me. I hereby authorise my Treating Oncologist to share and provide to Pfizer, Crizalk
            Patient Access Program Team or any other third party contracted service provider appointed either by the service provider of
            Pfizer or by Pfizer access to information as may be requested by Pfizer, Crizalk Patient Access Program Team or
            any other third party contracted service provider appointed either by the service provider of Pfizer or by Pfizer in
            connection with this program.
          </li>
          <li>
            I understand that Pfizer and Crizalk Patient Access Program Team has the right to revise, change, assign or
            terminate this program (and the assistance provided) at any time without notice and in such an event I consent to my
            information being transferred accordingly for the purposes of receiving uninterrupted assistance.
          </li>
          <li>
            I hereby agree that in case the information provided by me in this form is found to be incorrect, inaccurate or
            false, I shall be liable to indemnify Pfizer for the same and I understand that my enrolment shall be removed from
            this program.
          </li>
          <li>
            I understand that my personal identified information would not be sold or rented or exchanged for any commercial use
            or for purpose other than mentioned herein.
          </li>
          <li>
            I hereby give my consent to Pfizer, Crizalk Patient Access Program Team or any third party contracted service
            provider appointed either by the service provider of Pfizer or by Pfizer, to conduct audit (including
            video/audio/physical verification) in relation to the assistance received by the patient under this program
            including the verification of products dispensed to me and I confirm to co-operate and provide such information as is
            sought by Pfizer or by Crizalk Patient Access Program Team or any third party contracted service provider appointed
            either by the service provider of Pfizer or by Pfizer. In the event of fraudulent disclosures received by Pfizer or
            Crizalk Patient Access Program Team or any third party appointed by Pfizer or any intimation of products being misused
            by any third party, I agree and confirm that Pfizer, Crizalk Patient Access Program Team or any third party
            appointed by Pfizer may contact me and that Pfizer reserves the right to take appropriate actions as it deems fit.
          </li>
          <li>
            I understand, accept and acknowledge that I shall not be provided assistance in the event I fail to complete the
            video/audio/ physical verification and that the assistance will be provided for approved label indication only.
          </li>
          <li>
            I hereby consent to the supply and dispatch of the drug assistance under this program by Pfizer, Crizalk Patient
            Access Program Team or any other third party contracted service provider appointed either by the service provider of
            Pfizer or by Pfizer at the address specified by me under this enrolment form and agree and understand that the drug
            assistance under this program will be dispatched only to the address for supply of medicine as specified by me
            in this form. In the event, if there is any change in the address for supply of medicine, I shall inform the Crizalk
            Patient Access Program Team through self-attested letter or an email immediately stating the reason for change along
            with required supporting documentation for address proof.
          </li>
          <li>
            I understand that in the absence of providing the aforesaid information in connection with the change of address,
            Pfizer and Crizalk Patient Access Program Team will not be in a position to supply the drug assistance as per
            timelines.
          </li>
          <li>
            I understand that while Pfizer takes all reasonable efforts to supply/provide product(s) under this program as per
            the prescription of my Treating Oncologist, Pfizer assumes no responsibility whatsoever including that of any claims,
            damages and/or compensations on account of any drug supplied to me as per the prescription submitted by me under
            this program or for any delayed shipments beyond its control. I hereby irrevocably and unconditionally release
            and discharge Pfizer from all and every claim, liabilities, damages etc. arising out of this Program including any
            delays in delivery of the product(s).
          </li>
          <li>
            I understand that it is critical that in the event of such delay in delivery of the Product, it is my responsibility
            to bring it to the attention of my Treating Oncologist to ensure continuity of my treatment.
          </li>
          <li>
            I have read the content of this form carefully have been explained in detail in a language that I comprehend, have
            had the opportunity to ask questions and get clarification on them, and have fully understood the contents.
          </li>
        </ul>
  <p style={{ textAlign: 'left' }}>
    1 MG Technologies Pvt. Ltd.<br />
    5<sup>th</sup> floor, Block B, Presidency Tower, 46/4 Mehrauli Road, Opp. Govt. Girl's College, Anamika Enclave, Sector 14, Gurugram, Haryana – 122001<br />
    Toll Free: 1800 258 7008 | Email ID : access@mediangels.com
  </p>

  <p style={{ textAlign: 'left' }}>
    &#174; Trademark Proprietor: Pfizer Inc., USA Licensed User: Pfizer Products India Private Limited, India <br />
    Full Prescribing Information Available on Request
    <br />
    <span style={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
      <span>
        <PfizerLogo/>
        {/* <img width={78} height={35} src="{% zstatic 'patient_certification_pfizer.png' %}" alt="Pfizer logo" /> */}
      </span>
      <span style={{ marginLeft: '10px' }}>
        Pfizer Products India Private Limited, The Capital-B Wing, 1802, 18<sup>th</sup> floor, Plot No. C-70, G Block, Bandra – Kurla Complex, Bandra (East), Mumbai – 400 051, India
      </span>
    </span>
  </p>

  <p>&nbsp;</p>
      </div>
    </div>
  );
};


export const PalbaceProgramConsent = () => {
  return (
    <div className="consent-container">
      <div className="pb-5">
        <h1 className="text-xl font-bold mb-4 pt-4">Patient Certification</h1>
        <div className="h-1 w-8 rounded-full bg-primary"></div>
      </div>

      <div className="space-y-4 concent_form">
        <ul className="list-disc pl-5 space-y-2 text-justify">
          <li>
            I hereby voluntarily agree, consent and authorize Pfizer Product India
            Private Limited (Pfizer), Prerna Patient Access Program Team - Service provider
            of Pfizer which includes TATA 1MG Private Limited, Rx Consultants Private
            Limited or any other service provider appointed by Pfizer to receive, collect,
            upload/store, use, transfer, possess, store, deal, evaluate, handle or have
            access (in physical/electronic form) to the information, communication and
            documents (including this enrollment form, identity, address and financial
            documents) shared by me or my Caretaker(s) or other family members as required
            under Law or otherwise by Pfizer
            <br />
            (i) in connection with me availing the benefit and participating in the
            program, and
            <br />
            (ii) for the purpose of administration and implementation of the Prerna Patient
            Access Program, for which I have made this application as well as to:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                Contact me for purposes including but not limited to verification of my
                identity, proof of life, prescription, medical as well as financial status.
              </li>
              <li>
                Undertake any verification process for the determination of the genuineness
                of the information, validate financial records, communication and documents
                provided by me.
              </li>
              <li>
                Send me program-related information in any manner including sending me SMS
                (one-way) alerts for the program.
              </li>
              <li>
                Determine my eligibility to the appropriate Patient Access Program and to
                provide value added services to me under the program by undertaking
                inquiries we deem appropriate to evaluate and satisfy ourselves about any
                information either provided by you or available to us from any other source
                including obtaining information from banks, reference schemes or credit
                information and to provide any such information to them. We may exchange or
                share any information with respect to your account with our affiliates or
                business partners for the purpose of verification or determining
                eligibility, or as required by law.
              </li>
            </ul>
          </li>

          <li>
            I hereby agree, acknowledge, and confirm that I am voluntarily signing up for
            the program and for that purpose consent and agree to undergo the verification
            process and submit the information, communication and documents as may be
            required for me from time to time to establish my eligibility to avail the
            benefit and participate in the program.
          </li>

          <li>
            I agree that this enrolment form as well as UID generation does not guarantee
            that I shall be admitted into the program and only if this enrolment
            application is approved is when my participation in the program will be
            confirmed.
          </li>

          <li>
            I hereby agree and understand that my Treating Oncologist's prescription
            prescribing me the drug for an on-label indication (only) is mandatory for
            enrolment into and for being eligible for the program. I further agree and
            understand that the information and documents required under this form to be
            submitted by me is required for me to avail the benefit of and participate in
            the program.
          </li>

          <li>
            I understand that I have the option to opt out of the program at my will and I
            shall communicate the same to Prerna Patient Access Program Team. I further
            understand that I have the option to not provide any information or document,
            or verification requested under this form or withdraw my consent provided
            herein at any time without giving any reason and writing to Prerna Patient
            Access Program Team. In the event of such a refusal or withdrawal at my end I
            understand that I will not be entitled to any further assistance under the
            Prerna Patient Access Program.
          </li>

          <li>
            I understand not to sell or transfer the assistance received by me/Caretaker
            under the Prerna Patient Access Program to any other party.
          </li>

          <li>
            I understand that in the event the assistance provided is no longer required by
            me due to change in indication or line of treatment by my Treating Oncologist
            or any other reason, I or any person authorized by me shall intimate the Prerna
            Patient Access Program Team or any other service provider appointed by Pfizer
            on the same and return the unused/unutilized assistance received under the
            Prerna Patient Access Program to the Prerna Patient Access Program Team
            promptly.
          </li>

          <li>
            By signing this enrolment form, I certify and attest that all information given
            by me to Prerna Patient Access Program Team in the enrolment form, including
            but not limited to my medical and financial history status and documents
            submitted by me, is complete, true and accurate to the best of my knowledge.
          </li>

          <li>
            I authorize my caretakers to provide additional information and/or documents to
            verify my financial or insurance status, to Pfizer, Prerna Patient Access
            Program Team or any service provider appointed by Pfizer to determine my
            eligibility to the program and to provide value added services to me under the
            program.
          </li>

          <li>
            I consent to my conversations with Pfizer, Prerna Patient Access Program Team,
            any third party appointed by Pfizer being recorded for information and
            documentation processes in relation to the program.
          </li>

          <li>
            I consent to Pfizer, Prerna Patient Access Program Team, or any other servicer
            provider of Pfizer:
          </li>

          <li>
            Using my de-identified data as well as sharing the same with any government or
            judicial bodies on consolidated basis to obtain insights about the trends of
            Patient Access Programs and improving the overall program to provide better
            services to patients.
          </li>

          <li>
            Submitting my identifiable personal and sensitive personal information/data
            before any government or judicial bodies as and when demanded by the same.
          </li>

          <li>
            I agree to inform immediately Prerna Patient Access Program Team and my
            Treating Oncologist if my financial or insurance status changes.
          </li>

          <li>
            I authorize Pfizer, Prerna Patient Access Program Team or any other service
            provider appointed by Pfizer to obtain and access health information from my
            Treating Oncologist, Insurance Company(s) and Retailer/Stockiest from whom I
            have made purchases for Palbace® or other information necessary to complete the
            application process, to verify the accuracy of any information (including the
            prescription submitted by me) provided in this enrolment form, and to
            administer and implement the program and to extend the benefit of the program
            to me. I hereby authorize my Treating Oncologist to share and provide to
            Pfizer, Prerna Patient Access Program Team or any other service provider
            appointed by Pfizer access to information as may be requested by Pfizer, Prerna
            Patient Access Program Team or any other service provider appointed by Pfizer
            in connection with this program.
          </li>

          <li>
            I understand that Pfizer and Prerna Patient Access Program Team has the right
            to revise, change, assign or terminate this program (and the assistance
            provided) at any time without notice and in such an event I consent to my
            information being transferred accordingly for the purposes of receiving
            uninterrupted assistance.
          </li>

          <li>
            I hereby agree that in case the information provided by me in this form is
            found to be incorrect, inaccurate or false, I shall be liable to indemnify
            Pfizer for the same and I understand that my enrolment shall be removed from
            this program.
          </li>

          <li>
            I understand that my personal identified information would not be sold or
            rented or exchanged for any commercial use or for purpose other than mentioned
            herein.
          </li>

          <li>
            I hereby give my consent to Pfizer, Prerna Patient Access Program Team or any
            third party appointed by Pfizer, to conduct audit (including
            video/audio/physical verification) in relation to the assistance received by
            the patient under this program including the verification of products dispensed
            to me and I confirm to co-operate and provide such information as is sought by
            Pfizer/by Prerna Patient Access Program Team/third party appointed by Pfizer.
            In the event of fraudulent disclosures received by Pfizer or Prerna Patient
            Access Program Team or any third party appointed by Pfizer or any intimation of
            products being misused by any third party, I agree and confirm that Pfizer,
            Prerna Patient Access Program Team or any third party appointed by Pfizer may
            contact me and that Pfizer reserves the right to take appropriate actions as it
            deems fit.
          </li>
          <li>
      I understand accept and acknowledge that I shall not be provided assistance in the event I fail to complete the video/Audio/physical verification and that the assistance will be provided for approved label indication only.
    </li>
    <li>
      I hereby consent to the supply and dispatch of the drug assistance under this program by Prerna Patient Access Program Team or any other service provider of Pfizer at the address specified by me under this enrolment form and agree and understand that the drug assistance under this program will be dispatched only to the address for supply of medicine as specified by me in this form. In the event, if there is any change in the address for supply of medicine, I shall inform the Prerna Patient Access Program Team through self-attested letter or an email immediately stating the reason for change along with required supporting documentation for address proof.
    </li>
    <li>
      I understand that in the absence of providing the aforesaid information in connection with the change of address, Pfizer and Prerna Patient Access Program Team will not be in a position to supply the drug assistance as per timelines.
    </li>
    <li>
      I understand that while Pfizer takes all reasonable efforts to supply/provide product(s) under this program as per the prescription of my Treating Oncologist, Pfizer assumes no responsibility whatsoever including that of any claims, damages and/or compensations on account of any drug supplied to me as per the prescription submitted by me under this program or for any delayed shipments beyond its control. I hereby irrevocably and unconditionally release and discharge Pfizer from all and every claim, liabilities, damages etc. arising out of this Program including any delays in delivery of the product(s).
    </li>
    <li>
      I understand that it is critical that in the event of such delay in delivery of the Product, it is my responsibility to bring it to the attention of my Treating Oncologist to ensure continuity of my treatment.
    </li>
    <li>
      I confirm that I am a citizen of India and have the power and authority to sign this form.
    </li>
    <li>
      I have read the content of this form carefully been explained in detail in a language that I comprehend, have had the opportunity to ask questions and get clarification on them, and have fully understood the contents.
    </li>
    <li>
      You grant permission to Pfizer or Prerna Patient Access program Team to contact you or my Health Care Professional (HCP) for any additional information in case of adverse event. If you do not wish to be contacted, please drop an email to <a href="mailto:access@mediangels.com" className="highlight_text">access@mediangels.com</a>
    </li>

          <div>
 

  <p>&nbsp;</p>
  <p>For patient leaflet, please click below:</p>

  <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed', overflowWrap: 'break-word' }}>
    <tbody>
      <tr>
        <td style={{ border: '1px solid black', padding: '16px' }}>
          <p><b>Palbace</b> (Palbociclib Capsules 75 mg, 100 mg &amp; 125 mg)</p>
        </td>
        <td style={{ border: '1px solid black', padding: '16px' }}>
          <p>
            <a
              href="https://labeling.pfizer.com/ShowLabeling.aspx?id=16265"
              className="highlight_text reactnative_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://labeling.pfizer.com/ShowLabeling.aspx?id=16265
            </a>
          </p>
        </td>
      </tr>
      <tr>
        <td style={{ border: '1px solid black', padding: '16px' }}>
          <p><b>Palbace</b> (Palbociclib Tablets 75 mg, 100 mg &amp; 125 mg)</p>
        </td>
        <td style={{ border: '1px solid black', padding: '16px' }}>
          <p>
            <a
              href="https://labeling.pfizer.com/ShowLabeling.aspx?id=16266"
              className="highlight_text reactnative_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://labeling.pfizer.com/ShowLabeling.aspx?id=16266
            </a>
          </p>
        </td>
      </tr>
    </tbody>
  </table>

  <p>&nbsp;</p>
  <p style={{ textAlign: 'left' }}>
    1 MG Technologies Pvt. Ltd.<br />
    5<sup>th</sup> floor, Block B, Presidency Tower, 46/4 Mehrauli Road, Opp. Govt. Girl's College, Anamika Enclave, Sector 14, Gurugram, Haryana – 122001<br />
    Toll Free: 1800 258 7008 | Email ID : access@mediangels.com
  </p>

  <p style={{ textAlign: 'left' }}>
    &#174; Trademark Proprietor: Pfizer Inc., USA Licensed User: Pfizer Products India Private Limited, India <br />
    Full Prescribing Information Available on Request
    <br />
    <span style={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
      <span>
        <PfizerLogo/>
        {/* <img width={78} height={35} src="{% zstatic 'patient_certification_pfizer.png' %}" alt="Pfizer logo" /> */}
      </span>
      <span style={{ marginLeft: '10px' }}>
        Pfizer Products India Private Limited, The Capital-B Wing, 1802, 18<sup>th</sup> floor, Plot No. C-70, G Block, Bandra – Kurla Complex, Bandra (East), Mumbai – 400 051, India
      </span>
    </span>
  </p>

  <p>&nbsp;</p>
</div>

        </ul>
      </div>
    </div>
  );
};


// PatientConsent Component
function PatientConsent({
  formik,
  label = "Agree",
  theme = "normal",
  allowDisabled = false,
}) {
  const dispatch = useDispatch();

  const handleRequest = () => {
    dispatch(setProgramEnrollmentConsent({  consent: false }));
    dispatch(setCurrentView("home"));
    dispatch(setDocUploadStatus("scheme_enroll_doc"));
  };

  const selectedProgram = useSelector(selectProgramEnrollmentConsent);
  // console.log("selectedProgram", selectedProgram?.program?.program_name);

  const Program_name = selectedProgram?.program?.program_name;
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };

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

      <div className="sticky bottom-0 flex flex-col gap-[8px] py-2 bg-white   font-lato text-[#696969] md:items-endpx-4 ">
        <button
          type="submit"
          className={`  w-full text-[14px] font-sans font-bold bg-primary text-white py-4 rounded-lg`}
          disabled={
            allowDisabled && formik ? !(formik.isValid && formik.dirty) : false
          }
        >
          <span>{label}</span>
        </button>
      </div>
    </form>
  );
}

export default PatientConsent;
