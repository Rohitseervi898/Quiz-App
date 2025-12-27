import React,{useContext, useEffect, useState, useRef} from 'react'
import {useNavigate} from "react-router-dom"
import questions from "../Questions.json"
import QuestionContext from '../context/QuestionContext'

const Questions = () => {

    const {language, difficulty}=useContext(QuestionContext)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score,setScore]=useState(parseInt(localStorage.getItem('score'))||0);
    const [timer, setTimer]= useState(parseInt(localStorage.getItem('timer'))||60);
    const [quiz, setQuiz]=useState(JSON.parse(localStorage.getItem('quiz')) || []);
    const [quizOver, setQuizOver]=useState(false);
    const [pause, setPause]=useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const timerIntervalRef = useRef(null);


    useEffect(()=>{
        if(!quiz.length){
            const questionLanguage=questions.find(q=>q.language===language)
            const questionDifficulty=questionLanguage.difficulty.find(d=>d[difficulty])
            const question=questionDifficulty[difficulty];
            const shuffled = shuffleArray(question).slice(0,5)
            setQuiz(shuffled)
            localStorage.setItem("quiz",JSON.stringify(shuffled) );
        }
    },[quiz.length])
    

    function shuffleArray(array){
        const shuffledArray=[...array];
        for(let i=shuffledArray.length-1;i>0;i--){
            const j= Math.floor(Math.random()*(i+1));
            [shuffledArray[i],shuffledArray[j]]=[shuffledArray[j],shuffledArray[i]];
        }
        return shuffledArray;
    }
    
    useEffect(()=>{
        if(pause) return;

        timerIntervalRef.current = setInterval(()=>{
            setTimer((prev)=>{
                const newTimer = prev - 1;
                localStorage.setItem("timer", newTimer);
                if(newTimer <= 0){
                    clearInterval(timerIntervalRef.current);
                    setQuizOver(true);
                    return 0;
                }
                return newTimer;
            });
        },1000);
        return () => clearInterval(timerIntervalRef.current);
    },[pause]);


    const navigate=useNavigate()

    const checkAnswer=(answer)=>{
        setSelectedAnswer(answer);
        setPause(true);
        if(answer===quiz[currentIndex].answer){
             setScore(score+1);
        }
        
        setTimeout(()=>{
            
            if(currentIndex+1<quiz.length){
                setCurrentIndex(currentIndex+1)
                setSelectedAnswer(null);
            }
            else{
                setQuizOver(true)
            }
            setPause(false);
        },1000)
    }

    const Restart=()=>{
        setCurrentIndex(0);
        setScore(0);
        setTimer(60);
        localStorage.setItem("timer",60)
        setQuiz([]);
        setQuizOver(false);
        setSelectedAnswer(null);
        return navigate("/")
    }

    if (!quiz.length) {
        return <p>Loading questions...</p>; // Show a loading message while quiz is being prepared
    }

    return (
        <>
        {!quizOver?(
            <div className='flex flex-col max-w-130 w-102 m-auto justify-center h-screen px-1.5' >
                <div className='flex items-center text-2xl'>Time left: {timer}</div>
                <p className=''>{quiz[currentIndex].question}</p>
                {quiz[currentIndex].options.map((option,index)=>(
                    <button key={index} className={`w-full border rounded p-1 m-2 ${selectedAnswer ? (option === quiz[currentIndex].answer ? 'bg-green-300' : (option === selectedAnswer ? 'bg-red-300' : 'bg-gray-300')) : 'bg-blue-300'}`} onClick={()=> selectedAnswer ? null : checkAnswer(option)} disabled={!!selectedAnswer}>{option}</button>
                ))}
                <p className='self-center m-1'>{currentIndex+1}/5</p>
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