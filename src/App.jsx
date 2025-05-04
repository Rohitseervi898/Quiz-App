import React,{ useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import QuestionContextProvider from './context/QuestionContextProvider'

function App() {

  return (
    <QuestionContextProvider >
    <div className='flex flex-col max-w-130 w-1vw m-auto justify-center h-screen px-1.5'>
      <Outlet />
    </div>
    </QuestionContextProvider>
  )
}

export default App
