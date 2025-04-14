import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

// import FabModal from './FabModal';
// import { SelectIsFabButtonOpen, isFabButtonClose } from '../../pages/slice';
import FabModalBody from './FabModalBody';
import { selectIsFabButtonOpen, setIsFabButtonOpen } from '../../slice/patient-detail-form';
import FabModal from '../../components/FabModal';


function FabButtonModal() {
    const isFabButtonOpen = useSelector(selectIsFabButtonOpen); 
    const dispatch = useDispatch(); 
// console.log("hi from fabButton modal");
    function closeModal() {
        dispatch(setIsFabButtonOpen(false)); 
        // console.log("Modal closed");
    }
    // console.log(" is FabButton is open ",isFabButtonOpen);

    return (
        <FabModal
           
            show={isFabButtonOpen}
            closeModal={closeModal}
            ModalBody={<FabModalBody/>} 
            isCloseVisible={true} 
        />
    );
}

export default FabButtonModal;