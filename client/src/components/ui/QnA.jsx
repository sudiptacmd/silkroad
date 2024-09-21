import React, { useEffect, useState } from "react";
import axios from "axios";
export default function QnA(props) {
  const { productId } = props;
  const [qna, setQna] = useState("");
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    axios.get(`http://localhost:5100/qnaView/${productId}`).then((r) => {
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
    <div className="mt-6 w-2/3 mx-auto flex flex-col gap-2">
      <h1 className="text-xl font-semibold text-center">Ask a question</h1>
      <textarea
        value={qna}
        onChange={(e) => setQna(e.target.value)}
        className="w-full p-2 rounded-lg"
      ></textarea>
      <button
        onClick={sendQna}
        className="bg-green-1 text-[#fff] px-4 py-1 rounded-lg mx-auto font-semibold hover:bg-green-2 duration-300"
      >
        <p>Submit</p>
      </button>
      {Array.isArray(questions) &&
        questions.map((q, i) => (
          <div
            key={i}
            className="p-4 bg-[#f1f0f0] my-4 flex flex-col gap-1 hover:shadow-lg duration-300"
          >
            <div className="flex flex-row gap-2 items-center font-semibold">
              <img
                src={
                  q.photo
                    ? q.photo
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt=""
                className="w-8 h-8 rounded-full object-contain border-green-1 border-2"
              />
              <p>
                {capitalize(q.firstName)} {capitalize(q.lastName)}'s Question{" "}
              </p>
            </div>
            <p className="font-medium ml-10">{q.question}</p>
            {q.answer ? (
              <p className="text-green-1 ml-20"> : {q.answer}</p>
            ) : (
              <p className="text-red-1 ml-20"> : Not answered yet</p>
            )}
          </div>
        ))}
    </div>
  );
}
