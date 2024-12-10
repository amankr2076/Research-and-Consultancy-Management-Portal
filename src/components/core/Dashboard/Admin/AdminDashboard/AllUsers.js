import React, { useEffect, useState } from 'react'
import { getAllFaculties } from '../../../../../services/operations/Admin/GetData';
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


const AllUsers = () => {

  const {token}=useSelector((state)=> state.auth);
  const [facultyData,setFacultyData]=useState([]);

    useEffect(()=>{
        const getProjectDetails = async () => {
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
          }
          getProjectDetails();
        },[]);


  return (
    <div className='w-[1200px] ml-[-100px] rounded-lg shadow-lg py-8 px-8'>
        <h2 className='font-bold mb-4'>All Registered Users</h2>

      {/* Table headers */}
      <div className="grid grid-cols-7 font-semibold border-b-2 pb-2 mt-6">
        <div className="col-span-1">user ID</div>
        <div className="col-span-2 ml-[-50px]">Name</div>
        <div className="col-span-1 ml-2">Department</div>
        <div className="col-span-2 ml-3">Email</div>
        <div className="col-span-1 ml-3">Phone</div>
      </div>


      
      {/* Table data */}
      {facultyData.map((item,index) => (
        <div key={index}>

          {item?.user_id && <div className="grid grid-cols-7 gap-4 py-2 border-b hover: hover:bg-gray-100 transition duration-200 p-2 rounded">
            <div className="col-span-1">{item?.user_id}</div>
            <div className="col-span-2 cursor-pointer ml-[-60px]">{item?.user_name?.length > 40 ? `${item.user_name.slice(0, 40)}...` : item.user_name}</div>
            <div className="col-span-1">{item?.department_name?.length > 35 ? `${item.department_name.slice(0, 35)}...` : item.department_name}</div>
            <div className="col-span-2">{item?.u_email}</div>
            <div className="col-span-1">{item?.u_phone}</div>
          </div>}

        </div>
      ))}
    </div>
  )
}

export default AllUsers