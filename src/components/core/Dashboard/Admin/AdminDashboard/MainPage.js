import React, { useEffect, useState } from 'react';
import RecentProjects from './RecentProjects';
import { Link } from 'react-router-dom';
import { getCountDetails } from '../../../../../services/operations/Admin/GetData';
import { useSelector } from 'react-redux';
import file_logo from '../../../../../assets/projectFile_logo.png'
import { IoIosSettings } from "react-icons/io";

const MainPage = () => {

  const {token}=useSelector((state)=> state.auth);
  const [countData,setCountData]=useState([]);
  const active_c_Project=(countData[3]?.active_c_projects/countData[0]?.total_c_projects)*100 || 0;
  const active_r_project=(countData[4]?.active_r_projects/countData[1]?.total_r_projects)*100 || 0;
  const received_invoices=(countData[6]?.received_invoices/countData[5]?.total_invoices)*100 || 0;
  // console.log("printing the %",active_c_Project);


    useEffect(()=>{
        const getProjectDetails = async () => {
            //getting list of all faculties
            try {
              const res = await getCountDetails(token);
              console.log("printing the response",res);
              if(res.length!==0)
                  {
                    setCountData(res);
                  }
            } catch (error) {
              console.log("could not fetch project details.")
            }
          }
          getProjectDetails();
        },[]);
  return (
  <div className='flex flex-col w-full'>
    <div className="h-[550px] bg-white flex justify-center">
      <div className="w-full max-w-5xl p-4 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        
        {/* Top Cards */}
        <div className="col-span-1 lg:col-span-3 grid gap-4 grid-cols-3 w-[967px]">
          <Link to={"/dashboard/admin/main-page/rprojects"}>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center h-52 flex flex-col justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
              <img src={file_logo} className='h-[40px]'></img>
              <p className="text-2xl font-bold">{countData[1]?.total_r_projects}</p>
              <p className="text-gray-500">Research Projects</p>
            </div>
          </Link>

          <Link to={"/dashboard/admin/main-page/users"}>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center h-52 flex flex-col justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
              <div className="text-4xl mb-2">👤</div>
              <p className="text-2xl font-bold">{countData[2]?.total_users}</p>
              <p className="text-gray-500">Users</p>
            </div>
          </Link>

          <Link to={"/dashboard/admin/main-page/cprojects"}>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center h-52 flex flex-col justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
              <img src={file_logo} className='h-[40px]'></img>
              <p className="text-2xl font-bold">{countData[0]?.total_c_projects}</p>
              <p className="text-gray-500">Consultancy Projects</p>
            </div>
          </Link>
        </div>

        {/* Smaller Action Cards */}
        <div className="col-span-1 md:col-span-3 lg:col-span-3 grid gap-4 grid-cols-2 w-[550px]">
          <Link to={"/dashboard/admin/main-page/department"} className="bg-white p-4 rounded-lg shadow-lg flex justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
            <div>
              <p>Departments</p>
            </div>
          </Link>
          
          <Link to={"/dashboard/admin/main-page/invoices"} className="bg-white p-4 rounded-lg shadow-lg text-center flex justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
            <div>
              <p>Invoices</p>
            </div>
          </Link>
          <Link to={"/dashboard/admin/main-page/agency-consultancy"} className="bg-white p-4  px-[0px] rounded-lg shadow-lg text-center flex justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
              <div>
                <p>Sponsoring Agencies Consultancy</p>
              </div>
          </Link>
          <Link to={"/dashboard/admin/main-page/agency-research"} className="bg-white p-4 rounded-lg shadow-lg text-center flex justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
            <div>
              <p>Sponsoring Agencies Research</p>
            </div>
          </Link>
          <Link to={"/dashboard/admin/main-page/r-files"} className="bg-white p-4 rounded-lg shadow-lg text-center flex justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
            <div>
              <p>Research Project Files</p>
            </div>
          </Link>
          <Link to={"/dashboard/admin/main-page/c-files"} className="bg-white p-4 rounded-lg shadow-lg text-center flex justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
            <div>
              <p>Consultancy Project Files</p>
            </div>
          </Link>
        </div>

        {/* OS Usage Statistics */}
        <div className="bg-white p-4 rounded-lg shadow-lg col-span-1 ml-[-180px] flex flex-col gap-6">
          <h3 className="text-xl font-semibold mb-4">Stats Of Projects</h3>
          <div className='mt-[-20px]'>
            <p className="text-gray-600">Active Research Projects</p>
            <div className="bg-gray-200 h-2 rounded-full">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${active_r_project}%` }}></div>
            </div>
          </div>
          <div>
            <p className="text-gray-600">Active Consultancy Projects</p>
            <div className="bg-gray-200 h-2 rounded-full">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${active_c_Project}%` }}></div>
            </div>
          </div>
          <div>
            <p className="text-gray-600">Received Invoices</p>
            <div className="bg-gray-200 h-2 rounded-full">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${received_invoices}%` }}></div>
            </div>
          </div>
          {/* <div className="mb-2">
            <p className="text-gray-600">iPhone</p>
            <div className="bg-gray-200 h-2 rounded-full">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '67%' }}></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>

    <div className='w-[967px] ml-4 rounded-lg shadow-lg py-8 px-8'>
        <h2 className='font-bold'>Some of the Recent Projects</h2>
        <RecentProjects></RecentProjects>
    </div>
  </div>  
  );
};

export default MainPage;
