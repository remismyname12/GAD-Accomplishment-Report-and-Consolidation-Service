import React from 'react'

export default function Submit() {

  return (
    <div>
        <button
            type="submit"
            className={`flex w-[100%] justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400`}
            //disabled={attempts === 3 && countdown > 0} // Disable the button when attempts are 3 and countdown is not zero
            //onClick={onSubmit}
        >
            Sign in
        </button>
    </div>
  )
}
