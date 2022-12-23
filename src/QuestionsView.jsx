import React, { useEffect, useState } from "react";
import Question from "./Question";
import he from "he";
import "./index.css"

export default function QuestionsView(props) {    
    const [answersToQuestions, setAnswersToQuestions] = useState([])
    useEffect(() => {
        const array = []
        for(let i = 0; i < props.questions.length; i++) {
            const question = props.questions[i]
            const answers = [...question.incorrect_answers, question.correct_answer]
            const shuffledAnswers = answers.sort(() => 0.5 - Math.random())  
            const answersEl = shuffledAnswers.map(answer => ({answer: answer, isSelected:false, isTrue:answer === question.correct_answer ? true:false})) 
            array.push(answersEl)
        }
        setAnswersToQuestions(array)
    }, [])


    function getQuestionsEl() {
        return props.questions.map((question, index) => 
        <Question question={question.question}>
            {answersToQuestions && answersToQuestions.length > 0 && getAnswerEl(answersToQuestions[index], index)}
        </Question>)
    }

    function selectAnswer(questionIndex, answerIndex) {
        const correctParentElment = answersToQuestions[questionIndex]
        const answer = correctParentElment.map((item, index) => index === answerIndex ? {...item, isSelected:true} : {...item, isSelected:false})
        const newArray = answersToQuestions.map((item, index) => index === questionIndex ? answer : item)
        console.log(newArray)
        setAnswersToQuestions(newArray)
    }

    function getAnswerEl(answers, questionIndex) {
        const array = []
        for(let i = 0; i < answers.length; i++) {
            const item = answers[i]
            array.push(<div onClick={() => selectAnswer(questionIndex, i)} className={item.isSelected ? "Question--answer selected" : "Question--answer"}>{he.decode(item.answer)}</div>)
        }

        return array
    }

    function setParamsAndNextPlayer() {
        const array = answersToQuestions.map((item, index) => (
            {
                question: props.questions[index].question,
                correctAnswer: item.find(t => t.isTrue),
                selectedAnswer: item.find(t => t.isSelected)    
            }))
        props.handleClick(array)
    }

    return (
        <div className="Questions">
            <div>{getQuestionsEl()}</div>
            <button onClick={setParamsAndNextPlayer}>Submit</button>
        </div>
    )
}