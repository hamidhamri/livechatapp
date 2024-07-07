import React from 'react'

export default function Loading() {
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      {/* You can add a spinner or any loading indicator here */}
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}
