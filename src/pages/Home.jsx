import React, { useState, useContext } from 'react'
import {Link, useNavigate} from "react-router-dom"
import QuestionContext from '../context/QuestionContext';

function Home() {

    const {language, setLanguage, difficulty, setDifficulty}=useContext(QuestionContext);

    const navigate= useNavigate();

    const handleQuiz=(e)=>{
         e.preventDefault(); // Prevent form submission default behavior
        return navigate("/quiz");
    }

  return (
    <>
    <div className='flex flex-col max-w-130 w-102 m-auto items-center justify-center h-screen px-1.5'>
        <h1 className='text-4xl font-bold'>Welcome To Quize App</h1>
            <form onSubmit={handleQuiz} className='flex flex-col gap-4 py-14'>
                <div className='flex flex-col gap-4 w-80 py-14'>
                <label htmlFor="language">Select the Language 
                    <select name="language" id="language" className='border rounded w-full py-2 px-3' value={language} onChange={(e)=>{setLanguage(e.target.value)}}>
                        <option value="select" selected>Select</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        
                    </select>
                </label>
                <label htmlFor="difficulty">Select the Language 
                    <select name="difficulty" id="difficulty" className='border rounded w-full py-2 px-3' value={difficulty} onChange={(e)=>{setDifficulty(e.target.value)}}>
                        <option value="select" selected>Select</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </label>
                <button type='submit' className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">Submit</button>
                </div>
            </form>
    </div>
    
    </>
  )
}

export default Home