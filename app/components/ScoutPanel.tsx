/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { Scout, Data, Ids } from "types";

export default function ScoutPanel({
  scout,
  isOpen,
  close,
  data,
  ids,
}: {
  scout: Scout;
  isOpen?: boolean;
  close: () => void;
  data: Data;
  ids: Ids;
}) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog onClose={close}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Scout Info
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                            onClick={close}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div className="divide-y divide-gray-200 border-t-4 border-sky-600">
                      <div className="pb-6">
                        <div className="flow-root px-4 sm:flex sm:items-end">
                          <div className="mt-6 sm:flex-1">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                {scout["Scout Name"]}
                              </h3>

                              {scout.Den && scout.Den[0] && (
                                <p className="text-sm text-gray-500">
                                  {data.dens[scout.Den[0]].Name}
                                </p>
                              )}
                              <p>
                                {scout["Status"] === "Potential" && (
                                  <span className="mr-2 inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                    Potential Scout
                                  </span>
                                )}
                                {scout["Tags"]?.map((tag) => (
                                  <span
                                    key={tag}
                                    className="mr-2 inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-5 sm:px-0 sm:py-0">
                        <dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                          <div className="sm:flex sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                              School
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                              {scout.School}
                            </dd>
                          </div>
                          <div className="sm:flex sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                              Last Health Form
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                              {scout["Health form"] || "None"}
                            </dd>
                          </div>
                          {scout.Notes && (
                            <div className="sm:flex sm:px-6 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Notes
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                {scout.Notes}
                              </dd>
                            </div>
                          )}
                        </dl>
                        <h3 className="py-8 font-medium text-gray-900 sm:border-t sm:border-gray-200 sm:py-5 sm:px-6">
                          Parents:
                        </h3>
                        {scout.Parents?.map((parentId) => {
                          const parent = data.adults[parentId];
                          return (
                            <dl
                              key={parentId}
                              className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:border-t-2 sm:border-sky-500"
                            >
                              <div className="sm:flex sm:px-6 sm:py-5">
                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                  Name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                  {parent["Name"]}
                                </dd>
                              </div>
                              {parent["Email"] && (
                                <div className="sm:flex sm:px-6 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                    {parent["Email"]}
                                  </dd>
                                </div>
                              )}

                              {parent["Phone"] && (
                                <div className="sm:flex sm:px-6 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                    Phone
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                    {parent["Phone"]}
                                  </dd>
                                </div>
                              )}

                              {parent["Phone Alt"] && (
                                <div className="sm:flex sm:px-6 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                    Phone Alt
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                    {parent["Phone Alt"]}
                                  </dd>
                                </div>
                              )}

                              {parent["Address"] && (
                                <div className="sm:flex sm:px-6 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                    Address
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                    {parent["Address"]}
                                  </dd>
                                </div>
                              )}

                              {parent["Notes"] && (
                                <div className="sm:flex sm:px-6 sm:py-5">
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                    Notes
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                    {parent["Notes"]}
                                  </dd>
                                </div>
                              )}
                            </dl>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
