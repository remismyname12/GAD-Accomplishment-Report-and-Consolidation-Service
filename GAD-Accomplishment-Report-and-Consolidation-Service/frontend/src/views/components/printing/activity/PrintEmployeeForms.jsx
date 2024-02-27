import { React } from 'react'
import { TemplateHandler } from 'easy-template-x';
import NeutralButton from '../../buttons/NeutralButton';

export default function PrintEmployeeForms() {

  const file = ('../forms/EmployeeActivityForm.jsx')
  const templateFile = file.blob();

  const data = {PURPOSE: 'Over two years after the enactment and approval of the IRR of the Safe Spaces Act, there is a need to intensify awareness raising on the core provisions of the law, the penalties, and mechanisms in place as the country continue to fight the COVID-19 pandemic which breeds various forms of VAW, especially online with many spending their time in the digital realm. Thus, the 2021 18-Day Campaign to End VAW shall spotlight on RA No. 11313'}
  const handler = new TemplateHandler();
  const doc = handler.process(templateFile, data);
  saveFile('myTemplate - output.docx', doc);

  const saveFile = () => {
    // get downloadable url from the blob
    const blobUrl = URL.createObjectURL(blob);

    // create temp link element
    let link = document.createElement("a");
    link.download = filename;
    link.href = blobUrl;

    // use the link to invoke a download
    document.body.appendChild(link);
    link.click();

    // remove the link
    setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
        link = null;
    }, 0);
  }
  return (
    <div className='App'>
      <div className='header'>React sample</div>
      <NeutralButton label="Preview" onClick={() => saveFile} />
    </div>
  );
};
