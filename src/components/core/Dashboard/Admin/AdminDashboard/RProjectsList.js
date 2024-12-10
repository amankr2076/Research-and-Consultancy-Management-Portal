import React, { useEffect, useState } from 'react'
import { getAllResearchProjectsDeatils } from '../../../../../services/operations/Admin/GetData';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const statuses = {
    awarded: 'text-green-600 bg-green-200 ring-green-600/20',
    closed: 'text-gray-600 bg-gray-200 ring-gray-500/10',
    proposed: 'text-yellow-800 bg-yellow-200 ring-yellow-600/20',
  }


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


const RProjectsList = () => {

  const {token}=useSelector((state)=> state.auth);
  const [projectData,setProjectData]=useState([]);

    useEffect(()=>{
        const getProjectDetails = async () => {
            //getting list of all faculties
            try {
              const res = await getAllResearchProjectsDeatils(token);
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
    <div className='w-[1200px] ml-[-100px] rounded-lg shadow-lg py-8 px-8'>
        <h2 className='font-bold mb-4'>All Research Projects</h2>

      {/* Table headers */}
      <div className="grid grid-cols-11 font-semibold border-b-2 pb-2 mt-6">
        <div className="col-span-1">P ID</div>
        <div className="col-span-3 ml-[-40px]">Title</div>
        <div className="col-span-3 ml-2">Agency name</div>
        <div className="col-span-2 ml-3">Faculty</div>
        <div className="col-span-1 ml-3">Role</div>
        <div className="col-span-1 ml-3">Status</div>
      </div>


      
      {/* Table data */}
      {projectData.map((item,index) => (
        <div key={index}>

          {item?.r_project_id && <div className="grid grid-cols-11 gap-4 py-2 border-b hover: hover:bg-gray-100 transition duration-200 p-2 rounded">
            <div className="col-span-1">{item?.r_project_id}</div>
            <Link className="col-span-3 cursor-pointer ml-[-40px]" to={`/dashboard/admin/main-page/rprojects/${item?.r_project_id}/${item?.u_id}`}>
                    <div >{item?.r_project_title?.length > 40 ? `${item.r_project_title.slice(0, 40)}...` : item.r_project_title}</div>
            </Link>
            <div className="col-span-3">{item?.r_agency_name?.length > 35 ? `${item.r_agency_name.slice(0, 35)}...` : item.r_agency_name}</div>
            <div className="col-span-2">{item?.u_name}</div>
            <div className="col-span-1">{item?.role}</div>
            <div className="col-span-1"><p className={classNames(statuses[item?.r_status],
                                        'mt-0.5 whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset',
                                        )}>{item?.r_status}</p></div>
          </div>}

        </div>
      ))}
    </div>
  )
}

export default RProjectsList