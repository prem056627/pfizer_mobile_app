import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { ReactComponent as ModalCloseIcon } from '../../src/assets/images/svg/FabButton/Fab_close_icon.svg';
export default function FabModal({

	show = true,
	closeModal,
	isCloseVisible = true,
	ModalBody,
	type = 'side',
}) {


	return (
	

			<Transition appear show={show} as={Fragment}>
				<Dialog as="div" className="relative z-50 w-full " onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/50 " />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto  w-full">
						<div className="relative flex w-full min-h-full items-end justify-center p-4 text-center ">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
                                className="w-full"
							>
								<div className=' relative '>
									{isCloseVisible ? (
										<div className="absolute right-0 top-0  flex justify-end  ">
											<button
												type="button"
												className="absolute right-[02px] top-[-45px] z-0 flex justify-end focus:outline-none"
												onClick={closeModal}
											>
												<ModalCloseIcon />
											</button>
										</div>
									) : null}

									<Dialog.Panel className=" w-full transform overflow-hidden rounded-lg bg-white p-4 sm:p-6  text-left align-middle shadow-xl transition-all">
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900 "
										>
									
										</Dialog.Title>
										{ModalBody}
									</Dialog.Panel>
								</div>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
	
	);
}