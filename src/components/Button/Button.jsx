// export default function Button({ text }) {
//   return <button>{text}</button>;
// }

import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick, disabled }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
