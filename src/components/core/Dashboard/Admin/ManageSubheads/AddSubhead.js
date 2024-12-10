import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { addNewSubHead } from '../../../../../services/operations/Admin/AddSettings';

const AddSubhead = () => {


    const { token } = useSelector((state) => state.auth);

    const [confirmation,setConfirmation]=useState(false);   


    const [formData, setFormData] = useState({
        subHead_name: "",
      })


    const { subHead_name } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }


      const handleOnSubmit = (e) => {
        e.preventDefault();

        if(subHead_name.trim() === "")
        {
            toast.error("Please enter All the details");
            return;
        }

        const isValid = /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/.test(subHead_name);
        console.log("printing the isvalid value",isValid);
        if(!isValid)
        {
          toast.error("Enter a valid Sub Head name");
          return;
        }
        setConfirmation(true);
      }



  return (
    <div className='mt-10'>

        <form onSubmit={handleOnSubmit}>
            <h2>Enter the Sub-Head Name to Add</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-20 gap-y-8 sm:grid-cols-6">


                        <div className="sm:col-span-3">
                          <label htmlFor="subHead_name" className="block text-sm font-medium leading-6 text-gray-900">
                            Enter Sub-Head Name
                          </label>
                          <div className="mt-2">
                            <input
                              required
                              id="subHead_name"
                              name="subHead_name"
                              type="text"
                              value={subHead_name}
                              placeholder="Enter Name"
                              onChange={handleOnChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
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
                            Save
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
                                Sub-Head will be added to the record
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        onClick={() => {setConfirmation(false); addNewSubHead(token,formData); setFormData({subHead_name: ""})}}
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                        Save
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

export default AddSubhead