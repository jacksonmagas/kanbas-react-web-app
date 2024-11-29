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
    <div>
      <div className="div-flex">
        <input id="question-name" className="input-control" placeholder="Question Title" />
        <select
          className="select-control"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option>True/False</option>
          <option>Multiple Choice</option>
          <option>Fill in the blank</option>
        </select>
        <span className="fw-bold">pts:</span>
        <input className="input-control flex-end" type="number" placeholder="Points" />
      </div>
      <hr />
      <div>{renderEditor()}</div>
    </div>
  );
};

export default QuestionEditor;
