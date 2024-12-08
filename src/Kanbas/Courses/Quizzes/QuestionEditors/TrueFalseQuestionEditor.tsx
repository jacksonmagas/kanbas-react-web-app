import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export interface TrueFalseQuestion {
  question: string,
  correctAnswer: boolean
}

const TrueFalseQuestionEditor: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);

  const handleQuestionChange = (value: string): void => {
    setQuestion(value); 
  };

  const handleSave = (): void => {
    if (!question || correctAnswer === null) {
      alert("Please fill in the question and select the correct answer.");
      return;
    }

    const questionData: TrueFalseQuestion = {
      question,
      correctAnswer,
    };
    console.log("Saved Question:", questionData);
    alert("Question saved successfully!");
  };

  const handleCancel = (): void => {
    setQuestion("");
    setCorrectAnswer(null);
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
          value={question}
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
          <label style={{ marginRight: "10px", fontWeight: correctAnswer === true ? "bold" : "normal", color: correctAnswer === true ? "green" : "black" }}>
            <input
              type="radio"
              name="correctAnswer"
              value="true"
              checked={correctAnswer === true}
              onChange={() => setCorrectAnswer(true)}
              style={{ marginRight: "5px" }}
            />
            True
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <label style={{ marginRight: "10px", fontWeight: correctAnswer === false ? "bold" : "normal", color: correctAnswer === false ? "green" : "black" }}>
            <input
              type="radio"
              name="correctAnswer"
              value="false"
              checked={correctAnswer === false}
              onChange={() => setCorrectAnswer(false)}
              style={{ marginRight: "5px" }}
            />
            False
          </label>
        </div>
      </div>
      <div style={{ marginTop: "30px", textAlign: "left" }}>
        <button
          onClick={handleSave}
          style={{
            padding: "10px 15px",
            marginRight: "10px",
            backgroundColor: "#f44336", 
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update Question
        </button>
        <button
          onClick={handleCancel}
          style={{
            padding: "10px 15px",
            backgroundColor: "#D3D3D3", 
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TrueFalseQuestionEditor;