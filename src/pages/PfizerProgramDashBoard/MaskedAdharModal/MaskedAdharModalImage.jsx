import React from 'react'
import { ReactComponent as Aadhar } from '../../../assets/images/svg/Demo_Aadhar.svg';

function MaskedAadhaarModalImage() {
    console.log("hello worl!!!");
  return (
    <div>
     
     <p className="font-inter text-[32px] font-extrabold align-center text-center py-4">Masked <span className="text-[#CC3300]">Aadhaar</span></p>

    <div className=" flex w-full justify-center pb-10">
        <Aadhar className='w-[70%] max-w-full h-auto object-contain '/>
    </div>
    </div>
  )
}

export default MaskedAadhaarModalImage
