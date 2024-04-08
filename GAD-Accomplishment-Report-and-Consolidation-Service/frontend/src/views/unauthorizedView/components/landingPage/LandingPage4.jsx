import React, { useState } from 'react';

export default function LandingPage4() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      content: (
        <div>
          <h1 className='text-4xl font-bold mb-4'>
            I. Learning & Development
          </h1>
          <ul className='text-2xl list-disc list-inside text-left'>
            <li>Gender Sensitivity Training (GST)</li>
            <li>GAD Planning and Budgeting (GPB)</li>
            <li>Gender Mainstreaming in various Thematic areas</li>
            <li>Gender Analysis (GA)</li>
            <li>GAD Agenda Formulation</li>
            <li>GA Tools (HGDG/ GMEF/ GeRL)</li>
          </ul>
        </div>
      )
    },
    {
      content: (
        <div>
          <h1 className='text-4xl font-bold mb-4'>
            II. Technical Assistance through Gender Responsive Extension Program (GREP)
          </h1>
        </div>
      )
    },
    {
      content: (
        <div>
          <h1 className='text-4xl font-bold mb-4'>
            III. Gender Responsive Research Program (GRRP)
          </h1>
        </div>
      )
    },
    {
      content: (
        <div>
          <h1 className='text-4xl font-bold mb-4'>
            IV. Establishment/ Maintenance of Gender Responsive Facility
          </h1>
          <ul className='text-2xl list-disc list-inside text-left'>
            <li>Breast feeding/ Lactation Room</li>
            <li>Child Minding Center</li>
          </ul>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className='overflow-hidden h-screen flex items-center justify-center relative'>
      <div className={'flex items-center justify-center w-[70%]'}>
        {slides[activeSlide].content}
      </div>
      
      <div className='absolute inset-x-0 bottom-4 flex items-center justify-center'>
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`mx-1 w-4 h-4 rounded-full bg-gray-400 ${activeSlide === index ? 'bg-accent' : ''}`}
          ></button>
        ))}
      </div>

      <div className='absolute inset-0 flex items-center justify-between p-4'>
        <button
          className='bg-primary h-screen w-[10%] bg-opacity-30 hover:bg-opacity-100'
          onClick={prevSlide}
        >
          Prev
        </button>
        <button
          className='bg-primary h-screen w-[10%] bg-opacity-30 hover:bg-opacity-100'
          onClick={nextSlide}
        >
          Next
        </button>
      </div>
    </div>
  );
}
