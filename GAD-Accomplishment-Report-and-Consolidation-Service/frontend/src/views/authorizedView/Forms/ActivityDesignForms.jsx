import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

import EmployeeForm from './ActivityDesign/EmployeeForm';
import InsetForm from './ActivityDesign/InsetForm';
import EADForm from './ActivityDesign/EADForm';

export default function ActivityDesignForms() {

  return (
    <div>
      <div className="w-full h-full px-4">
        <div className="mx-auto w-full max-h-screen max-w-9xl rounded-2xl bg-white p-2 overflow-auto">
          <Tab.Group>
            <Tab.List className="flex p-1 space-x-1 bg-purple-100 rounded-lg">
              <Tab
                className={({ selected }) =>
                  `${selected ? 'bg-purple-200' : 'bg-purple-100'} flex-1 px-4 py-2 text-sm font-medium text-purple-900 rounded-lg focus:outline-none focus:ring`
                }
              >
                Employees Activity Form
              </Tab>
              <Tab
                className={({ selected }) =>
                  `${selected ? 'bg-purple-200' : 'bg-purple-100'} flex-1 px-4 py-2 text-sm font-medium text-purple-900 rounded-lg focus:outline-none focus:ring`
                }
              >
                Inset New Leads Form
              </Tab>
              <Tab
                className={({ selected }) =>
                  `${selected ? 'bg-purple-200' : 'bg-purple-100'} flex-1 px-4 py-2 text-sm font-medium text-purple-900 rounded-lg focus:outline-none focus:ring`
                }
              >
                Extension Activity Design Form
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <EmployeeForm />
              </Tab.Panel>
              <Tab.Panel>
                <InsetForm />
              </Tab.Panel>
              <Tab.Panel>
                <EADForm />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
