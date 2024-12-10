import React, { useEffect, useState } from 'react'
import ProjectListResearch from './ProjectListResearch'
import { apiConnector } from "../../../services/apiconnector";
import { useSelector } from 'react-redux';

import { getUserResearchProjects } from '../../../services/operations/GetProjects';

const ResearchProject = () => {
  const {token}=useSelector((state)=>state.auth);
  const { user } = useSelector((state) => state.profile);
  const [allResearchProjects,setAllResearchProjects]=useState([]);
  const userID=user.u_id;

  useEffect(() => {
    const getAllResearchProjects = async () => {
      try {
        const res = await getUserResearchProjects(token,userID);
        console.log(res);
        setAllResearchProjects(res);
      } catch (error) {
        console.log("Could not fetch project list.")
      }
    }; 
    getAllResearchProjects();
  }, [])
  return (
    <div>
        <div className='text-3xl font-bold text-gray-500 mb-12'>Research Projects</div>

        {allResearchProjects.length===0 && <div className='text-2xl font-bold flex justify-center'><p>No Projects Found</p></div>}
        {allResearchProjects.length>0 && <ProjectListResearch allResearchProjects={allResearchProjects}></ProjectListResearch>}
    </div>
  )
}

export default ResearchProject;