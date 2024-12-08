import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import { QuizQuestion } from ".";

type Answer = {
  text: string;
  correct: boolean;
};

export interface MultipleChoiceAnswer {
  answers: Answer[],
}

function isAnswer(obj: any): obj is Answer {
  return obj && typeof obj.text === 'string' && typeof obj.correct === 'boolean';
}

export function isMultipleChoiceAnswer(obj: any): obj is MultipleChoiceAnswer {
  return (
    obj &&
    Array.isArray(obj.answers) &&
    obj.answers.every(isAnswer)
  );
}

const MultipleChoiceEditor = ({question, setQuestion} : {question: QuizQuestion, setQuestion : (question: QuizQuestion) => void}) => {
  const handleQuestionChange = (value: string): void => {
    setQuestion({...question, question: value});
  };

  const setAnswers = (answers: Answer[]) => {
    setQuestion({...question, answer: {answers: answers}})
  }

  const addAnswer = (): void => {
    if (isMultipleChoiceAnswer(question.answer)) {
      setAnswers([...question.answer.answers, { text: "", correct: false }]);
    } else {
      setAnswers([{ text: "", correct: true }]);
    }
  };

  const removeAnswer = (index: number): void => {
    if (isMultipleChoiceAnswer(question.answer)) {
      setAnswers(question.answer.answers.filter((_, i) => i !== index));
    }
  };

  const handleAnswerTextChange = (index: number, value: string): void => {
    if (isMultipleChoiceAnswer(question.answer)) {
      const updatedAnswers = [...question.answer.answers];
      updatedAnswers[index].text = value;
      setAnswers(updatedAnswers);
    }
  };

  const handleCorrectAnswerChange = (index: number): void => {
    if (isMultipleChoiceAnswer(question.answer)) {
      const updatedAnswers = question.answer.answers.map((answer, i) => ({
        ...answer,
        correct: i === index,
      }));
      setAnswers(updatedAnswers);
    }
  };

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          borderRadius: "5px",
        }}
      >
         <p>
         Enter your question and multiple answers, then select the one correct answer.
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
        {isMultipleChoiceAnswer(question.answer) && question.answer.answers.map((answer, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
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
            <button
              onClick={() => handleCorrectAnswerChange(index)}
              style={{
                color: answer.correct ? "green" : "#808080",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "16px",
                marginRight: "10px",
              }}
            >
              {answer.correct ? "✓ Correct Answer" : "Mark as Correct"}
            </button>
            {isMultipleChoiceAnswer(question.answer) && question.answer.answers.length > 1 && (
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
                🗑️
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

export default MultipleChoiceEditor;