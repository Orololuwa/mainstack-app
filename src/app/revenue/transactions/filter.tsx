import { Fragment } from "react";
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import { CloseIcon } from "mainstack-library";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterDrawer({ isOpen, onClose }: DrawerProps) {
  return (
    <>
      <Transition
        as={Fragment}
        show={isOpen}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-gray-500/30 transition-opacity"
          onClick={onClose}
        />
      </Transition>
      <Transition
        show={isOpen}
        enter="transform transition ease-in-out duration-500"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 overflow-hidden right-0 flex max-w-full px-2 rounded-3xl">
                <DialogPanel className="pointer-events-auto w-screen max-w-md py-4">
                  <div className="flex h-full flex-col overflow-y-scroll overflow-x-hidden bg-white rounded-3xl shadow-lg scrollbar-hide">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <DialogTitle className="text-lg font-semibold">
                          Filter
                        </DialogTitle>
                        <button
                          type="button"
                          className="rounded-md text-gray-400 hover:text-gray-500"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close panel</span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                    <div className="relative flex-1 px-4 sm:px-6">
                      ...filters
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
