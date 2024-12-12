import React from 'react'

function About() {
  return (
    <div className='min-h-screen w-full flex flex-col gap-10'>
        <div className='container-lg justify-center items-center text-center flex-row pt-10'>
            <div className='flex-1'>
            <h1 className='text-3xl'>What is cine?</h1>
            </div>
            <div className='flex-1 flex rounded-lg h-full w-full justify-center items-center bg-content1 box-border p-8'>
            <p>Cine is for those who desire to be in tune with the media they consume. It is THE way to understand your watch behaviours and connect with others who share the same taste in movies and tv.</p>
            </div>
        </div>
    </div>
  )
}

export default About