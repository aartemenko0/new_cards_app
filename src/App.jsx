import Header from "./components/Header/Header.jsx";
import { Route, Routes } from "react-router-dom";
import React from "react";
import styles from "./App.module.css";
import { TableComponent } from "./components/Table/Table";
import Slider from "./pages/Slider/Slider.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import { WordProvider } from "./context/WordContext";

export default function App() {
  return (
    <div className={styles.App}>
      <Header />
      <WordProvider>
        <Routes>
          <Route path="/" element={<TableComponent />} />
          <Route path="/game" element={<Slider />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </WordProvider>
    </div>
  );
}
