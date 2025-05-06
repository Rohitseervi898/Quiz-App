import React,{useState} from "react";
import QuestionContext from "../context/QuestionContext";

const QuestionContextProvider = ({children})=>{
    const [language,setLanguage]=useState("")
    const [difficulty,setDifficulty] = useState("")
    const [score,setScore] =useState(0)
    const [count,setCount]=useState(1)

    return(
        <QuestionContext.Provider value={{language, setLanguage, difficulty, setDifficulty, score,setScore, count, setCount}}>
            {children}
        </QuestionContext.Provider>
    )
}

export default QuestionContextProvider