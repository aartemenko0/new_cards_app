import React from "react";

export default function SliderButtons({ onNext, onPrev, type }) {
  return (
    <div>
      {type === "prev" && <button onClick={onPrev}>{"<"}</button>}
      {type === "next" && <button onClick={onNext}>{">"}</button>}
    </div>
  );
}
