import React, { useState } from "react";

type Answer = {
  text: string;
};

const FillInTheBlankEditor: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([{ text: "" }]);

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

  // Handles adding a new answer
  const addAnswer = (): void => {
    setAnswers([...answers, { text: "" }]);
  };

  // Handles removing an answer
  const removeAnswer = (index: number): void => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  // Handles updating an answer's text
  const handleAnswerTextChange = (index: number, value: string): void => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].text = value;
    setAnswers(updatedAnswers);
  };

  // Handles form submission
  const handleSave = (): void => {
    const questionData = {
      title,
      points,
      question,
      possibleAnswers: answers.map((answer) => answer.text),
    };
    console.log("Saved Question:", questionData);
    alert("Question saved successfully!");
  };

  // Handles cancel action
  const handleCancel = (): void => {
    setTitle("");
    setPoints(0);
    setQuestion("");
    setAnswers([{ text: "" }]);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Fill in the Blank Question Editor</h2>
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
        <h3>Answers:</h3>
        {answers.map((answer, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={answer.text}
              onChange={(e) => handleAnswerTextChange(index, e.target.value)}
              style={{ width: "80%", marginRight: "10px", padding: "8px" }}
            />
            {answers.length > 1 && (
              <button onClick={() => removeAnswer(index)} style={{ padding: "5px 10px" }}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button onClick={addAnswer} style={{ padding: "10px 15px", marginTop: "10px" }}>
          + Add Another Answer
        </button>
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

export default FillInTheBlankEditor;
