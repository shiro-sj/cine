import React from 'react'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Link from 'next/link';


function LogBar() {
  return (
    <div className='content-h'>
        
        <div className='flex-1'>
            <Link href='/protected/upload' className='flex justify-center text-xl flex-col items-center hover:scale-105'>
                <FileUploadRoundedIcon fontSize='inherit' className='flex-1'/>
                <p className='flex-1'>upload</p>
            </Link>
        </div>
        <div className='flex-1'>
            <Link href='/protected/log' className='flex justify-center text-xl flex-col items-center hover:scale-105'>
                <AddBoxRoundedIcon fontSize='inherit' className='flex-1'/>
                <p className='flex-1'>log</p>
            </Link>
        </div>
        <div className='flex-1'>
            <Link href='/protected/upload' className='flex justify-center text-xl flex-col items-center hover:scale-105'>
                <SearchRoundedIcon fontSize='inherit' className='flex-1'/>
                <p className='flex-1'>search</p>
            </Link>
        </div>
        
        
     
        
    </div>
  )
}

export default LogBar