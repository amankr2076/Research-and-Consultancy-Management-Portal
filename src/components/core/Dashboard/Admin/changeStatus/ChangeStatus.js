import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { getAllResearchProjectsDeatils } from '../../../../../services/operations/Admin/GetData';
import { getAllConsultancyProjectsDeatils } from '../../../../../services/operations/Admin/GetData';
import ChangeToClosed from './ChangeToClosed';
import ChangeToAwarded from './ChangeToAwarded';

const ChangeStatus = () => {

    const { token } = useSelector((state) => state.auth);
    const [changebtn,setChangebtn]=useState(false);
    const [rProjects,setrProjects]=useState(true);


    const [allResearchProjectData,setAllResearchProjectData]=useState([]);
    const [allConsultancyProjectData,setConsultancyProjectData]=useState([]);
    const [projectID,setProjectID]=useState("");
    const [currentStatus,setCurrentStatus]=useState("");

  // console.log("printing the ID and status",projectID,currentStatus);

    const filterProject = (projectID) => {
      if(rProjects)
      {
        return allResearchProjectData.find(project => project.r_project_id === parseInt(projectID, 10));
      }
      else
      {
        return allConsultancyProjectData.find(project => project.c_project_id === parseInt(projectID, 10));
      }
    };

  const handleOnChangeProject = (e) => {
      setProjectID(e.target.value);
      if(rProjects)
      {
        setCurrentStatus(filterProject(e.target.value)?.r_status);
      }
      else
      {
        setCurrentStatus(filterProject(e.target.value)?.status);
      }
      
    }


    useEffect(()=>{
      const getResearchDetails = async () => {
          //getting list of all faculties
          let res=[];
          try {
            res = await getAllResearchProjectsDeatils(token);
            // console.log("printing the response",res);
            if(res.length!==0)
                {
                  setAllResearchProjectData(res);
                }
                else
                {
                  setAllResearchProjectData([]);
                }
          } catch (error) {
            console.log("could not fetch project details.")
          }
      }
      const getConsultancyDetails = async () => {
          //getting list of all faculties
          let res=[];
          try {
            res = await getAllConsultancyProjectsDeatils(token);
            // console.log("printing the response",res);
            if(res.length!==0)
                {
                  setConsultancyProjectData(res);
                }
                else
                {
                  setConsultancyProjectData([]);
                }
          } catch (error) {
            console.log("could not fetch project details.")
          }
      }
      if(rProjects)
      {
        setProjectID("");
        setCurrentStatus("");
        getResearchDetails();
      }
      else
      {
        setProjectID("");
        setCurrentStatus("");
        getConsultancyDetails();
      }
          
  },[rProjects]);


  return (
    <div className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-4 px-12 py-8 w-[900px] mx-auto overflow-hidden bg-white shadow-xl sm:rounded-lg'>
              <div className='flex gap-x-20'>
                <h2 className='font-bold'>Choose the type of Project:</h2>
                <p className={rProjects ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700 cursor-pointer'} onClick={()=>{setrProjects(true); setChangebtn(false)}}>Research Project</p>
                <p className={!rProjects ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700 cursor-pointer'} onClick={()=>{setrProjects(false); setChangebtn(false)}}>Consultancy project</p>
              </div>

              {/* for select the project id */}
              <div className="mt-6 grid grid-cols-1 gap-x-20 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                  <label htmlFor="sponsoring_agency_id" className="block text-sm font-medium leading-6 text-gray-900">
                      Select Project
                  </label>
                  <div className="mt-2">
                      {rProjects && <select
                      id="sponsoring_agency_id"
                      name="sponsoring_agency_id"
                      onChange={handleOnChangeProject}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                      {(allResearchProjectData.length === 0) ?
                      (<option>No Project Available</option>) :
                      (
                          <>
                          <option value="">Select Research Project</option>
                          {allResearchProjectData.map((project) => (
                              <option key={project?.r_project_id} value={project?.r_project_id}>
                              {project?.r_project_title}
                              </option>
                          ))}
                          </>
                      )}
                      </select>}

                      {!rProjects && <select
                      id="sponsoring_agency_id"
                      name="sponsoring_agency_id"
                      onChange={handleOnChangeProject}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                      {(allConsultancyProjectData.length === 0) ?
                      (<option>No Project Available</option>) :
                      (
                          <>
                          <option value="">Select consultancy Project</option>
                          {allConsultancyProjectData.map((project) => (
                              <option key={project?.c_project_id} value={project?.c_project_id}>
                              {project?.c_project_title}
                              </option>
                          ))}
                          </>
                      )}
                      </select>}
                  </div>
                  </div>
                  <div className="sm:col-span-3 mt-8">
                        <div className='flex gap-x-10' >
                          <p>Current status : <span>{currentStatus}</span></p>
                          {(projectID && (currentStatus==="proposed" || currentStatus==="awarded" || currentStatus==="active")) 
                            && <p className='font-bold text-indigo-600 cursor-pointer' onClick={()=>{setChangebtn(true)}}>Proceed to change</p>}
                        </div>
                  </div>
              </div>
        </div>
            {changebtn && currentStatus==="proposed" && <ChangeToAwarded setChangebtn={setChangebtn} projectID={projectID}></ChangeToAwarded>}
            {changebtn && (currentStatus==="awarded" || currentStatus==="active") && <ChangeToClosed setChangebtn={setChangebtn} rProjects={rProjects} projectID={projectID}></ChangeToClosed>}
    </div>
  )
}

export default ChangeStatus