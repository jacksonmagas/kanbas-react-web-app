import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuizQuestion } from ".";

export interface TrueFalseAnswer {
  correctAnswer: boolean
}

export function isTrueFalseAnswer(obj: any): obj is TrueFalseAnswer {
  if (!(obj && typeof obj.correctAnswer === 'boolean')) {
    console.log(`malformed truefalse answer ${JSON.stringify(obj)}`)
    return false
  }
  return true
}

const TrueFalseQuestionEditor= ({question, setQuestion} : {question: QuizQuestion, setQuestion : (question: QuizQuestion) => void}) => {
  const handleQuestionChange = (value: string): void => {
    setQuestion({...question, question: value}); 
  };

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
        <p>
          Enter your question text, then select if True or False is the correct answer.
        </p>
        <label>
          <strong>Question:</strong>
        </label>
        <ReactQuill
          value={question.question}
          onChange={handleQuestionChange}
          style={{
            marginTop: "10px",
            backgroundColor: "white",
            width: "100%", 
            minHeight: "90px",
          }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Answers:</h3>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <label style={{ marginRight: "10px",
              fontWeight: isTrueFalseAnswer(question.answer) && question.answer.correctAnswer === true ? "bold" : "normal",
              color: isTrueFalseAnswer(question.answer) && question.answer.correctAnswer === true ? "green" : "black" }}>
            <input
              type="radio"
              name="correctAnswer"
              value="true"
              checked={isTrueFalseAnswer(question.answer) && question.answer.correctAnswer === true}
              onChange={() => setQuestion({...question, answer: {correctAnswer: true}})}
              style={{ marginRight: "5px" }}
            />
            True
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <label style={{ marginRight: "10px", fontWeight: isTrueFalseAnswer(question.answer) && question.answer.correctAnswer === false ? "bold" : "normal",
                  color: isTrueFalseAnswer(question.answer) && question.answer.correctAnswer === false ? "green" : "black" }}>
            <input
              type="radio"
              name="correctAnswer"
              value="false"
              checked={isTrueFalseAnswer(question.answer) && question.answer.correctAnswer === false}
              onChange={() => setQuestion({...question, answer: {correctAnswer: false}})}
              style={{ marginRight: "5px" }}
            />
            False
          </label>
        </div>
      </div>
    </div>
  );
};

export default TrueFalseQuestionEditor;