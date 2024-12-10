import React, { useEffect, useState } from 'react'
import { getAllResearchAgenciesData } from '../../../../../services/operations/Admin/GetData';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



const SAResearch = () => {

  const {token}=useSelector((state)=> state.auth);
  const [agencyData,setAgencyData]=useState([]);

    useEffect(()=>{
        const getProjectDetails = async () => {
            //getting list of all faculties
            try {
              const res = await getAllResearchAgenciesData(token);
              console.log("printing the response of agencies data",res);
              if(res.length!==0)
                  {
                    setAgencyData(res[0]);
                  }
            } catch (error) {
              console.log("could not fetch project details.")
            }
          }
          getProjectDetails();
        },[]);


  return (
    <div className='w-[1200px] ml-[-100px] rounded-lg shadow-lg py-8 px-8'>
        <h2 className='font-bold mb-4'>All Research Agencies</h2>

      {/* Table headers */}
      <div className="grid grid-cols-5 font-semibold border-b-2 pb-2 mt-6">
        <div className="col-span-1">Agency ID</div>
        <div className="col-span-3 ml-[-50px]">Agency Name</div>
        <div className="col-span-1">Total Projects</div>
      </div>


      
      {/* Table data */}
      {agencyData.map((item,index) => (
        <div key={index}>

          {item?.r_agency_id && <div className="grid grid-cols-5 gap-4 py-2 border-b hover: hover:bg-gray-100 transition duration-200 p-2 rounded">
            <div className="col-span-1">{item?.r_agency_id}</div>
            <div className="col-span-3 ml-[-60px]">{item?.r_agency_name?.length > 60 ? `${item?.r_agency_name.slice(0, 60)}...` : item?.r_agency_name}</div>
            <div className="col-span-1">{item?.total_projects}</div>
          </div>}

        </div>
      ))}
    </div>
  )
}

export default SAResearch