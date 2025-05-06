import React,{useContext} from 'react'
import {useNavigate} from "react-router-dom"
import questions from "../Questions.json"
import QuestionContext from '../context/QuestionContext'

const Questions = () => {

    const {language, difficulty,score,setScore,count,setCount}=useContext(QuestionContext)

    let qnumber=Math.floor(Math.random()*100%15+1)
    const questionLanguage=questions.find(q=>q.language===language)
    const questionDifficulty=questionLanguage.difficulty.find(d=>d[difficulty])
    const question=questionDifficulty[difficulty];
    // console.log(questionLanguage)
    // console.log(questionDifficulty)
    // console.log(qnumber)
    // console.log(questionDifficulty[difficulty])


    const navigate=useNavigate()

    const checkAnswer=(e)=>{
        e.preventDefault()
        const selectedAnswer = e.target.innerText;
        if(selectedAnswer===question[qnumber].answer){
            setScore(score+1);
        }
        setCount(count+1)
        if(count===5){
            alert(`Your score is ${score} `)
            setCount(0);
            setScore(0);
            return navigate('/')
        }
        return navigate('/quiz')
    }

    return (
        <>
        <div className='flex flex-col max-w-130 w-102 m-auto justify-center h-screen px-1.5' >
            <p>{count}/5</p>
            <p className=''>{question[qnumber].question}</p>
            {question[qnumber].options.map((option,index)=>(
                <button key={index} className='w-full bg-blue-300 border rounded p-1 m-2' onClick={checkAnswer}>{option}</button>
            ))}
        </div>
        </>
    )
}

export default Questions