import { React, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import ActivityDesign from './activityForms/ActivityDesign';

export default function SubmitedForms() {
  const [selectedForm, setSelectedForm] = useState(null);
    
  return (
    <div>
        <div className="rounded-2xl bg-white p-2 mt-3">
        <ActivityDesign />
        </div>
    </div>
  )
}
