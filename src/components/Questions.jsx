import React from 'react'

const Questions = () => {
    const checkAnswer=(e)=>{
        const selectedAnswer = e.target.innerText;
    
    }
    return (
        <>
        <div className='flex flex-col max-w-130 w-1vw m-auto justify-center h-screen px-1.5' >
            <p>1/5</p>
            <p className=''>Question</p>
            <button className='w-full bg-blue-300 border rounded p-1 m-2' onClick={checkAnswer}>option 1</button>
            <button className='w-full bg-blue-300 border rounded p-1 m-2' onClick={checkAnswer}>option 2</button>
            <button className='w-full bg-blue-300 border rounded p-1 m-2' onClick={checkAnswer}>option 3</button>
            <button className='w-full bg-blue-300 border rounded p-1 m-2' onClick={checkAnswer}>option 4</button>
        </div>
        </>
    )
}

export default Questions