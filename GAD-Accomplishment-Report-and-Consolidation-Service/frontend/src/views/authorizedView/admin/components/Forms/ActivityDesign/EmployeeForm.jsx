import React from 'react'
import Submit from '../../../../../components/buttons/Submit'

export default function EmployeeForm() {
  return (
    <div className='bg-gray-300 m-5 p-3'>
      
      <h1 className='text-center'>
        Employee Activity Form
      </h1>

      <form action="" className='flex flex-1 flex-col'>
          <label htmlFor="title">Title: </label>
            <input 
              id="title"
              name="title"
              type="text"
              autoComplete="title"
              required
              // value={email}
              // onChange={ev => setEmail(ev.target.value)}
            />

          <label htmlFor="purpose">Purpose: </label>
            <input 
              id="purpose"
              name="purpose"
              type="text"
              autoComplete="purpose"
              required
              // value={password}
              // onChange={ev => setPassword(ev.target.value)}
            />

          <label htmlFor="legalbases">Legal Bases: </label>
            <input 
              id="legalbases"
              name="legalbases"
              type="text"
              autoComplete="legalbases"
              required
              // value={password}
              // onChange={ev => setPassword(ev.target.value)}
            />

          <label htmlFor="dateofactivity">Date of Activity: </label>
            <input 
              id="dateofactivity"
              name="dateofactivity"
              type="text"
              autoComplete="dateofactivity"
              required
              // value={password}
              // onChange={ev => setPassword(ev.target.value)}
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

          <label htmlFor="nooftargetparticipants">Number of target participants: </label>
            <input 
              id="nooftargetparticipants"
              name="nooftargetparticipants"
              type="text"
              autoComplete="nooftargetparticipants"
              required
              // value={password}
              // onChange={ev => setPassword(ev.target.value)}
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
