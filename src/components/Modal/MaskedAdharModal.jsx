import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function MaskedAdharModal({
    label,
    backBtnLabel,
    labelType = '',
    show = true,
    closeModal,
    backModal,
    isCloseVisible = false,
    isBackVisible = false,
    ModalBody,
    type = 'side',
    isScroll = true,
}) {


   
    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog 
                as="div"
                className="relative z-50"
                onClose={() => {}}
            >
                {/* Background with opacity transition */}
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-80"
                    leave="transition-opacity duration-200"
                    leaveFrom="opacity-80"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black px-5" />
                </Transition.Child>

                {/* Modal Container */}
                <div className="fixed inset-0 flex items-center justify-center">
                    <Transition.Child
                        as={Fragment}
                        enter="transition-transform duration-300"
                        enterFrom="scale-95 opacity-0"
                        enterTo="scale-100 opacity-100"
                        leave="transition-transform duration-200"
                        leaveFrom="scale-100 opacity-100"
                        leaveTo="scale-95 opacity-0"
                    >
                        <Dialog.Panel className="w-full max-w-md mx-4 transform overflow-hidden rounded-[22px] bg-white shadow-xl transition-all">
                            {/* Header */}
                            <div className="relative px-6 py-6 border-b bg-[#F6F6F6]">
                                <Dialog.Title className="text-[20px] font-sans font-bold text-[#3B3B3B]">
                                    {label}
                                </Dialog.Title>

                                {isCloseVisible && (
                                    <button
                                        onClick={closeModal}
                                        className="absolute right-6 top-6 text-[#3B3B3B] hover:text-gray-500"
                                    >
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Content */}
                            <div className="pt-6">
                                {ModalBody}
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

export default MaskedAdharModal;
