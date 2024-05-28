import React, { useState } from "react";
import Button from "../Button/Button";
import styles from "./WordListItem.module.css";

export default function WordListItem({ word, onEdit, onDelete }) {
  const [isEdited, setIsEdited] = useState(false);
  const [values, setValues] = useState({
    english: word.english || "",
    transcription: word.transcription || "",
    russian: word.russian || "",
    tags: word.tags || "",
  });

  const [inputErrors, setInputErrors] = useState({
    english: !word.english,
    transcription: !word.transcription,
    russian: !word.russian,
  });

  const handleEdit = (event) => {
    if (isEdited) {
      if (
        !inputErrors.english &&
        !inputErrors.transcription &&
        !inputErrors.russian
      ) {
        onEdit(word.id, values);
        setIsEdited(false);
      } else {
        alert("Fill in all fields before saving.");
      }
    } else {
      setIsEdited(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value.trim(),
    }));
  };

  const handleDelete = () => {
    onDelete(word.id);
  };

  // Проверка наличия объекта word
  if (!word) {
    return (
      <tr>
        <td colSpan="5">Word is missing</td>
      </tr>
    );
  }

  // Проверка наличия необходимых полей
  if (!word.english || !word.transcription || !word.russian) {
    return (
      <tr>
        <td colSpan="5">Word data is incomplete</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{word.tags}</td>
      <td>
        {isEdited ? (
          <input
            type="text"
            className={`${inputErrors.english && styles.error}`}
            name="english"
            value={values.english}
            onChange={handleChange}
          />
        ) : (
          values.english
        )}
      </td>
      <td>
        {isEdited ? (
          <input
            type="text"
            className={`${inputErrors.transcription && styles.error}`}
            name="transcription"
            value={values.transcription}
            onChange={handleChange}
          />
        ) : (
          values.transcription
        )}
      </td>
      <td>
        {isEdited ? (
          <input
            type="text"
            className={`${inputErrors.russian && styles.error}`}
            name="russian"
            value={values.russian}
            onChange={handleChange}
          />
        ) : (
          values.russian
        )}
      </td>
      <td>
        {isEdited ? (
          <Button
            text="save"
            disabled={
              inputErrors.english ||
              inputErrors.transcription ||
              inputErrors.russian ||
              !values.english.trim() ||
              !values.transcription.trim() ||
              !values.russian.trim()
            }
            onClick={handleEdit}
          />
        ) : (
          <Button text="edit" onClick={handleEdit} />
        )}
        <Button text="delete" onClick={handleDelete} />
      </td>
    </tr>
  );
}
