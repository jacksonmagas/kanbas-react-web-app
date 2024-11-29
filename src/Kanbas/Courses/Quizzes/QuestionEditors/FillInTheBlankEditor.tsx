import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import { FaTrash } from "react-icons/fa";

type Answer = {
  text: string;
};

const FillInTheBlankEditor: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([{ text: "" }]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPoints(Number(e.target.value));
  };

  const handleQuestionChange = (value: string): void => {
    setQuestion(value); 
  };

  const addAnswer = (): void => {
    setAnswers([...answers, { text: "" }]);
  };

  const removeAnswer = (index: number): void => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleAnswerTextChange = (index: number, value: string): void => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].text = value;
    setAnswers(updatedAnswers);
  };

  const handleSave = (): void => {
    const trimmedAnswers = answers.map((a) => a.text.trim()).filter((a) => a !== "");
    if (!title || !question || trimmedAnswers.length === 0) {
      alert("Please fill in all fields before saving.");
      return;
    }

    const questionData = {
      title,
      points,
      question,
      possibleAnswers: trimmedAnswers,
    };
    console.log("Saved Question:", questionData);
    alert("Question saved successfully!");
  };

  const handleCancel = (): void => {
    setTitle("");
    setPoints(0);
    setQuestion("");
    setAnswers([{ text: "" }]);
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
        {answers.map((answer, index) => (
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
            {answers.length > 1 && (
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

export default FillInTheBlankEditor;