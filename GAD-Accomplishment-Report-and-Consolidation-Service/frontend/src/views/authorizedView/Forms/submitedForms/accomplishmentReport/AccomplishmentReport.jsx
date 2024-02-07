import { React, useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import axiosClient from '../../../../axios/axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AccomplishmentReport() {
  const [employeeForms, setEmployeeForms] = useState([]);
  const [insetForms, setInsetForms] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);
  
  const fetchForms = async () => {
    try {
      const employeeFormData = await axiosClient.get('/show_form_employee');
      const insetFormData = await axiosClient.get('/show_form_inset');
      if (employeeFormData.data) {
        setEmployeeForms(employeeFormData.data);
      }
      if (insetFormData.data) {
        setInsetForms(insetFormData.data);
      } 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className="w-full max-w-md px-2 py-5 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              key="Employee"
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Employee
            </Tab>
            <Tab
              key="Inset"
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Inset
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-2">
            
          <h1>AccomplishmentReport</h1>
            <Tab.Panel
              key="Employee"
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {employeeForms.map((form) => (
                  <li
                  key={form.id}
                  className="relative rounded-md p-3 hover:bg-gray-100"
                >
                  <h3 className="text-sm font-medium leading-5">
                    Title
                  </h3>

                  <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                    <li>{form.title}</li>
                  </ul>

                    <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel
              key="Inset"
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {insetForms.map((form) => (
                  <li
                    key={form.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      Title
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{form.title}</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
