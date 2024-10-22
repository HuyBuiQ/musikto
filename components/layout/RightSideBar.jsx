import React from 'react'

const RightSideBar = () => {
  return (
    <div className='sticky right-0 top-0 z-20 h-screen flex flex-col gap-12 overflow-auto pl-6 pr-10 '>
      <div className='flex flex-col gap-4'>
        <h4 className='text-heading4-bold text-dark-1'>Following</h4>
        <div className='flex flex-col gap-4'>Mapping User</div>

      </div>
      
      <div className='flex flex-col gap-4'>
        <h4 className='text-heading4-bold text-dark-1'>Suggested User</h4>
        <div className='flex flex-col gap-4'>Mapping User</div>

      </div>
      </div>
  )
}

export default RightSideBar