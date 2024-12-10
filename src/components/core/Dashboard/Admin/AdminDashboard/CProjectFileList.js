import React, { useEffect, useState } from 'react'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { getAllRCFiles } from '../../../../../services/operations/Admin/GetData';
import { useSelector } from 'react-redux';



const CProjectFileList = () => {

  const {token}=useSelector((state)=> state.auth);
  const [filesData,setFilesData]=useState([]);

    useEffect(()=>{
        const getProjectDetails = async () => {
            //getting list of all faculties
            try {
              const res = await getAllRCFiles(token);
              console.log("printing the response",res);
              if(res.length!==0)
                  {
                    setFilesData(res[1]);
                  }
            } catch (error) {
              console.log("could not fetch project details.")
            }
          }
          getProjectDetails();
        },[]);


  return (
    <div className='w-[1200px] ml-[-100px] rounded-lg shadow-lg py-8 px-8'>
        <h2 className='font-bold mb-4'>All Consultancy Project Files</h2>

      {/* Table headers */}
      <div className="grid grid-cols-6 font-semibold border-b-2 pb-2 mt-6">
        <div className="col-span-1">File ID</div>
        <div className="col-span-3 ml-[-80px]">Project Name</div>
        <div className="col-span-2 ml-6">File</div>
      </div>


      
      {/* Table data */}
      {filesData.map((item,index) => (
        <div key={index}>

          {item?.c_file_id && <div className="grid grid-cols-6 gap-4 py-2 border-b hover: hover:bg-gray-100 transition duration-200 p-2 rounded">
            <div className="col-span-1">{item?.c_file_id}</div>
            <div className="col-span-3 ml-[-85px]">{item?.c_project_title?.length > 60 ? `${item?.c_project_title.slice(0, 60)}...` : item?.c_project_title}</div>
            <div className="col-span-2 flex gap-2">
                    <PaperClipIcon aria-hidden="true" className="h-5 w-5 mt-1 flex-shrink-0 text-gray-400" />
                    <a href={item?.c_proposal_file}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium text-indigo-600 hover:text-indigo-500">
                    View
                </a></div>
          </div>}

        </div>
      ))}
    </div>
  )
}

export default CProjectFileList