import React from 'react'
import image1 from '../../../assets/HomePageimage2.webp'

const FirstComp = () => {
  return (
    <div>
        <div className='h-dvh flex w-full'>
            <div className='w-3/5 h-dvh'>
                <div className='flex flex-col justify-center items-center h-full w-full -mt-20 gap-y-8'>
                    <div>
                    <h1 className='text-5xl font-bold text-gray-500'>The Fast & Easy Way</h1>
                    <h1 className='text-5xl font-bold text-gray-500'>To Manage Your Projects</h1>
                    </div>
                    <div className='-ml-[70px]'>
                    <h1 className='text-2xl'>Welcome to the Project</h1>
                    <h1 className='text-2xl'>and Consultancy Management Portal of IIITG</h1>
                    </div>
                </div>
            </div>

            <div className='w-2/5'>
                <img
                    src={image1}
                    alt='image'
                    className='w-4/5 h-2/3 mt-20 ml-12'></img>
            </div>
        </div>
    </div>
  )
}

export default FirstComp