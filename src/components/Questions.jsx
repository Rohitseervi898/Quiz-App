import React,{useContext, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import questions from "../Questions.json"
import QuestionContext from '../context/QuestionContext'

const Questions = () => {

    const {language, difficulty}=useContext(QuestionContext)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score,setScore]=useState(parseInt(localStorage.getItem('score'))||0);
    const [timer, setTimer]= useState(parseInt(localStorage.getItem('timer'))||60);
    const [quiz, setQuiz]=useState([]);
    const [quizOver, setQuizOver]=useState(true);


    useEffect(()=>{
        if(!quiz.length){
            const questionLanguage=questions.find(q=>q.language===language)
            const questionDifficulty=questionLanguage.difficulty.find(d=>d[difficulty])
            const question=questionDifficulty[difficulty];
            const shuffled = shuffleArray(question).slice(0,5)
            setQuiz(shuffled)
        }
    },[language || difficulty || quiz.length])
    

    function shuffleArray(array){
        const shuffledArray=[...array];
        for(let i=shuffledArray.length-1;i>0;i--){
            const j= Math.floor(Math.random()*(i+1));
            [shuffledArray[i],shuffledArray[j]]=[shuffledArray[j],shuffledArray[i]];
        }
        return shuffledArray;
    }


    // console.log(questionLanguage)
    // console.log(questionDifficulty)
    // console.log(qnumber)
    // console.log(questionDifficulty[difficulty])


    const navigate=useNavigate()

    const checkAnswer=(answer)=>{
        if(answer===quiz[currentIndex].answer){
             setScore(score+1);
        }
        
        if(currentIndex+1<quiz.length){
            setCurrentIndex(currentIndex+1)
        }
        else{
            setTimeout(() => {
                // alert(`Your score is ${score + (answer === quiz[currentIndex].answer ? 1 : 0)} `);
                // setCurrentIndex(0);
                // setScore(0);
                setQuizOver(true)
                // navigate('/');
            }, 0);
        }
    }

    const Restart=()=>{
        setCurrentIndex(0);
        setScore(0);
        setQuiz([]);
        setQuizOver(false);
        return navigate("/")
    }

    if (!quiz.length) {
        return <p>Loading questions...</p>; // Show a loading message while quiz is being prepared
    }

    return (
        <>
        {!quizOver?(
            <div className='flex flex-col max-w-130 w-102 m-auto justify-center h-screen px-1.5' >
                <p>{currentIndex+1}/5</p>
                <p className=''>{quiz[currentIndex].question}</p>
                {quiz[currentIndex].options.map((option,index)=>(
                    <button key={index} className='w-full bg-blue-300 border rounded p-1 m-2' onClick={()=>checkAnswer(option)}>{option}</button>
                ))}
            </div>
        ):(
            <div className='flex flex-col max-w-130 w-102 m-auto items-center justify-center h-screen px-1.5' >
                <h1 className=''>Result</h1>
                <p>You scored : {score}</p>
                <p>Want to try again?<button className='border rounded w-30% bg-blue-300 p-1 m-1' onClick={Restart}>Restart</button></p>
            </div>
        )}
        
        </>
    )
}

export default Questions