import React from "react";
import { useMemo } from "react";

export default function PositionLine({ length, current, isEverKeyDown }) {
  const ELS = Array.from(Array(length).keys());

  const position = useMemo(() => {
    return (100 / length) * current + 100 / length / 2;
  }, [current, length]);

  return (
    <div className="show-index-line ">
      <div className={isEverKeyDown.left && "upOut"}>
        <kbd> Arrow left</kbd>
      </div>

      <div >
        {" "}
        <div className="current-index-line ">
          <p
            className="current-index "
            style={{ left: `${position}%` }}
          >
            {current + 1}/{length}{" "}
          </p>{" "}
        </div>
        <div className="current-index-boxs ">
          {ELS.map((e) => (
            <div
              key={e}
              className={` box  ${
                current === e ? " lightbox " : " blackbox "
              }  `}
            ></div>
          ))}
        </div>
      </div>
      <div className={isEverKeyDown.right ? "upOut" : " "}>
        {" "}
        <kbd style={{ animationDelay: "1s" }}>Arrow right</kbd>
      </div>
    </div>
  );
}
