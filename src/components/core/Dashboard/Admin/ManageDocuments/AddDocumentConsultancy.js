import React, { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { getAllConsultancyProjectsDeatils } from '../../../../../services/operations/Admin/GetData';
import { AddDocumentInExistingConsultancyProject } from '../../../../../services/operations/Admin/AddSettings';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const AddDocumentConsultancy = () => {

    const { token } = useSelector((state) => state.auth);
    const [allConsulatncyProjectData,setAllConsultancyProjectData]=useState([]);
    const [confirmation,setConfirmation]=useState(false);
    const [pdfFiles, setPdfFiles] = useState([]);


    const [formdata, setFormdata] = useState({
        project_id: "",
      })
    
    
      const { project_id} = formdata;


      const handleOnChange = (e) => {
        setFormdata((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

      console.log("Printing the form data",formdata);



      const handleOnSubmit = (e) => {
        e.preventDefault();

        if(project_id.trim()==="" || pdfFiles.length===0)
        {
            toast.error("Please enter All the details");
            return;
        }
        
        setConfirmation(true);
      }



        const finalSubmit= async ()=>{

            const formDataFinal = new FormData();

            formDataFinal.append('project_id', project_id);

            // Append each PDF file to the FormData
            pdfFiles.forEach((file, index) => {
            formDataFinal.append(`pdfFiles`, file);
            });

            AddDocumentInExistingConsultancyProject(token,formDataFinal);
            // await AddUCResearch(token,formDataFinal);
            setFormdata({project_id: ""});
            pdfFiles.length=0;
        }



    useEffect(()=>{
        const getResearchDetails = async () => {
            //getting list of all faculties
            let res=[];
            try {
              res = await getAllConsultancyProjectsDeatils(token);
              console.log("printing the response",res);
              if(res.length!==0)
                  {
                    setAllConsultancyProjectData(res);
                  }
                  else
                  {
                    setAllConsultancyProjectData([]);
                  }
            } catch (error) {
              console.log("could not fetch project details.")
            }
        }

        getResearchDetails();
    },[])


  return (
    <div className='flex flex-col gap-y-4 px-12 py-8 w-[900px] mx-auto overflow-hidden bg-white shadow-xl sm:rounded-lg'>
        <form onSubmit={handleOnSubmit}>
            <h2 className='font-semibold'>Want to add more documents to Consultancy Project</h2>
            <div className="mt-16 grid grid-cols-1 gap-x-20 gap-y-8 sm:grid-cols-6">

                  <div className="sm:col-span-3">
                  <label htmlFor="project_id" className="block text-sm font-medium leading-6 text-gray-900">
                      Select Project
                  </label>
                  <div className="mt-2">
                      <select
                      required
                      id="project_id"
                      name="project_id"
                      value={project_id}
                      onChange={handleOnChange}
                      className="block min-w-[362px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                      {(allConsulatncyProjectData.length === 0) ?
                      (<option>No Project Available</option>) :
                      (
                          <>
                          <option value="">Select Consultancy Project</option>
                          {allConsulatncyProjectData.map((project) => (
                              <option key={project?.c_project_id} value={project?.c_project_id}>
                              {project?.c_project_title}
                              </option>
                          ))}
                          </>
                      )}
                      </select>
                      </div>
                    </div>


                            <div className="sm:col-span-3">
                            <label htmlFor="pdfFiles" className="block text-sm font-medium leading-6 text-gray-900">
                            Choose file
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
                                onChange={(e) => setPdfFiles(Array.from(e.target.files))}
                                className="sr-only"
                            />
                            <span>Select PDF files</span>
                            </label>
                            {pdfFiles.length > 0 ? (
                                <p className="mt-2 text-sm text-gray-600">
                                {pdfFiles.length} file(s) selected
                                </p>
                            ): (<p className="mt-2 text-sm text-gray-600">0 files selected</p>)}
                            </div>
                        </div>


                        
                    </div>
                        <div className="mt-10 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>{}}>
                            Cancel
                            </button>
                            <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Add
                            </button>
                        </div>
            </form>





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
                                Selected Documents will be added
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
                        Add
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

export default AddDocumentConsultancy