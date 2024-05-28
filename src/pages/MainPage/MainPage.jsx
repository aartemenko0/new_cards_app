import React, { useState, useRef, useEffect, useContext } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { WordContext } from "../../context/WordContext";
import styles from "./MainPage.module.css";

const MainPage = ({ word }) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const { toggleLearned, learnedCount } = useContext(WordContext);
  const translationButtonRef = useRef(null);

  useEffect(() => {
    if (translationButtonRef.current) {
      translationButtonRef.current.focus();
    }
  }, []);

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
    toggleLearned(word);
  };

  return (
    <div className={styles.container}>
      <Card variant="outlined" className={styles.card}>
        <CardContent>
          <Typography variant="h5" component="div">
            {word.english}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {word.transcription}
          </Typography>
          <Typography variant="body2" component="p">
            {showTranslation ? word.russian : "***"}
          </Typography>
          <div className={styles.button_container}>
            <Button
              variant="contained"
              onClick={toggleTranslation}
              className={styles.buttonMain}
            >
              {showTranslation ? "Скрыть перевод" : "Показать перевод"}
            </Button>
          </div>
        </CardContent>
      </Card>
      <Typography variant="body2" component="p">
        Изучено слов: {learnedCount}
      </Typography>
    </div>
  );
};

export default MainPage;
