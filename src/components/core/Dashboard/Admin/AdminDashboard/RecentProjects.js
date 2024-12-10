import React, { useEffect, useState } from 'react'
import { getSomeR_C_projects } from '../../../../../services/operations/Admin/GetData'
import { useSelector } from 'react-redux';

const Cstatuses = {
  active: 'text-green-600 bg-green-200 ring-green-600/20',
  closed: 'text-gray-600 bg-gray-200 ring-gray-500/10',
}

const Rstatuses = {
  awarded: 'text-green-600 bg-green-200 ring-green-600/20',
  closed: 'text-gray-600 bg-gray-200 ring-gray-500/10',
  proposed: 'text-yellow-800 bg-yellow-200 ring-yellow-600/20',
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const RecentProjects = () => {

  const {token}=useSelector((state)=> state.auth);
  const [projectData,setProjectData]=useState([]);
  const type=1;

    useEffect(()=>{
        const getProjectDetails = async () => {
            //getting list of all faculties
            try {
              const res = await getSomeR_C_projects(token);
              console.log("printing the response",res);
              if(res.length!==0)
                  {
                    setProjectData(res);
                  }
            } catch (error) {
              console.log("could not fetch project details.")
            }
          }
          getProjectDetails();
        },[]);


  return (
    <div>

      {/* Table headers */}
      <div className="grid grid-cols-8 font-semibold border-b-2 pb-2 mt-6">
        <div className="col-span-3">Title</div>
        <div className="col-span-3 ml-2">Agency name</div>
        <div className="col-span-1 ml-3">Status</div>
        <div className="col-span-1 ml-3">Type</div>
      </div>


      
      {/* Table data */}
      {projectData.map((item,index) => (
        <div key={index}>

          {item?.r_project_id && <div className="grid grid-cols-8 gap-4 py-2 border-b hover: hover:bg-gray-100 transition duration-200 p-2 rounded">
            <div className="col-span-3 cursor-pointer">{item?.r_project_title?.length > 35 ? `${item.r_project_title.slice(0, 35)}...` : item.r_project_title}</div>
            <div className="col-span-3">{item?.r_agency_name?.length > 35 ? `${item.r_agency_name.slice(0, 35)}...` : item.r_agency_name}</div>
            <div className="col-span-1"><p className={classNames(Rstatuses[item?.r_status],
                                        'mt-0.5 w-[80px] whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset',
                                        )}>{item?.r_status}</p></div>
            <div className="col-span-1">Research</div>
          </div>}

          {item?.c_project_id && <div className="grid grid-cols-8 gap-4 py-2 border-b hover: hover:bg-gray-100 transition duration-200 p-2 rounded">
          <div className="col-span-3 cursor-pointer">{item?.c_project_title?.length > 35 ? `${item.c_project_title.slice(0, 35)}...` : item.c_project_title}</div>
          <div className="col-span-3">{item?.c_agency_name?.length > 35 ? `${item.c_agency_name.slice(0, 35)}...` : item.c_agency_name}</div>
          <div className="col-span-1"><p className={classNames(Cstatuses[item?.status],
                                        'mt-0.5 w-[80px] whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset',
                                        )}>{item?.status}</p></div>
          <div className="col-span-1">Consultancy</div>
          </div>}

        </div>
      ))}
    </div>
  )
}

export default RecentProjects