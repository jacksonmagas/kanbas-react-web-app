import React, { useState } from "react";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";

const QuestionEditor: React.FC = () => {
  const [questionType, setQuestionType] = useState<string>("True/False");

  const renderEditor = (): JSX.Element => {
    switch (questionType) {
      case "True/False":
        return <TrueFalseQuestionEditor />;
      case "Multiple Choice":
        return <MultipleChoiceEditor />;
      case "Fill in the blank":
        return <FillInTheBlankEditor />;
      default:
        return <div>Please select a question type.</div>;
    }
  };

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <input
          id="question-name"
          className="input-control"
          placeholder="Question Title"
          style={{
            flexGrow: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <select
          className="select-control"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            flexShrink: 0,
          }}
        >
          <option>True/False</option>
          <option>Multiple Choice</option>
          <option>Fill in the blank</option>
        </select>
        <span
          className="fw-bold"
          style={{
            flexShrink: 0,
            padding: "0 5px",
          }}
        >
          pts:
        </span>
        <input
          className="input-control flex-end"
          type="number"
          placeholder="Points"
          style={{
            width: "100px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <hr style={{ borderTop: "1px solid #ccc" }} />
      <div>{renderEditor()}</div>
    </div>
  );
};

export default QuestionEditor;