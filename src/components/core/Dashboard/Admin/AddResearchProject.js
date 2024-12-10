import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { getAllFaculties } from "../../../../services/operations/Admin/GetData";
import { getAllResearchAgenciesData } from "../../../../services/operations/Admin/GetData";
import { AddNewResearchProject } from "../../../../services/operations/Admin/AddSettings";
import toast from "react-hot-toast";
import { Switch } from '@headlessui/react'

export default function AddResearchProject() {

  const { token } = useSelector((state) => state.auth);

  const [enabled, setEnabled] = useState(false);

  const [confirmation,setConfirmation]=useState(false);
  const [facultyData,setFacultyData]=useState([]);
  const [allAgencies,setAllAgencies]=useState([]);
  const [allSchemes,setAllSchemes]=useState([]);
  const [filteredSchemes,setFilteredSchemes]=useState([]);
  const [allSubSchemes,setAllSubSchemes]=useState([]);
  const [filteredSubSchemes,setFilteredSubSchemes]=useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [formdata, setFormdata] = useState({
    title: "",
    sponsoring_agency_id: "",
    scheme_id: "",
    sub_scheme_id: "",
    faculty_id: "",
    role: "",
    proposal_date: "",
  })


  const { title, sponsoring_agency_id, scheme_id, sub_scheme_id, faculty_id, role, proposal_date } = formdata;

  const filterSchemesByAgency = (agencyId) => {
    return allSchemes.filter(scheme => scheme.r_agency_id === parseInt(agencyId, 10));
  };

  const filterSubSchemesBySchemeId = (schemeId) => {
    return allSubSchemes.filter(subScheme => subScheme.scheme_id === parseInt(schemeId, 10));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))

    if (name === "sponsoring_agency_id") {
      const filtered = filterSchemesByAgency(value);
      console.log("printing the filtered scheme",value,filtered);
      setFilteredSchemes(filtered);
    }

    if (name === "scheme_id") {
      const filtered = filterSubSchemesBySchemeId(value);
      console.log("printing the filtered scheme",value,filtered);
      setFilteredSubSchemes(filtered);
    }
  }


    // Handle Form Submission
    const handleOnSubmit = (e) => {
      e.preventDefault();
      console.log("printing the form data",formdata);

      if(title.trim()==="" || sponsoring_agency_id.trim()===""
        || scheme_id.trim()==="" || (enabled && sub_scheme_id.trim()==="") ||role.trim()==="" ||proposal_date.trim()==="" || pdfFiles.length===0)
      {
        toast.error("enter all the details");
        return;
      }

      const isValid = /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/.test(title);
        console.log("printing the isvalid value",isValid);
        if(!isValid)
        {
          toast.error("Enter a valid Title");
          return;
        }

      const [year, month, day] = proposal_date.split('-');
        // console.log("printing the year",parseInt(year));
        if (parseInt(year) < 1950 || parseInt(year) > 2080) {
          toast.error("Enter a year between 1950 and 2080");
          return;
      }

        setConfirmation(true);
        // toast.success("Project Added Successfully");
    
    }

    const finalSubmit= async ()=>{

      const formDataFinal = new FormData();

      formDataFinal.append('title', title);
      formDataFinal.append('sponsoring_agency_id', sponsoring_agency_id);
      formDataFinal.append('scheme_id', scheme_id);
      formDataFinal.append('sub_scheme_id', sub_scheme_id);
      formDataFinal.append('faculty_id', faculty_id);
      formDataFinal.append('role', role);
      formDataFinal.append('proposal_date', proposal_date);
      formDataFinal.append("enabled",enabled);

      // Append each PDF file to the FormData
      pdfFiles.forEach((file, index) => {
      formDataFinal.append(`pdfFiles`, file);
      });
      await AddNewResearchProject(token,formDataFinal);

      // await uploadFile(token,formDataFinal);
      setFormdata({title: "",sponsoring_agency_id: "",scheme_id: "",sub_scheme_id: "",faculty_id: "",role: "",proposal_date:""});
      pdfFiles.length=0;
  }


  useEffect(() => {
    const getDetails = async () => {
      //getting list of all faculties
      try {
        const res = await getAllFaculties(token);
        console.log("printing the response",res);
        if(res.length!==0)
            {
              setFacultyData(res);
            }
      } catch (error) {
        console.log("could not fetch project details.")
      }


      //getting list of all agencies and their schemes
      try{
        const res=await getAllResearchAgenciesData(token);
        console.log("printing the agencies data",res);
        if(res.length!==0)
        {
          setAllAgencies(res[0]);
          setAllSchemes(res[1]);
          setAllSubSchemes(res[2]);
        }
      } catch(error)
      {
        console.log("could not fetch agency details",error);
      }
    }; 
    getDetails();
  }, [])

  return (
    <form onSubmit={handleOnSubmit}>
      <div className=" flex flex-col gap-y-4 px-20 py-8 w-[900px] mx-auto overflow-hidden bg-white shadow-2xl sm:rounded-lg">
        {/* <div className="border-b border-gray-900/10 pb-12"></div> */}
          <h1 className="text-base font-semibold leading-7 text-gray-900">Add a new Research Project</h1>
          <p className="mt-1 text-sm leading-6 text-gray-600">* The status of the project will be set to Proposed.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-20 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-6">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title of the project
              </label>
              <div className="mt-2">
                <input
                  required
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  placeholder="Enter title of the project"
                  onChange={handleOnChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="sponsoring_agency_id" className="block text-sm font-medium leading-6 text-gray-900">
                Select Sponsoring Agency
              </label>
              <div className="mt-2">
                <select
                  id="sponsoring_agency_id"
                  name="sponsoring_agency_id"
                  value={sponsoring_agency_id}
                  onChange={handleOnChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {allAgencies.length === 0 ?
                   (<option>NO Agencies Available</option>) :
                   (
                      <>
                      <option value="">Select Agency</option>
                      {allAgencies.map((agency) => (
                        <option key={agency?.r_agency_id} value={agency?.r_agency_id}>
                          {agency?.r_agency_name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <label htmlFor="scheme_id" className="block text-sm font-medium leading-6 text-gray-900">
                Select Scheme
              </label>
              <div className="mt-2">
                <select
                  id="scheme_id"
                  name="scheme_id"
                  value={scheme_id}
                  onChange={handleOnChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {filteredSchemes.length === 0 ?
                   (<option>No scheme Available</option>) :
                   (
                      <>
                      <option value="">Select Scheme</option>
                      {filteredSchemes.map((scheme) => (
                        <option key={scheme?.scheme_id} value={scheme?.scheme_id}>
                          {scheme?.scheme_name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>

            {<div className="sm:col-span-3">
              <label htmlFor="sub_scheme_id" className="text-sm font-medium leading-6 text-gray-900 flex justify-between">
                Select Sub-Scheme
                <div>
                  <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className="group relative inline-flex h-3 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                    >
                      <span className="sr-only">Use setting</span>
                      <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out group-data-[checked]:bg-indigo-600"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5"
                      />
                  </Switch>

                </div>
              </label>
              {enabled && <div className="mt-2">
                <select
                  id="sub_scheme_id"
                  name="sub_scheme_id"
                  value={sub_scheme_id}
                  onChange={handleOnChange}
                  className={'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'}
                >
                  {(filteredSubSchemes.length === 0)?
                   (<option>No sub-scheme Available</option>) :
                   (
                      <>
                      <option value="">Select Sub-scheme</option>
                      {filteredSubSchemes.map((sub_scheme) => (
                        <option key={sub_scheme?.sub_scheme_id} value={sub_scheme?.sub_scheme_id}>
                          {sub_scheme?.sub_scheme_name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>}
            </div>}



            <div className="sm:col-span-3 sm:col-start-1">
              <label htmlFor="faculty_id" className="block text-sm font-medium leading-6 text-gray-900">
                Faculty
              </label>
              <div className="mt-2">
              <select
                  id="faculty_id"
                  name="faculty_id"
                  value={faculty_id}
                  onChange={handleOnChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {facultyData.length === 0 ?
                   (<option>No faculty available</option>) :
                   (
                      <>
                      <option value="">Select Faculty</option>
                      {facultyData.map((facultyMember) => (
                        <option key={facultyMember?.user_id} value={facultyMember?.user_id}>
                          {facultyMember?.user_name}
                        </option>
                      ))}
                    </>
                  )}
                  
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  name="role"
                  autoComplete="role"
                  value={role}
                  onChange={handleOnChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>select Role</option>
                  <option>PI</option>
                  <option>Co-PI</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3 sm:col-start-1 mt-4">
              <label htmlFor="proposal_date" className="block text-sm font-medium leading-6 text-gray-900">
                Proposal date
              </label>
              <div className="mt-2">
                <input
                  id="proposal_date"
                  name="proposal_date"
                  type="date"
                  value={proposal_date}
                  placeholder="Enter title of the project"
                  onChange={handleOnChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 mt-3">
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


      
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
      </div>


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
                                A new Project will be added
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        onClick={async () => {setConfirmation(false); finalSubmit();}}
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
    </form>
  )
}
