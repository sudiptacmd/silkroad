import React, { useEffect, useState } from "react";
import axios from "axios";
export default function QnA(props) {
  const { productId } = props;
  const [qna, setQna] = useState("");
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:5100/qnaView", { product_id: productId })
      .then((r) => {
        setQuestions(r.data);
      });
  }, [count]);
  const sendQna = (e) => {
    ///qnaView
    e.preventDefault;
    axios
      .post("http://localhost:5100/qnaView/", {
        question: qna,
        product_id: productId,
      })
      .then(setCount((c) => c + 1))
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <h1>Ask a question</h1>
      <textarea value={qna} onChange={(e) => setQna(e.target.value)}></textarea>
      <button onClick={sendQna}>Submit</button>
      {Array.isArray(questions) &&
        questions.map((q, i) => (
          <div key={i}>
            <p>{q.question}</p>
          </div>
        ))}
    </div>
  );
}
