import { useNavigate } from "react-router-dom";

export function QuestionSampleContents({ question }) {
  const navigate = useNavigate();

  const WhatQuestion = (e) => {
    const questiontext = e.target.innerText; //記入した質問本文を定数に入れる
    navigate("/collectfeedback", { state: questiontext }); //ページ遷移と共に値を持っていく
  };

  return (
    <>
      <button className="whatQuestion" onClick={WhatQuestion}>
        {question}
      </button>
    </>
  );
}
