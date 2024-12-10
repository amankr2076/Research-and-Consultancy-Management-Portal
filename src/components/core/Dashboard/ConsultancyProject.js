import React, { useEffect, useState } from 'react'
import { apiConnector } from "../../../services/apiconnector";
import { useSelector } from 'react-redux';
import { getUserConsultancyProjects } from '../../../services/operations/GetProjects';
import ProjectListConsultancy from './ProjectListConsultancy';

const ConsultancyProject = () => {
  const {token}=useSelector((state)=>state.auth);
  const { user } = useSelector((state) => state.profile);
  const [allConsultancyProjects,setAllConsultancyProjects]=useState([]);
  const userID=user.u_id;

  useEffect(() => {
    const getAllResearchProjects = async () => {
      try {
        const res = await getUserConsultancyProjects(token,userID);
        console.log(res);
        setAllConsultancyProjects(res);
      } catch (error) {
        console.log("Could not fetch project list.")
      }
    }; 
    getAllResearchProjects();
  }, [])
  return (
    <div>
        <div className='text-3xl font-bold text-gray-500 mb-12'>Consultancy Projects</div>

        {allConsultancyProjects.length===0 && <div className='text-2xl font-bold flex justify-center'><p>No Projects Found</p></div>}
        {allConsultancyProjects.length>0 && <ProjectListConsultancy allConsultancyProjects={allConsultancyProjects}></ProjectListConsultancy>}
    </div>
  )
}

export default ConsultancyProject;