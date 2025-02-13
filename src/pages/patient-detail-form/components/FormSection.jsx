import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ReactComponent as DropDownIcon } from '../../../assets/images/svg/Form-dropDown-icon.svg';
import { ReactComponent as DropDownTickIcon } from '../../../assets/images/svg/Form-dropDownTick-icon.svg';

const FormSection = ({
  title,
  isSubmitted,
  isDefaultOpen,
  children
}) => {
  
  return (
    <Disclosure
      as="div"
      defaultOpen={isDefaultOpen}
      className="opacity-100 mt-2"
    >
      {({ open, close }) => (
        <>
          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-6 py-6 text-left text-sm font-medium text-black shadow-md hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
            <div className="flex items-center justify-center gap-4">
              <span className="text-base font-bold text-[#283A46] inline-flex items-center">
                {title}
                {/* <span className={`px-6 opacity-100`}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clip-path="url(#clip0_133_870)">
                    <path d="M10 -0.0150146C4.46157 -0.0150146 -0.0148926 4.46145 -0.0148926 9.99991C-0.0148926 15.5384 4.46157 20.0148 10 20.0148C15.5385 20.0148 20.015 15.5384 20.015 9.99991C20.015 4.46145 15.5385 -0.0150146 10 -0.0150146ZM14.8462 7.92299L8.91564 13.8311C8.73085 14.0159 8.50008 14.1079 8.26931 14.1079C8.03854 14.1079 7.78432 14.0159 7.62297 13.8311L4.69243 10.923C4.32283 10.5534 4.32283 9.97646 4.69243 9.60779C5.06203 9.23818 5.63895 9.23818 6.00763 9.60779L8.26935 11.8695L13.5311 6.60774C13.9007 6.23814 14.4776 6.23814 14.8463 6.60774C15.1925 6.97644 15.1925 7.57679 14.8463 7.92294L14.8462 7.92299Z" fill="#A2E7A2" />
                  </g>
                  <defs>
                    <clipPath id="clip0_133_870">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg></span> */}
              </span>
              <DropDownTickIcon
                className={`${isSubmitted ? 'block' : 'hidden'} h-6 w-6`}
              />
            </div>
            <DropDownIcon
              className={`${open ? 'rotate-180 transform' : ''} h-8 w-8`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
            {React.cloneElement(children, { closeAccordion: close })}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default FormSection;
