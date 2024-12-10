import React from 'react'
import Footer from '../components/common/Footer';
import FirstComp from '../components/core/Homepage/FirstComp';
import SecondComp from '../components/core/Homepage/SecondComp';

const Homepage = () => {
  return (
    <div className='m-0'>
    <FirstComp></FirstComp>
    <SecondComp></SecondComp>
    <Footer></Footer>
    </div>
  )
}

export default Homepage