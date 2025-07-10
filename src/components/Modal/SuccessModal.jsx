import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ReactComponent as ModalCloseIcon } from "../../assets/images/svg/modal-close-icon.svg";
import { ReactComponent as ModalBackIcon } from "../../../src/assets/images/svg/back.svg";

function SuccessModal({
  show = true,

  ModalBody,
  type = "side",
}) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className=" h-full "
        >
          <div className="fixed inset-0 bg-black bg-opacity-[.67]" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-100"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-100"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          // className="bg-black"
        >
          <div className="fixed inset-0 overflow-y-auto    ">
            <div
              className={`flex h-full min-h-full grow items-center justify-center text-center   ${
                {
                  side: "md:justify-end",
                  center: "p-[0px]",
                  large: "",
                }[type]
              }`}
            >
              <Dialog.Panel
                className={`relative mx-auto flex h-full min-h-full gap-[0px] w-full  overflow-y-auto  ${
                  {
                    side: "max-w-[498px]",
                    center: "",
                    large: "",
                  }[type]
                }  transform flex-col  overflow-hidden bg-white  text-left align-middle shadow-xl transition-all md:pl-[32px] md:pr-[72px]`}
              >
                <Dialog.Title
                  as="div"
                  className="flex flex-col gap-2 "
                ></Dialog.Title>
                {ModalBody}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default SuccessModal;
