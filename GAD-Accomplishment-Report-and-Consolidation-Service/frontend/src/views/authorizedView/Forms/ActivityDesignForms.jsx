import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

import EmployeeForm from './ActivityDesign/EmployeeForm';
import InsetForm from './ActivityDesign/InsetForm';
import EADForm from './ActivityDesign/EADForm';

export default function ActivityDesignForms() {
  const [selectedForm, setSelectedForm] = useState(null);

  return (
    <div>
      <div className="w-full px-4 pt-16">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span>Select the type of form</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  <div className="flex flex-col">
                    <button onClick={() => setSelectedForm('employee')}>
                      Employees Activity Form
                    </button>
                    <button onClick={() => setSelectedForm('inset')}>
                      Inset New Leads Form
                    </button>
                    <button onClick={() => setSelectedForm('ead')}>
                      Extension Activity Design Form
                    </button>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>

      {/**Type of Forms */}
      <div>
        {selectedForm === 'employee' && <EmployeeForm />}
        {selectedForm === 'inset' && <InsetForm />}
        {selectedForm === 'ead' && <EADForm />}
      </div>
    </div>
  );
}
