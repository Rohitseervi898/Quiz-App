import React,{useState} from "react";
import QuestionContext from "../context/QuestionContext";

const QuestionContextProvider = ({children})=>{
    const [language,setLanguage]=useState("")
    const [difficulty,setDifficulty] = useState("")

    return(
        <QuestionContext.Provider value={{language, setLanguage, difficulty, setDifficulty}}>
            {children}
        </QuestionContext.Provider>
    )
}

export default QuestionContextProvider