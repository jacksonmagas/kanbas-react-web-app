import React, { useState } from "react";

const TrueFalseQuestionEditor: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [isTrue, setIsTrue] = useState<boolean>(true);

  // Handles input changes for the title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  // Handles input changes for the points
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPoints(Number(e.target.value));
  };

  // Handles input changes for the question
  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setQuestion(e.target.value);
  };

  // Handles form submission
  const handleSave = (): void => {
    const questionData = {
      title,
      points,
      question,
      correctAnswer: isTrue ? "True" : "False",
    };
    console.log("Saved Question:", questionData);
    alert("Question saved successfully!");
  };

  // Handles cancel action
  const handleCancel = (): void => {
    setTitle("");
    setPoints(0);
    setQuestion("");
    setIsTrue(true);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2>True/False Question Editor</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />
      </label>
      <label>
        Points:
        <input
          type="number"
          value={points}
          onChange={handlePointsChange}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
        />
      </label>
      <label>
        Question:
        <textarea
          value={question}
          onChange={handleQuestionChange}
          style={{ display: "block", width: "100%", height: "100px", marginBottom: "10px", padding: "8px" }}
        />
      </label>
      <div>
        <h3>Answer:</h3>
        <label>
          <input
            type="radio"
            name="trueFalse"
            value="True"
            checked={isTrue}
            onChange={() => setIsTrue(true)}
            style={{ marginRight: "8px" }}
          />
          True
        </label>
        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            name="trueFalse"
            value="False"
            checked={!isTrue}
            onChange={() => setIsTrue(false)}
            style={{ marginRight: "8px" }}
          />
          False
        </label>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleSave}
          style={{
            padding: "10px 15px",
            marginRight: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Save/Update Question
        </button>
        <button
          onClick={handleCancel}
          style={{
            padding: "10px 15px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TrueFalseQuestionEditor;
