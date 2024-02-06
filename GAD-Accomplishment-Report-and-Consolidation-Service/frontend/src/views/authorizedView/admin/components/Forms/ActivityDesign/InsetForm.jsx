import { React, useState } from 'react'
import Submit from '../../../../../components/buttons/Submit'

export default function InsetForm() {
  const [details, setDetails] = useState({
    title: '',
    purpose: '',
    legalbases: '',
    dateofleadactivity: '',
    venue: '',
    participants: '',
    leraningserviceproviders: '',
    expectedoutputs: '',
    fundsource: '',
  });

  const handleChange = (name) => (ev) => {
    const { value } = ev.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  console.log(details);

  return (
    <div className='bg-gray-300 m-5 p-3'>
      
      <h1 className='text-center'>
        Inset New Lead
      </h1>

      <form action="" className='flex flex-1 flex-col'>
          <label htmlFor="title">Title: </label>
            <input 
              id="title"
              name="title"
              type="text"
              autoComplete="title"
              required
              value={details.title}
              onChange={handleChange}
            />

          <label htmlFor="purpose">Purpose: </label>
            <input 
              id="purpose"
              name="purpose"
              type="text"
              autoComplete="purpose"
              required
              value={details.purpose}
              onChange={handleChange}
            />

          <label htmlFor="legalbases">Legal Bases: </label>
            <input 
              id="legalbases"
              name="legalbases"
              type="text"
              autoComplete="legalbases"
              required
              value={details.legalbases}
              onChange={handleChange}
            />

          <label htmlFor="dateofleadactivity">Date of lead Activity: </label>
            <input 
              id="dateofleadactivity"
              name="dateofleadactivity"
              type="text"
              autoComplete="dateofleadactivity"
              required
              value={details.dateofleadactivity}
              onChange={handleChange}
            />

          <label htmlFor="venue">Venue: </label>
            <input 
              id="venue"
              name="venue"
              type="text"
              autoComplete="venue"
              required
              // value={password}
              // onChange={ev => setPassword(ev.target.value)}
            />

          <label htmlFor="participants">Participants: </label>
            <input 
              id="participants"
              name="participants"
              type="text"
              autoComplete="participants"
              required
              // value={email}
              // onChange={ev => setEmail(ev.target.value)}
            />

          <label htmlFor="leraningserviceproviders">Learning service providers: </label>
            <input 
              id="leraningserviceproviders"
              name="leraningserviceproviders"
              type="text"
              autoComplete="leraningserviceproviders"
              required
              // value={password}
              // onChange={ev => setPassword(ev.target.value)}
            />

          <label htmlFor="expectedoutputs">Expected outputs: </label>
            <input 
              id="expectedoutputs"
              name="expectedoutputs"
              type="text"
              autoComplete="expectedoutputs"
              required
              // value={password}
              // onChange={ev => setPassword(ev.target.value)}
            />

          <label htmlFor="fundsource">Fund Source: </label>
            <input 
              id="fundsource"
              name="fundsource"
              type="text"
              autoComplete="fundsource"
              required
              // value={password}
              // onChange={ev => setPassword(ev.target.value)}
            />
            <div className='mt-5'>
              <Submit label="Submit" /*onClick={onSubmit} disabled={ your condition }*/ />
            </div>
        </form>
    </div>
  )
}
