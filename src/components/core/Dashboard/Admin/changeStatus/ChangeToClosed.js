import React, { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { changeStatusToClosed } from '../../../../../services/operations/Admin/ModifySetting'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const ChangeToClosed = ({setChangebtn, projectID , rProjects}) => {

    const { token } = useSelector((state) => state.auth);
    const [confirmation,setConfirmation]=useState(false);
    const [closingDate,setClosinDate]=useState("");
    const [pdfFilesReport, setPdfFilesReport] = useState([]);
    const [pdfFilesUC, setPdfFilesUC] = useState([]);


    const handleOnChange = (e) => {
        setClosinDate(e.target.value);
    }

    console.log("printing the date",closingDate);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(closingDate.trim() === "")
        {
            toast.error("Please enter date");
            return;
        }
        const [year, month, day] = closingDate.split('-');
        // console.log("printing the year",parseInt(year));
        if (parseInt(year) < 1950 || parseInt(year) > 2080) {
            toast.error("Enter a year between 1950 and 2080");
            return;
        }
        setConfirmation(true);
      }



      
      const finalSubmit= async ()=>{

        const formDataFinal = new FormData();
        
        let type="";
        if(rProjects)
        {
            type="research";
        }
        else
        {
            type="consultancy";
        } 

        const [year, month, day] = closingDate.split('-');
        formDataFinal.append('closingDate', closingDate);
        formDataFinal.append('year', year);
        formDataFinal.append('type', type);
        formDataFinal.append('projectID', projectID);
        


        // Append each PDF file to the FormData
        pdfFilesReport.forEach((file, index) => {
        formDataFinal.append(`pdfFilesReport`, file);
        });

        // Append each PDF file to the FormData
        pdfFilesUC.forEach((file, index) => {
        formDataFinal.append(`pdfFilesUC`, file);
        });

        // await AddUCResearch(token,formDataFinal);

        // changeStatusToClosed(token,projectID,type,closingDate);
        changeStatusToClosed(token,formDataFinal);
        // setClosinDate("");
        // pdfFilesReport.length=0;
        // formDataFinal.length=0;
    }

      

  return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <div className="flex flex-col gap-y-4 px-12 py-8 w-[900px] mx-auto overflow-hidden bg-white shadow-2xl sm:rounded-lg">
                    {/* <div className="bordyer-b border-gray-900/10 pb-12"></div> */}
                    <h1 className="font-semibold leading-7 text-gray-900">Changing the status of a Project to closed </h1>
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">* The status of the project will be set to Proposed.</p> */}

                    <div className="mt-4 grid grid-cols-1 gap-x-20 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-3 sm:col-start-1 mt-4">
                        <label htmlFor="proposal_date" className="block text-sm font-medium leading-6 text-gray-900">
                            Closing Date
                        </label>
                        <div className="mt-2">
                            <input
                            required
                            id="proposal_date"
                            name="proposal_date"
                            type="date"
                            value={closingDate}
                            placeholder="Enter closing date of the project"
                            onChange={handleOnChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>


                        {rProjects &&
                        <div className="sm:col-span-3 sm:col-start-1">
                            <label htmlFor="pdfFiles" className="block text-sm font-medium leading-6 text-gray-900">
                            Choose final report
                            </label>
                            <div className="mt-2">
                            <label className="flex text-sm w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 text-blue-600 font-medium transition-colors duration-300">
                            <input
                                required
                                id="pdfFiles"
                                name="pdfFiles"
                                type="file"
                                accept="application/pdf"
                                multiple
                                onChange={(e) => setPdfFilesReport(Array.from(e.target.files))}
                                className="sr-only"
                            />
                            <span>Select PDF files</span>
                            </label>
                            {pdfFilesReport.length > 0 ? (
                                <p className="mt-2 text-sm text-gray-600">
                                {pdfFilesReport.length} file(s) selected
                                </p>
                            ): (<p className="mt-2 text-sm text-gray-600">0 files selected</p>)}
                            </div>
                        </div>}




                            {rProjects &&
                            <div className="sm:col-span-3">
                            <label htmlFor="pdfFiles" className="block text-sm font-medium leading-6 text-gray-900">
                            Choose final UC
                            </label>
                            <div className="mt-2">
                            <label className="flex text-sm w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 text-blue-600 font-medium transition-colors duration-300">
                            <input
                                required
                                id="pdfFiles"
                                name="pdfFiles"
                                type="file"
                                accept="application/pdf"
                                multiple
                                onChange={(e) => setPdfFilesUC(Array.from(e.target.files))}
                                className="sr-only"
                            />
                            <span>Select PDF files</span>
                            </label>
                            {pdfFilesUC.length > 0 ? (
                                <p className="mt-2 text-sm text-gray-600">
                                {pdfFilesUC.length} file(s) selected
                                </p>
                            ): (<p className="mt-2 text-sm text-gray-600">0 files selected</p>)}
                            </div>
                        </div>}


                    </div>




                
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>{setChangebtn(false)}}>
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Change
                    </button>
                </div>
                </div>
            </form>




            {/* confirmation dialog box */}
            <Dialog open={confirmation} onClose={() => {}} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Confirmation
                        </DialogTitle>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Are You Sure
                            <br></br>
                                Status will be changed to closed
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        onClick={() => {setConfirmation(false); finalSubmit();}}
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                        Change
                    </button>
                    <button
                        type="button"
                        data-autofocus
                        onClick={() => {setConfirmation(false)}}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                        Cancel
                    </button>
                    </div>
                </DialogPanel>
                </div>
            </div>
            </Dialog>
    </div>
  )
}

export default ChangeToClosed