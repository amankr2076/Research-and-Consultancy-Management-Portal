import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { getAllConsultancyProjectsDeatils } from '../../../../../services/operations/Admin/GetData';
import { addConsultanctyExpenditure } from '../../../../../services/operations/Admin/AddSettings';
import toast from 'react-hot-toast';


const exp_types = ["Travel", "Equipment", "Salaries and Wages", "other_expenditure"];

const AddConsultancyExpenditure = () => {

    const { token } = useSelector((state) => state.auth);
    const [allConsultancyProjectData,setAllConsultancyProjectData]=useState([]);
    const [confirmation,setConfirmation]=useState(false);



    const [formData, setFormData] = useState({
        project_id: "",
        exp_type: "",
        date: "",
        amount:"",
      })


      const { project_id, exp_type, date,amount} = formData;


      const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

      console.log("Printing the form data",formData);


      function isWithinLimit(amount) {
        return amount.toString().length <= 15;
    }

      const handleOnSubmit = (e) => {
        e.preventDefault();

        if(date.trim() === "" || exp_type.trim()==="" || project_id.trim()==="" || amount.trim()==="")
        {
            toast.error("Please enter All the details");
            return;
        }

        if(!isWithinLimit(amount))
          {
            toast.error("Enter a valid amount");
            return;
          }
        const [year, month, day] = date.split('-');
        // console.log("printing the year",parseInt(year));
        if (parseInt(year) < 1950 || parseInt(year) > 2080) {
            toast.error("Enter a year between 1950 and 2080");
            return;
        }
        setConfirmation(true);
      }



      useEffect(()=>{

        const getConsultancyDetails = async () => {
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

        getConsultancyDetails();
        
      },[])

  return (
    <div className='mt-10'>

        <form onSubmit={handleOnSubmit}>
            <h2>Enter the Expenditure details</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-20 gap-y-8 sm:grid-cols-6">


                
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
                      {(allConsultancyProjectData.length === 0) ?
                      (<option>No Project Available</option>) :
                      (
                          <>
                          <option value="">Select Consultancy Project</option>
                          {allConsultancyProjectData.map((project) => (
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
                  <label htmlFor="exp_type" className="block text-sm font-medium leading-6 text-gray-900">
                      Select Expenditure Type
                  </label>
                  <div className="mt-2">
                      <select
                      required
                      id="exp_type"
                      name="exp_type"
                      value={exp_type}
                      onChange={handleOnChange}
                      className="block min-w-[362px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                      <option value="">Select Type</option>
                        {exp_types.map((exp, index) => (
                        <option key={index} value={exp}>
                            {exp}
                        </option>
                    ))}
                      </select>
                      </div>
                </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                            Enter Expenditure date
                          </label>
                          <div className="mt-2">
                            <input
                              required
                              id="date"
                              name="date"
                              type="date"
                              value={date}
                              onChange={handleOnChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>



                        <div className="sm:col-span-3">
                          <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                            Enter Amount
                          </label>
                          <div className="mt-2">
                            <input
                              required
                              id="amount"
                              name="amount"
                              type="number"
                              value={amount}
                              placeholder="Enter amount"
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
                                fund will be adjusted for respective project
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        onClick={() => {setConfirmation(false); addConsultanctyExpenditure(token,formData); setFormData({project_id: "",exp_type: "",date: "",amount:""})}}
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

export default AddConsultancyExpenditure