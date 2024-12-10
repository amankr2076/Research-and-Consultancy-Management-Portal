import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { addDepartment } from "../../../../services/operations/Admin/AddSettings";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function AddDepartment() {

    const { token } = useSelector((state) => state.auth);
    const [isClicked,setIsClicked]=useState(false);
    const [deptName,setDeptName]=useState("");


    const handleOnChange = (e) => {
        setDeptName(e.target.value);
      }

      const handleOnSubmit = (e) => {
        e.preventDefault();
        if (deptName.trim() === "") {
            toast.error("Enter department name");
            return;
        }

        const isValid = /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/.test(deptName);
        console.log("printing the isvalid value",isValid);
        if(!isValid)
        {
          toast.error("Enter a valid name");
          return;
        }
        setIsClicked(true);
      }

  return (
    <div>
    <div className='flex flex-col gap-y-4 px-12 py-8 w-[700px] mx-auto overflow-hidden bg-white shadow-xl sm:rounded-lg'>
        <h2 className='font-bold text-xl '>Add a New Department</h2>
        <div className="border-b border-gray-400 pb-12 mt-[-55px]"></div>
        <form onSubmit={handleOnSubmit}>
        <div className='mt-8 flex justify-between'>
        <label htmlFor="first-name" className="block text-sm font-bold leading-8 text-gray-900">
                Department name :
              </label>

              <input
                  required
                  id="first-name"
                  name="first-name"
                  value={deptName}
                  onChange={handleOnChange}
                  type="text"
                  autoComplete="given-name"
                  placeholder="Enter New Department name"
                  className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
      </form>
        <Link to={"/dashboard/admin/main-page/department"}>
          <p className='mt-12 flex gap-6'>See Departments<span className='text-indigo-600 cursor-pointer font-semibold'>View</span></p>
        </Link>
    </div>













    {/* --------------code for confirmation modal */}

    <Dialog open={isClicked} onClose={() => {}} className="relative z-10">
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
                        {deptName} will be added to our database
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {setIsClicked(false); addDepartment(token,deptName); setDeptName("")}}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Add
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => {setIsClicked(false)}}
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