'use client'
import React, { useState } from 'react';
import UploadGame from "../../../../components/UploadGame/page";

const Upload = () => {
  return (
    <div className='grid md:grid-cols-5 bg-gray-800'>
      <div></div>
      <div className='col-span-3'>
        <UploadGame />
      </div>
      <div></div>
    </div>
  );
};


export default Upload;
