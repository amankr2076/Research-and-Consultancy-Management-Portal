import React, { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { getAllSubheadsResearch } from '../../../../../services/operations/Admin/GetData';
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { changeStatusToAwarded } from '../../../../../services/operations/Admin/ModifySetting';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ChangeToAwarded = ({setChangebtn,projectID}) => {


  const { token } = useSelector((state) => state.auth);


  const [confirmation,setConfirmation]=useState(false);
  const [allSubHeadsResearch,setAllSubHeadsResearch]=useState([]);
  const [fields, setFields] = useState([{ subhead: '', fundForOneSubHead: '' }]);
  const [selected,setSelected] = useState(['']);
  

  const [formData, setFormData] = useState({
    start_date: "",
    totalfund: "",
    subhead: "",
  })



  const { start_date, totalfund, subhead} = formData;

  // console.log("printing the subhead data",allSubHeadsResearch);
  console.log("printing the subhead and fund",fields);
  console.log("printing the selected options",selected);
  // console.log("printing the length",selected.length);

  // Function to handle changes in the inputs
  const handleOnChangeSubhead = (index, event) => {
    const values = [...fields];

    if(event.target.name==="subhead" && selected.includes(event.target.value))
    {
      toast.error("already selected");
      return;
    }
    values[index][event.target.name] = event.target.value;
    setFields(values);
    if(event.target.name==="subhead")
    {
      const values=[...selected];
      values[index]=event.target.value;
      setSelected(values);
    }
    

    // if (event.target.name === "subhead") {
    //   const filtered = filterSubHeads(event.target.value);
    //   console.log("printing the filtered scheme",event.target.value,filtered);
    //   setAllSubHeadsResearch(filtered);
    // }
  };


  // Function to add new set of fields
  const addNewFields = () => {
    setFields([...fields, { subhead: '', fundForOneSubHead: '' }]);
    setSelected([...selected,''])
  };

    // Function to remove a field by index
    const removeField = (index) => {
      const updatedFields = fields.filter((_, i) => i !== index);
      const updatedOptions = selected.filter((_,i)=>i !==index);
      setFields(updatedFields);
      setSelected(updatedOptions);
    };


    ///function for filtering the allsubheadsData
    const filterSubHeads = (subhead_id) => {
      return allSubHeadsResearch.filter(subHeads => subHeads.r_subhead_id !== parseInt(subhead_id, 10));
    };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))



    // if (name === "scheme_id") {
    //   const filtered = filterSubSchemesBySchemeId(value);
    //   console.log("printing the filtered scheme",value,filtered);
    //   setFilteredSubSchemes(filtered);
    // }
  }
  

  function isWithinLimit(amount) {
    return amount.toString().length <= 15;
}

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const finalFormData = [formData, fields];
    console.log("printing the final form data",finalFormData);

    if(start_date.trim() ==="" || totalfund.trim()=== "")
    {
      toast.error("fill all the details");
      return;
    }

    if(!isWithinLimit(totalfund))
      {
        toast.error("Enter a valid amount");
        return;
      }

    let totalCalfund=0;

    fields.forEach((field)=>{
      const fund = Number(field.fundForOneSubHead) || 0;
      totalCalfund += fund;
    })
    console.log("total calculated fund",totalCalfund);
    if(Number(totalfund)!==totalCalfund)
    {
      toast.error("Total fund does not match");
      return;
    }
    setConfirmation(true);
  }

  useEffect(()=>{
    const getResearchDetails = async () => {
        let res=[];
        try{

          res = await getAllSubheadsResearch(token);

          if(res.length!==0)
          {
            setAllSubHeadsResearch(res);
          }
          else
          {
            setAllSubHeadsResearch([]);
          }
        } catch(error) {
          console.log("could not fetch subhead data");
        }
    }
    getResearchDetails();
  },[])
  
  return (
    <div>
       <form onSubmit={handleOnSubmit}>
          <div className='flex flex-col gap-y-4 px-12 py-8 w-[900px] mx-auto overflow-hidden bg-white shadow-xl sm:rounded-lg'>
                  <p className='font-semibold'>Status of the will be changed to Awarded</p>

                <div className="mt-4 grid grid-cols-1 gap-x-20 gap-y-8 sm:grid-cols-6">

                  <div className="sm:col-span-3">
                        <label htmlFor="start_date" className="block text-sm font-medium leading-6 text-gray-900">
                            Start Date
                        </label>
                        <div className="mt-2">
                            <input
                            required
                            id="start_date"
                            name="start_date"
                            type="date"
                            value={start_date}
                            placeholder="Enter closing date of the project"
                            onChange={handleOnChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="totalfund" className="block text-sm font-medium leading-6 text-gray-900">
                            Total Allocated fund
                          </label>
                          <div className="mt-2">
                            <input
                              required
                              id="totalfund"
                              name="totalfund"
                              type="number"
                              value={totalfund}
                              placeholder="Enter total allocated fund for this project"
                              onChange={handleOnChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                </div>
                  
                    <div className='flex justify-between'>
                      <h2 className='font-semibold mt-8'>Enter Fund details for each sub-Head</h2>
                      <div
                          onClick={allSubHeadsResearch.length !==selected.length ? addNewFields : undefined} // Disable onClick if myVariable is 4
                          className={`${
                          allSubHeadsResearch.length ===selected.length ? "text-gray-400 cursor-not-allowed" : "text-indigo-600 cursor-pointer"} font-bold mt-8`}
                          >
                            Add new
                      </div>
                    </div>

                {fields.map((field, index) => (
                        <div key={index} className="mt-4 grid grid-cols-1 gap-x-20 gap-y-8 sm:grid-cols-6">  
                              <div className="sm:col-span-3">
                                <label htmlFor="subhead" className="block text-sm font-medium leading-6 text-gray-900">
                                    Select Sub-Head
                                </label>
                                <div className="mt-2">
                                    <select
                                    required
                                    id="subhead"
                                    name="subhead"
                                    value={field.subhead}
                                    onChange={(event) => {handleOnChangeSubhead(index, event)}}
                                    className="block min-w-[362px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                    {(allSubHeadsResearch.length === 0) ?
                                    (<option>No Sub-Head Available</option>) :
                                    (
                                        <>
                                        <option value="">Select Sub-Head</option>
                                        {allSubHeadsResearch.map((subhead) => (
                                            <option key={subhead?.r_subhead_id} value={subhead?.r_subhead_id}>
                                            {subhead?.r_subhead_name}
                                            </option>
                                        ))}
                                        </>
                                    )}
                                    </select>
                              </div>
                            </div>


                            <div className="sm:col-span-3">
                                <div className='flex justify-between'>
                                  <label htmlFor="fundForOneSubHead" className="block text-sm font-medium leading-6 text-gray-900">
                                    Enter Allocated fund for {allSubHeadsResearch.find(subheadName=>subheadName.r_subhead_id===parseInt(fields[index].subhead,10))?.r_subhead_name}
                                  </label>
                                  {fields.length>1 && index!==0 && <MdOutlineRemoveCircleOutline onClick={() => removeField(index)} className="text-red-500 h-6 w-6 mt-[-8px] cursor-pointer"/>}
                                </div>
                                <div className="mt-2">
                                  <input
                                    required
                                    id="fundForOneSubHead"
                                    name="fundForOneSubHead"
                                    type="number"
                                    value={field.fundForOneSubHead}
                                    placeholder="Enter allocated fund"
                                    onChange={(event) => handleOnChangeSubhead(index, event)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                          </div>          

                      ))}

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
                        onClick={() => {setConfirmation(false);
                                        const finalFormData = [formData,projectID, fields];
                                        changeStatusToAwarded(token,finalFormData);
                                        setFormData({start_date:"",totalfund:"",subhead:""});
                                        setFields([{ subhead: '', fundForOneSubHead: '' }]);
                                        setChangebtn(false)}}
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                        Change
                    </button>
                    <button
                        type="button"
                        data-autofocus
                        onClick={() => {setConfirmation(false);}}
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

export default ChangeToAwarded