import React, { useState, createContext, useEffect } from "react";
const API_ALL_WORDS = "http://itgirlschool.justmakeit.ru/api/words";

const WordContext = createContext();

const WordProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [learnedCount, setLearnedCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(API_ALL_WORDS);
      if (!response.ok) {
        throw new Error("Failed to fetch words");
      }
      const data = await response.json();
      setWords(data);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const toggleLearned = (word) => {
    const updatedWords = words.map((w) =>
      w.english === word.english ? { ...w, learned: !w.learned } : w
    );
    setWords(updatedWords);
    const newLearnedCount = updatedWords.filter((w) => w.learned).length;
    setLearnedCount(newLearnedCount);
  };

  const addWord = async (newWord) => {
    try {
      const response = await fetch(`/api/words/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          english: newWord.english,
          transcription: newWord.transcription,
          russian: newWord.russian,
          tags: "",
          tags_json: '[""]',
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch add words");
      }

      setWords([...words, newWord]);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const updateWord = async (id, updatedWord) => {
    const body = {
      id: id,
      english: updatedWord.english,
      russian: updatedWord.russian,
      transcription: updatedWord.transcription,
      tags: "",
      tags_json: '[""]',
    };

    try {
      const response = await fetch(`${API_ALL_WORDS}/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to update word");
      }
      const data = await response.json();

      setWords((prevWords) =>
        prevWords.map((word) => (word.id === id ? data : word))
      );
    } catch (error) {
      console.error("Error updating word:", error);
    }
  };

  const deleteWord = async (wordId) => {
    try {
      const response = await fetch(`${API_ALL_WORDS}/${wordId}/delete`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to delete word");
      }
      console.log(words);
      setWords(words.filter((word) => word.id !== wordId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <WordContext.Provider
      value={{
        words,
        setWords,
        addWord,
        updateWord,
        deleteWord,
        toggleLearned,
        learnedCount,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

export { WordProvider, WordContext };
