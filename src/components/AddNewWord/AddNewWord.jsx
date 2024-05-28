import React, { useState } from "react";
import styles from "./AddNewWord.module.css";

export default function AddNewWord({ onAdd }) {
  const [english, setEnglish] = useState("");
  const [transcription, setTranscription] = useState("");
  const [russian, setRussian] = useState("");
  const [addedWord, setAddedWord] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleAddNew = () => {
    if (english && transcription && russian) {
      const newWord = { english, transcription, russian };
      onAdd(newWord);
      setAddedWord(newWord);
      setEnglish("");
      setTranscription("");
      setRussian("");
      setIsSubmitDisabled(true);
      console.log("New word added:", newWord);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const checkFormValidity = () => {
    if (english && transcription && russian) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  const handleChange = (event) => {
    setAddedWord(null);
    const { name, value } = event.target;
    if (name === "english") setEnglish(value);
    else if (name === "transcription") setTranscription(value);
    else if (name === "russian") setRussian(value);
    checkFormValidity();
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Word"
        value={english}
        name="english"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Transcription"
        value={transcription}
        name="transcription"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Translation"
        value={russian}
        name="russian"
        onChange={handleChange}
      />
      <button onClick={handleAddNew} disabled={isSubmitDisabled}>
        Add New
      </button>
      {addedWord && (
        <div>
          <b>You've added a new word:</b>
          <br /> English: {addedWord.english}
          <br /> Transcription: {addedWord.transcription}
          <br /> Russian: {addedWord.russian}
        </div>
      )}
    </div>
  );
}
