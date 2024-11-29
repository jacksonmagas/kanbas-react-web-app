import React, { useState } from "react";

// Define the type for a choice
type Choice = {
  text: string;
  isCorrect: boolean;
};

const MultipleChoiceEditor: React.FC = () => {
  const [choices, setChoices] = useState<Choice[]>([
    { text: "", isCorrect: false },
  ]);

  const [title, setTitle] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");

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

  // Handles adding a new choice
  const addChoice = (): void => {
    setChoices([...choices, { text: "", isCorrect: false }]);
  };

  // Handles removing a choice
  const removeChoice = (index: number): void => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  // Handles updating a choice's text
  const handleChoiceTextChange = (index: number, value: string): void => {
    const updatedChoices = [...choices];
    updatedChoices[index].text = value;
    setChoices(updatedChoices);
  };

  // Handles marking a choice as the correct answer
  const markCorrectAnswer = (index: number): void => {
    const updatedChoices = choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setChoices(updatedChoices);
  };

  return (
    <div>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <label>
        Points:
        <input type="number" value={points} onChange={handlePointsChange} />
      </label>
      <label>
        Question:
        <textarea value={question} onChange={handleQuestionChange}></textarea>
      </label>
      <div>
        {choices.map((choice, index) => (
          <div key={index}>
            <input
              type="radio"
              name="correctAnswer"
              checked={choice.isCorrect}
              onChange={() => markCorrectAnswer(index)}
            />
            <input
              type="text"
              value={choice.text}
              onChange={(e) => handleChoiceTextChange(index, e.target.value)}
            />
            <button onClick={() => removeChoice(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addChoice}>Add Choice</button>
      </div>
    </div>
  );
};

export default MultipleChoiceEditor;
