import { React, useState} from 'react'
import axiosClient from '../../../../../axios/axios';

//For Feedback
import Feedback from '../../../../../components/feedbacks/Feedback';
import Error from '../../../../../components/feedbacks/Error';

export default function SetMandateModal({closeModal, reportList, n_mandate}) {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(true);
  const [mandateSelected, setMandateSelected] = useState("1");

  console.log('List: ', reportList);
  console.log('Mandate: ', n_mandate);

  const handleYes = () => {
    handleSave();
    closeModal();
  }

  const handleSetMandates = async (ev) => {
    ev.preventDefault();
    axiosClient.put('/setmandates', {
      reportList: reportList,
      mandate_id: mandateSelected
    })
        .then(response => {
            console.log('Success:', response.data);
            setMessage(response.data.message);
            setSuccess(response.data.success);
        })
  }

  return (
    <div className='h-full grid'>
    
      <Feedback isOpen={message !== ''} onClose={() => setSuccess('')} successMessage={message}  status={success}/>
        <div className='text-center'>
          <strong className="text-2xl">Set GAD Mandate</strong>
        </div>
        <br></br>
        <form onSubmit={handleSetMandates}>
          <div className="mb-5"> 
                  <table className="w-full border border-gray-300">
                    <thead>
                      <tr className='border border-gray-300'>
                        <th>Accomplisment Report Title</th>
                        <th>Current Mandate</th>
                      </tr>
                    </thead>
                    <tbody>
                    {reportList.map((item, index) => (
                      <tr key={index}>
                        <td className='text-center'>{item.title}</td>
                        <td className='text-center'>{item.mandates_id}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
          </div>
          <strong className='pt-1'>
            Assign to:
          </strong>
          <div className='mb-2'>
          <select
            className='w-full border border-gray-300'
            onChange={(e) => setMandateSelected(e.target.value)}
          >
            {n_mandate.map((mandate, index) => (
              <option key={index} value={mandate.id}>
                {mandate.id}) {mandate.gender_issue}
              </option>
            ))}
          </select>
          </div>
          <div id="decision" className='text-center space-x-3'>
            <button type="submit" className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size">
              Confirm
            </button>
            <button type="button" onClick={closeModal} className="bg-red-600 hover:bg-red-700 rounded-2xl  px-7 py-2 text-white font-size">
              Cancel
            </button>
          </div>
        </form>
    </div>
  )
}
