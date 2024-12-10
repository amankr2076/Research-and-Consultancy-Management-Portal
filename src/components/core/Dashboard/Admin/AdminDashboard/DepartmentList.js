import React, { useEffect, useState } from 'react'
import { getAllDepartments } from '../../../../../services/operations/Admin/GetData';
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


const DepartmentList = () => {

  const {token}=useSelector((state)=> state.auth);
  const [projectData,setProjectData]=useState([]);

    useEffect(()=>{
        const getProjectDetails = async () => {
            //getting list of all faculties
            try {
              const res = await getAllDepartments(token);
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
      <div className="grid grid-cols-4 font-semibold border-b-2 pb-2 mt-6">
        <div className="col-span-1">Dept ID</div>
        <div className="col-span-2 ml-[-76px]">Dept Name</div>
        <div className="col-span-1 ml-2">Total Faculty</div>
      </div>


      
      {/* Table data */}
      {projectData.map((item,index) => (
        <div key={index}>

          {item?.department_id && <div className="grid grid-cols-4 gap-4 py-2 border-b hover: hover:bg-gray-100 transition duration-200 p-2 rounded">
            <div className="col-span-1">{item?.department_id}</div>
            <div className="col-span-2 ml-[-80px]">{item?.department_name?.length > 35 ? `${item.department_name.slice(0, 35)}...` : item.department_name}</div>
            <div className="col-span-1">{item?.faculty_count}</div>
          </div>}

        </div>
      ))}
    </div>
  )
}

export default DepartmentList