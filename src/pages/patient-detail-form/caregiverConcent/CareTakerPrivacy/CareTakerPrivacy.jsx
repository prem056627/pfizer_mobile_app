import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCaregiver_enroll_consent_privacy } from "../../../../slice/patient-detail-form";

export const CaregiverConcentPrivacy = () => {
    return (
      <div className="bg-white">
        <div>
          {/* <h1 className="pb-2 font-open-sans text-2xl font-semibold text-[#403939]">
                  Patient Consent
                  </h1> */}
          <h1 className="text-xl font-bold mb-4 pt-4">
            Privacy Policy caretaker
          </h1>
          <div className="h-1 w-8 rounded-full bg-primary"></div>
        </div>
  
        <div className="space-y-4 mt-5 concent_form">
          <div className="modal-body">
            <ul style={{ textAlign: "justify", listStyleType: "none" }}>
              <li>
                Please read this privacy policy carefully. By accessing or using
                the website, you agree to be bound by the terms described herein
                and all the terms incorporated by reference. If you do not agree
                to all of these terms, we request you to not proceed with the
                usage of the website:
              </li>
  
              <li className="boldText mt-4">
                <strong>1. Content & Purpose</strong>
              </li>
              
              <li><span className="list-spacing">1. This privacy policy ("Privacy Policy") applies to your use of
                  the domain name access.mediangels.com, an internet based portal
                  for the PAP program, owned and operated by TATA 1 MG
                  Technologies Private Limited (formerly known as 1 MG
                  Technologies Private Limited), a company duly incorporated under
                  the provisions of the Companies Act, 2013 (hereinafter, referred
                  to as "We" or "Our" or "Us" or "Company"). The domain name and
                  the mobile application are collectively referred to as "Website"</span></li>
              <li><span className="list-spacing">2. The Website is a platform that facilitates the patient
                  assistance program (PAP Program) services for patients
                  (hereinafter referred to as "Services"). The Services would be
                  made available to such natural persons who have agreed to become
                  Users on the Website after obtaining due registration, in
                  accordance with the procedure as determined by "Us" from time to
                  time (referred to as "You" or "Your" or "Yourself" or "User",
                  which terms shall also include natural persons who are accessing
                  the Website merely as visitors).</span></li>
              <li><span className="list-spacing">3. We have implemented reasonable security practices and
                  procedures that are commensurate with the information assets
                  being protected and with the nature of our business. While we
                  try our best to provide security that is commensurate with the
                  industry standards, because of the inherent vulnerabilities of
                  the internet, we cannot ensure or warrant complete security of
                  all information that is being transmitted to us by you.</span></li>
              <li><span className="list-spacing">4. For the purpose of providing the Services and for other
                  purposes identified in this Privacy Policy, Company will be
                  required to collect and host certain data and information of the
                  Users. Company is committed to protecting the Personal
                  Information of the Users and takes all reasonable precautions
                  for maintaining confidentiality of the User's Personal
                  Information. This Privacy Policy has been designed and developed
                  to help you understand the following:</span></li>
  
              <div className="boldText">
                <li><span className="list-spacing">i. The type of Personal Information (including Sensitive
                    Personal Data or Information) that Company collects from the
                    Users;</span>
                </li>
        
                <li><span className="list-spacing">
                    ii. The purpose of collection, means and modes of usage of
                    such Personal Information by the Company;</span>
                </li>
                <li><span className="list-spacing">
                    iii. How and to whom the Company will disclose such information
                    post user's consent on sharing the information;</span>
                </li>
                <li><span className="list-spacing">
                    iv. How Company will protect the Personal Information
                    including Sensitive Personal Data or Information that is
                    collected from the Users; and</span>
                </li>
                <li><span className="list-spacing">
                    v. How Users may access and/ or modify, delete their Personal
                    Information.</span>
                </li>
              </div>
              
              <li><span className="list-spacing">
                  5. This Privacy Policy shall apply to the use of the Website by
                  all Users. Accordingly, a condition of each User's use of and
                  access to the Website and to the other services provided by the
                  Company to Users is their acceptance of this Privacy policy. Any
                  User is required to read and understand the provisions set out
                  herein prior to submitting any Sensitive Personal Data or
                  Information to the Company, failing which they are required to
                  leave the Website immediately.</span>
              </li>
                         
              <li className="mt-4">
                <span className="boldText">
                  <strong>2. What is the personal information?</strong>
                </span>
                
                <li><span className="list-spacing">
                    1. "Personal Information" means any information that relates to
                    a natural person, which, either directly or indirectly, in
                    combination with other information available with the Company,
                    is capable of identifying the person concerned.</span>
                </li>
                <li><span className="list-spacing">
                    2. "Sensitive Personal Data or Information" means Personal
                    Information of any individual relating to physical,
                    physiological and mental health condition; sexual orientation;
                    medical records and history; biometric information; any detail
                    relating to the above as provided to or received by the Company
                    for processing or storage. However, any data/ information
                    relating to an individual that is freely available or accessible
                    in public domain or furnished under the Right to Information
                    Act, 2005 or any other law shall not qualify as Sensitive
                    Personal Data or Information.</span>
                </li>
              </li>
             
              <li className="mt-4">
                <span className="boldText">
                  <strong>3. Types of personal information collected by the Company:</strong>
                </span>
                    
                <li><span className="list-spacing">
                    1. A User may have limited access to the Website and utilize
                    some of the Services provided by the Company without creating an
                    account on the Website. Unregistered Users can access some of
                    the information and details available on the Website. In order
                    to have access to all the features and benefits on our Website,
                    a User may be required to first create an account on our Website
                    and enroll into the PAP Program. As part of the registration
                    process, the Company may collect the following categories of
                    Personal Information from the Users (hereinafter collectively
                    referred to as "User Information"):</span>
                </li>
                <ul className="list-spacing">
                  <li style={{ textAlign: "justify", listStyleType: "none" }}><span className="boldText">
                      i. Name;</span>
                  </li>
                  <li style={{ textAlign: "justify", listStyleType: "none" }}><span className="boldText">
                      ii. User ID;</span>
                  </li>
                  <li style={{ textAlign: "justify", listStyleType: "none" }}><span className="boldText">
                      iii. Email address;</span>
                  </li>
                  <li style={{ textAlign: "justify", listStyleType: "none" }}><span className="boldText">
                      iv. Address (including country and ZIP/postal code);</span>
                  </li>
                  <li style={{ textAlign: "justify", listStyleType: "none" }}><span className="boldText">
                      v. Gender;</span>
                  </li>
                  <li style={{ textAlign: "justify", listStyleType: "none" }}><span className="boldText">
                      vi. Age;</span>
                  </li>
                  <li style={{ textAlign: "justify", listStyleType: "none" }}><span className="boldText">
                      vii. Phone Number;</span>
                  </li>
                  <li style={{ textAlign: "justify", listStyleType: "none" }}><span className="boldText">
                      viii. Password chosen by the User;</span>
                  </li>
                  <li style={{ textAlign: "justify", listStyleType: "none" }}><span className="boldText">
                      ix. Other details as the User may volunteer</span>
                  </li>
                </ul>
                <li><span className="list-spacing">
                    2. In order to avail the Services, the Users may be required to
                    upload copies of their prescriptions, on the Website and/ or
                    e-mail the same to Us in accordance with the Terms of Use and
                    the prescriptions will be stored/ disclosed only in the manner
                    specified in this Privacy Policy and the Terms of Use. The term
                    "User Information" shall also include any such prescriptions
                    uploaded or otherwise provided by Users.</span>
                </li>
                <li><span className="list-spacing">
                    3. Company may keep records of telephone calls received and made
                    for making inquiries, orders, or other purposes for the purpose
                    of administration of Services.</span>
                </li>
                <li><span className="list-spacing">
                    4. <span className="boldText">Internet use: Company </span> may also receive and/or hold
                    information about the User's browsing history including the
                    Internet Protocol (IP) address of each User's computer (or the
                    proxy server a User used to access the World Wide Web), User's
                    computer operating system and type of web browser the User is
                    using as well as the name of User's ISP. The Website uses
                    temporary cookies to store certain data (that is not Sensitive
                    Personal Data or Information) that is used by the Company and its
                    service providers for the technical administration of the
                    Website, research and development, and for User administration.</span>
                </li>
                <li><span className="list-spacing">
                    5. Company does not knowingly collect Personal Information from
                    children.</span>
                </li>
                <li><span className="list-spacing">
                    6. Company may in future include other optional requests
                    for information from the User including through user surveys in
                    order to help the Company customize the Website to deliver
                    personalized information to the User and for other purposes are
                    mentioned herein. Any such additional Personal Information will
                    also be processed in accordance with this Privacy Policy.</span>
                </li>
              </li>
                              
              <li className="mt-4">
                <span className="boldText">
                  <strong>4. Purposes for which your information may be used by us:</strong>
                </span>
                <li><span className="list-spacing">
                    1. Company will retain User Information only to the extent it is
                    necessary to provide Services to the Users. The information
                    which We collect from you may be utilized for various business
                    and/or regulatory purposes including for the following purposes:</span>
                </li>
                
                <li><span className="list-spacing">
                    i. Registration of the User on the Website and the PAP
                    Program;</span>
                </li>
                <li><span className="list-spacing">
                    ii. Registration of the User on the Website and the PAP
                    Program(including provision of safe Services);</span>
                </li>
                <li><span className="list-spacing">iii. Enable Tata Group Entities and Partners to offer their
                    products and/or services and communicate with you about such
                    products and/or services;</span></li>
                <li><span className="list-spacing">iv. Processing, disclosing, transmitting, and/or sharing the
                    data/information with Tata Group Entities, and other third
                    parties which have business or contractual dealings with us;</span></li>
                <li><span className="list-spacing">v. Technical administration and customization of Website;</span></li>
                <li><span className="list-spacing">vi. Ensuring that the Website content is presented to the
                    Users in an effective manner;</span></li>
                <li><span className="list-spacing">vii. Delivery of personalized information to the User;</span></li>
                <li><span className="list-spacing">viii. Improvement of Services, features and functionality of
                    the Website;</span></li>
                <li><span className="list-spacing">ix. Research and development and for User administration
                    (including conducting user surveys);</span></li>
                <li><span className="list-spacing">x. Dealing with requests, enquiries, complaints or disputes
                    and other customer care related activities including those
                    arising out of the Users' request of the Services and all
                    other general administrative and business purposes;</span></li>
                <li><span className="list-spacing">xi. Communicate any changes in our Services or this Privacy
                    Policy or the Terms of Use to the Users;</span></li>
                <li><span className="list-spacing">xii. Verification of identity of Users and perform checks to
                    prevent frauds; and</span></li>
                <li><span className="list-spacing">xiii. Investigating, enforcing, resolving disputes and
                    applying our Terms of Use and Privacy Policy, either ourselves
                    or through third party service providers.</span></li>
              </li>
                              
              <li className="mt-4">
                <span className="boldText">
                  <strong>5. Disclosure and transfer of your personal information:</strong>
                </span>
                  
                <li><span className="list-spacing">1. We may need to disclose/ transfer User's Personal Information
                    to the following third parties for the purposes mentioned in
                    this Privacy Policy and the Terms of Use:</span></li>
                          
                <li><span className="list-spacing">
                    i. To other service providers appointed by the Company for the
                    purpose of carrying out services on Our behalf under contract.
                    Generally these contractors do not have any independent right
                    to share this information, however certain contractors who
                    provide services on the Website, including the providers of
                    online communications services, will have rights to use and
                    disclose the Personal Information collected in connection with
                    the provision of these services in accordance with their own
                    privacy policies.</span>
                </li>
                <li><span className="list-spacing">
                    ii. <span className="boldText">Tata Group Entities:</span> We
                    may make available to you products, services and /or
                    applications of Tata Group Entities, to assist them to reach out
                    to you in relation to their programs or campaigns and to process
                    your queries and requests. Accordingly, we may share your
                    Personal Information with Tata Group Entities. We may also share
                    your Data with the Tata Group Entities as is relevant for the
                    purposes set out in Clause 4 above, and to facilitate the
                    operation of our business.</span>
                </li>
                <li><span className="list-spacing">
                    iii.
                    <span className="boldText">Tata Consumer Platform: </span>
                    Your Personal Information may be shared with Tata Group Entities
                    and other participating entities on the Tata Consumer Platform
                    operated by Tata Digital Limited ("TCP") for purposes of
                    enrolment, offering you products, services and benefits on the
                    TCP. Accordingly, we may share your Data with other Tata Group
                    Entities, Partners and Service Providers and as a part of this
                    unification your account information across several Tata
                    Companies may be merged, to offer You a single login for
                    seamless experience.</span>
                </li>
                          
                <li><span className="list-spacing">
                    iv. To our affiliates in India who may use and disclose your
                    information for the same purposes as us.</span>
                </li>
                <li><span className="list-spacing">
                    v. To government institutions/ authorities to the extent
                    required a) under the laws, rules, and regulations and/ or
                    under orders of any relevant judicial or quasi-judicial
                    authority; b) to protect and defend the rights or property of
                    the Company; c) to fight fraud and credit risk; d) to enforce
                    the Company's Terms of Use (to which this Privacy Policy is
                    also a part) ; or e) when the Company, in its sole discretion,
                    deems it necessary in order to protect its rights or the
                    rights of others.</span>
                </li>
                <li><span className="list-spacing">
                    vi. If otherwise required by an order under any law for the
                    time being in force including in response to enquiries by
                    Government agencies for the purpose of verification of
                    identity, or for prevention, detection, investigation
                    including cyber incidents, prosecution, and punishment of
                    offences.</span>
                </li>
                          
                <li><span className="list-spacing">
                    2. Company makes all User Information accessible to its
                    employees and data processors only on a need-to-know basis. All
                    Company employees and data processors, who have access to, and
                    are associated with the processing of User Information, are
                    obliged to respect its confidentiality.</span>
                </li>
                <li><span className="list-spacing">
                    3. Company may also disclose or transfer the User Information,
                    to another third party as part of reorganization or a sale of
                    the assets or business of a Tata 1 MG corporation division or
                    company. Any third party to which Company transfers or sells its
                    assets will have the right to continue to use the Personal
                    Information and/ or other information that a User provide to us.</span>
                </li>
              </li>
                              
              <li className="mt-4">
                <span className="boldText">
                  <strong>6. Retention of the information:</strong>
                </span>
                                 
                <li><span className="list-spacing">
                    1. All the information collected/ stored under this Privacy
                    Policy and Terms of Use is maintained by Us in electronic form
                    on its equipment, and on the equipment of its employees. User
                    Information may also be converted to physical form from time to
                    time. Regardless of the manner of storage, Company will keep all
                    User Information confidential and will use/ disclose it only the
                    manner specified under the Privacy Policy and Terms of Use.</span>
                </li>
                <li><span className="list-spacing">
                    2. Company will also ensure that User Information is not kept
                    for a period longer than is required for the purposes for which
                    it is collected or as required under any applicable law.</span>
                </li>
              </li>
                              
              <li className="mt-4">
                <span className="boldText">
                  <strong>7. Security practices and procedures:</strong>
                </span>
                  
                <li><span className="list-spacing">
                    1. Company adopts reasonable security practices and procedures
                    to include, technical, operational, managerial and physical
                    security control measures in order to protect the Personal
                    Information in its possession from loss, misuse and unauthorized
                    access, disclosure, alteration and destruction.</span>
                </li>
                <li><span className="list-spacing">
                    2. Company takes adequate steps to ensure that third parties to
                    whom the Users' Sensitive Personal Data or Information may be
                    transferred adopt reasonable level of security practices and
                    procedures to ensure security of Personal Information.</span>
                </li>
                <li><span className="list-spacing">
                    3. You hereby acknowledge that Company is not responsible for
                    any intercepted information sent via the internet, and you
                    hereby release us from any and all claims arising out of or
                    related to the use of intercepted information in any
                    unauthorized manner.</span>
                </li>
              </li>
                          
              <li className="mt-4">
                <span className="boldText">
                  <strong>8. User's rights in relation to their personal information
                  collected by us:</strong>
                </span>
                                
                <li><span className="list-spacing">
                    1. All the information provided to Company by a User, including
                    Sensitive Personal Data or Information, is voluntary. User has
                    the right to withdraw his/ her/ its consent at any time, in
                    accordance with the terms of this Privacy Policy and the Terms
                    of Use, but please note that withdrawal of consent will not be
                    retroactive.</span>
                </li>
                <li><span className="list-spacing">
                    2. Users can access, modify, correct and delete the Personal
                    Information provided by them which has been voluntarily given by
                    the User and collected by Company in accordance with this
                    Privacy Policy and Terms of Use. However, if the User updates
                    his/ her information, We may keep a copy of the information
                    which User originally provided to Company in its archives for
                    User documented herein. In case the User seeks to update or
                    correct, his/ her Personal Information, the User may exercise
                    these rights by emailing Company at empower@mediangels.com and
                    communicate the change(s) for updating Company records.</span>
                </li>
                <li><span className="list-spacing">
                    3. If a User, as a casual visitor, has inadvertently browsed any
                    other pages of this Website prior to reading the Privacy Policy
                    and the Terms of Use, and such User does not agree with the
                    manner in which such information is obtained, stored or used,
                    merely quitting this browser application should ordinarily clear
                    all temporary cookies installed by Company. All visitors,
                    however, are encouraged to use the clear cookies functionality
                    of their browsers to ensure such clearing/ deletion, as Company
                    cannot guarantee, predict or provide for the behavior of the
                    equipment of all the visitors of the Website.</span>
                </li>
                <li><span className="list-spacing">
                    4. If a User has inadvertently submitted any Personal
                    Information to Company prior to reading the Privacy Policy and
                    Terms of Use, and such User does not agree with the manner in
                    which such information is collected, stored or used, then such
                    User can ask Us by sending an email
                    empower@mediangels.com containing the rectification required,
                    whether Company is keeping Personal Information about such User,
                    and every User is also entitled to require Company to delete and
                    destroy all such information relating to such user (but not
                    other Users) in its possession.</span>
                </li>
                <li><span className="list-spacing">
                    5. In case the User does not provide his/ her information or
                    consent for usage of Personal Information or subsequently
                    withdraws his/ her consent for usage of the Personal Information
                    so collected, We reserve the right to discontinue the services
                    for which the said information was sought.</span>
                </li>
              </li>
                          
              <li className="mt-4">
                <span className="boldText">
                  <strong>9. Additional notes to the user:</strong>
                </span>
                  
                <li><span className="list-spacing">
                    1. Company shall not be responsible in any manner for the
                    authenticity of the Personal Information or Sensitive Personal
                    Data or Information supplied by the User to Us. If a User
                    provides any information that is untrue, inaccurate, not current
                    or incomplete (or becomes untrue, inaccurate, not current or
                    incomplete), or Company has reasonable grounds to suspect that
                    such information is untrue, inaccurate, not current or
                    incomplete, Company has the right to suspend or terminate such
                    account at its sole discretion.</span>
                </li>
                <li><span className="list-spacing">
                    2. Company shall not be responsible for any breach of security
                    or for any actions of any third parties that receive Users'
                    Personal Information or events that are beyond the reasonable
                    control of Company including, acts of government, computer
                    hacking, unauthorized access to computer data and storage
                    device, computer crashes, breach of security and encryption,
                    etc.</span>
                </li>
                <li><span className="list-spacing">
                    3. The User is responsible for maintaining the confidentiality
                    of the User's account access information and password, if
                    applicable. The User shall be responsible for all uses of the
                    User's account and password, whether or not authorized by the
                    User. The User shall immediately notify Us of any actual or
                    suspected unauthorized use of the User's account or password.</span>
                </li>
                <li><span className="list-spacing">
                    4. Company will communicate with the Users through email and
                    notices posted on the Website or through other means available
                    through the Service, including text and other forms of
                    messaging. The Users can ask Us, by sending an email
                    to empower@mediangels.com containing the rectification required.</span>
                </li>
              </li>
                          
              <li className="mt-4">
                <span className="boldText">
                  <strong>10. Changes in the privacy policy:</strong>
                </span>
                  
                <li><span className="list-spacing">
                    1. Company may update this Privacy Policy at any time, with or
                    without advance notice. In the event there are significant
                    changes in the way Company treats User's Personal Information,
                    We will display a notice on the Website or send Users an email.
                    If a User uses the Service after notice of changes have been
                    sent to such User or published on the Website, such User hereby
                    provides his/ her/ its consent to the changed practices.</span>
                </li>
              </li>
                              
              <li className="mt-4">
                <span className="boldText">
                  <strong>11. Complaints and grievance redressal:</strong>
                </span>
                  
                <li><span className="list-spacing">
                    1. Company addresses discrepancies and grievances of all Users
                    with respect to processing of information in a time bound
                    manner. For this purpose, Company has designated Mr. Jehan Jit
                    Singh as the grievance officer, who will redress the grievances
                    of the Users expeditiously but within one month from the date of
                    receipt of grievance, and who can be reached by:</span>
                
                  <li className=" font-bold list-spacing">
                    i. Sending a letter marked to the attention of Grievance
                    Officer, Tata 1mg to Level 3, Vasant Square Mall, Pocket V,
                    Sector B, Vasant Kunj, New Delhi-110070, or
                  </li>
                  <li className=" font-bold list-spacing">
                    ii. Sending an email to access@mediangels.com
                  </li>
                </li>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

function CareTakerPrivacy() {

  const dispatch = useDispatch();

  function handleClose(){
    dispatch(setCaregiver_enroll_consent_privacy(false))
  }

  return (
    <div className="complete-hidden-scroll-style flex grow flex-col gap-4 overflow-y-auto">
    <div className="flex grow flex-col gap-[16px]">
      {/* Render the consent component */}
      <CaregiverConcentPrivacy />
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

export default CareTakerPrivacy;
