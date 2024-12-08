import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import { QuizQuestion } from ".";

type Answer = {
  text: string,
  caseSensitive: boolean
};

export interface FillInTheBlankAnswer {
  answers: Answer[]
}

function isAnswer(obj: any): obj is Answer {
  return obj && typeof obj.text === 'string' && typeof obj.caseSensitive === 'boolean';
}

export function isFillInTheBlankAnswer(obj: any): obj is FillInTheBlankAnswer {
  return (
    obj &&
    Array.isArray(obj.answers) &&
    obj.answers.every(isAnswer)
  );
}

const FillInTheBlankEditor = ({question, setQuestion} : {question: QuizQuestion, setQuestion : (question: QuizQuestion) => void}) => {
  const handleQuestionChange = (value: string): void => {
    setQuestion({...question, question: value}); 
  };

  const setAnswers = (answers: Answer[]) => {
    setQuestion({...question, answer: {answers: answers}})
  }

  const addAnswer = (): void => {
    if (isFillInTheBlankAnswer(question.answer)) {
      setAnswers([...question.answer.answers, { text: "", caseSensitive: false }]);
    } else {
      setAnswers([{ text: "", caseSensitive: false}])
    }
  };

  const removeAnswer = (index: number): void => {
    if (isFillInTheBlankAnswer(question.answer)) {
      setAnswers(question.answer.answers.filter((_, i) => i !== index));
    }
  };

  const handleAnswerTextChange = (index: number, value: string): void => {
    if (isFillInTheBlankAnswer(question.answer)) {
      const updatedAnswers = [...question.answer.answers];
      updatedAnswers[index].text = value;
      setAnswers(updatedAnswers);
    }
  };

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
      <p>
      Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.
        </p>
        <label>
          <strong>Question:</strong>
        </label>
        <div style={{ marginTop: "10px", color: "#888" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <span>Edit</span>
            <span>View</span>
            <span>Insert</span>
            <span>Format</span>
            <span>Tools</span>
            <span>Table</span>
          </div>
        </div>
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
        {isFillInTheBlankAnswer(question.answer) && question.answer.answers.map((answer, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
              type="text"
              value={answer.text}
              onChange={(e) => handleAnswerTextChange(index, e.target.value)}
              placeholder={`Possible Answer ${index + 1}`}
              style={{
                flexGrow: 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            />
            {isFillInTheBlankAnswer(question.answer) && question.answer.answers.length > 1 && (
              <button
                onClick={() => removeAnswer(index)}
                style={{
                  color: "#808080",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                🗑️ {/* Trash icon */}
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addAnswer}
          style={{
            color: "red",
            background: "none", 
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          + Add Another Answer
        </button>
      </div>
    </div>
  );
};

export default FillInTheBlankEditor;