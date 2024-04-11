import React from 'react'

export default function NeutralButton({ label, onClick, /*disabled*/ }) {

  return (
    <div>
      <button
        type="button"
        className={`flex w-[100%] justify-center rounded-md bg-primary hover:bg-accent hover:drop-shadow-gs px-3 py-1.5 text-xs xl:text-md font-semibold leading-6 text-white text-center shadow-sm`}
        //disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  )
}
