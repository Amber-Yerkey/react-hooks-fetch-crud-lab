import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((questions) => {
        setQuestions(questions)
        // console.log(questions)
      })
    }, [])

    function onClickDelete(id){
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      })
      // console.log("Click")
        .then((r) => r.json())
        .then(() => 
          {const updatedQuestions = questions.filter((question) => question.id !== id)
          setQuestions(updatedQuestions)
          }
    )}

    const qItems = questions.map((question) => {
      return <QuestionItem key={question.id} question={question} onClickDelete={onClickDelete} />
    })
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{qItems}</ul>
    </section>
  );
}

export default QuestionList;
