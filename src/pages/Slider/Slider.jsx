import React, { useState, useEffect } from "react";
import MainPage from "../MainPage/MainPage";
import SliderButtons from "../../components/SliderButtons/SliderButtons";
import styles from "./Slider.module.css";
import { API_ALL_WORDS } from "../../utils/constants";

const Slider = () => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(API_ALL_WORDS);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWords(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + words.length) % words.length
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const currentWord = words[currentIndex];

  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <SliderButtons onPrev={handlePrev} onNext={handleNext} type="prev" />
        <MainPage key={currentWord.english} word={currentWord} />
        <SliderButtons onPrev={handlePrev} onNext={handleNext} type="next" />
      </div>
    </div>
  );
};

export default Slider;
