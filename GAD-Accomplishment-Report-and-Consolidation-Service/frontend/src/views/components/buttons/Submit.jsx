import React from 'react'

export default function Submit({ label, onClick, /*disabled*/ }) {

  return (
    <div>
      <button
        type="submit"
        className={`flex w-[100%] justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400`}
        //disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  )
}
