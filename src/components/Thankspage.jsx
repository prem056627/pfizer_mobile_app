import React from 'react'
import GenerateReportBtn from './Buttons/GenerateReportBtn'
import ViewSubmittedBtn from './Buttons/ViewSubmittedBtn'

function Thankspage() {
    return (
        <div className='flex flex-col items-center justify-center gap-6 mt-20 px-6 h-screen bg-[#FBFCFF pb-80'>
            <div>
                <h4 className='text-3xl font-open-sans text-primary font-bold'>Thank you !</h4>
            </div>

            <div className='animate-enter'>

                <svg className='' xmlns="http://www.w3.org/2000/svg" width="80" height="79" viewBox="0 0 74 73" fill="none">
                    <circle cx="37" cy="36.5" r="36.5" fill="#0BB7B3" fill-opacity="0.2" />
                    <path d="M37 22C41.1109 22 45.0533 23.5804 47.9602 26.3934C50.867 29.2064 52.5 33.0218 52.5 37C52.5 40.9782 50.867 44.7936 47.9602 47.6066C45.0533 50.4196 41.1109 52 37 52C32.8891 52 28.9467 50.4196 26.0398 47.6066C23.133 44.7936 21.5 40.9782 21.5 37C21.5 33.0218 23.133 29.2064 26.0398 26.3934C28.9467 23.5804 32.8891 22 37 22ZM35.0691 39.9593L31.6259 36.625C31.5025 36.5055 31.3559 36.4108 31.1947 36.3461C31.0334 36.2815 30.8605 36.2482 30.686 36.2482C30.5114 36.2482 30.3385 36.2815 30.1773 36.3461C30.016 36.4108 29.8694 36.5055 29.746 36.625C29.4967 36.8663 29.3567 37.1935 29.3567 37.5346C29.3567 37.8758 29.4967 38.203 29.746 38.4443L34.1303 42.6871C34.2534 42.8072 34.3998 42.9025 34.5611 42.9675C34.7225 43.0326 34.8955 43.066 35.0702 43.066C35.245 43.066 35.418 43.0326 35.5794 42.9675C35.7407 42.9025 35.8871 42.8072 36.0102 42.6871L45.0888 33.8993C45.2139 33.7803 45.3134 33.6386 45.3816 33.4822C45.4498 33.3258 45.4853 33.158 45.4861 32.9882C45.4869 32.8185 45.453 32.6503 45.3863 32.4934C45.3196 32.3364 45.2215 32.1937 45.0976 32.0737C44.9736 31.9536 44.8263 31.8584 44.6642 31.7937C44.5021 31.729 44.3283 31.696 44.153 31.6966C43.9776 31.6971 43.8041 31.7313 43.6424 31.7971C43.4807 31.863 43.3341 31.9591 43.2111 32.08L35.0691 39.9593Z" fill="#0BB7B3" />
                    <circle cx="37" cy="36.5" r="24.5" fill="#0BB7B3" fill-opacity="0.3" />
                </svg>
            </div>

            <div className='flex flex-col items-center gap-2'>
                <h4 className='text-lg font-bold text-[#595454]'>Form Submitted Successfully!</h4>
                <p className='text-lg text-[#595454] max-w-[568px] text-center'>Your form has been successfully submitted. You can now download or view your submitted form for your reference.</p>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-center gap-8 mt-8'>
                    <GenerateReportBtn />
                    <ViewSubmittedBtn />
            </div>
        </div>
    )
}

export default Thankspage