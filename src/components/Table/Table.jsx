import React, { useContext } from "react";
import WordListItem from "../WordListItem/WordListItem";
import AddNewWord from "../AddNewWord/AddNewWord";
import styles from "./Table.module.css";

import { WordContext } from "../../context/WordContext";

export const TableComponent = () => {
  const { words, addWord, updateWord, deleteWord } = useContext(WordContext);

  const handleAddNewWord = async (newWord) => {
    console.log("newWord", newWord);
    addWord(newWord);
  };

  const handleUpdateWord = async (id, updatedWord) => {
    updateWord(id, updatedWord);
  };

  const handleDeleteWord = async (id) => {
    deleteWord(id);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.addNewWordContainer}>
        <AddNewWord onAdd={handleAddNewWord} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Theme</th>
            <th>English</th>
            <th>Transcription</th>
            <th>Translation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => (
            <WordListItem
              key={word.id || index}
              word={word}
              onEdit={handleUpdateWord}
              onDelete={handleDeleteWord}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
