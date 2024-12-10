import React, { useEffect, useState } from 'react'

const DynamicComp = () => {

    const [val,setVal]= useState(0);

    useEffect(() => {
        // Function to fetch the current integer value
        const fetchIntegerValue = async () => {
          try {
            const response = await fetch('http://localhost:4000/admin/getdata/val');
            const data = await response.json();
            console.log("printing the data",data.data[0].value);
            // Update the state only if the value has changed
            if (data.data[0].value !== val) {
                setVal(data.data[0].value);
            }
          } catch (error) {
            console.error('Error fetching integer value:', error);
          }
        };
    
        // Initial fetch
        fetchIntegerValue();
    
        // Set up polling every 5 seconds
        const intervalId = setInterval(fetchIntegerValue, 5000);
    
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
      }, [val]);



  return (
    <div className='flex justify-center items-center mt-60 gap-2'>
        <p>Value is </p>
        <p>{val}</p>
    </div>
  )
}

export default DynamicComp