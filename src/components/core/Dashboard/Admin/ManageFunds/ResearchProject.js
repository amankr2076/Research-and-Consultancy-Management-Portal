import { useState } from "react"
import ResearchReleaseExpenditure from "./ResearchReleaseExpenditure";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


export default function ResearchProject() {

    const [selectedoption,setSelectedOption]=useState(1);

    let text1;
    let text2;
    let text3;

    if(selectedoption===1)
    {
        text1="Enter Release Fund";
        text2="Enter Release Date";
        text3="Released fund"
    }
    else
    {
        text1="Enter Expenditure Fund";
        text2="Enter Expenditure Date";
        text3="Expenditure fund"
    }

  return (
    <div>
    <div className='flex flex-col gap-y-4 px-12 py-8 w-[900px] mx-auto overflow-hidden bg-white shadow-xl sm:rounded-lg'>
        <div className="flex justify-around">
            <p className={selectedoption===1 ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}
            
            onClick={()=>{setSelectedOption(1)}}>Add funds</p>
            <p className={selectedoption===2 ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700 cursor-pointer'}
                onClick={()=>{setSelectedOption(2)}}>Add Expenditure</p>
        </div>
        {/* <div className="border-b border-gray-400 pb-12 mt-[-55px]"></div> */}
        
        {selectedoption===1 && <ResearchReleaseExpenditure text1={text1} text2={text2} text3={text3} selectedoption={selectedoption}></ResearchReleaseExpenditure>}
        {selectedoption===2 && <ResearchReleaseExpenditure text1={text1} text2={text2} text3={text3} selectedoption={selectedoption}></ResearchReleaseExpenditure>}
        
    </div>

    </div>
  )
}