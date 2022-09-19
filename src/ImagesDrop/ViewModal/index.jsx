import React, { useCallback, useEffect, useState } from "react";
import "./view-modal.css";
import Header from "./header";
import Container from "./container";
import PositionLine from "./positionLine";
export default function Index({ turnOff, images, ImgIndex }) {
  const [isPreTurnOff, setPreTurnOff] = useState(false);
  const [isEverKeyDown, setIsEverKeyDown] = useState({
    left: false,
    right: false,
  });
  const handleInnerClick = (e) => {
    e.stopPropagation();
  };
  const [currentImgIndex, setCurrentIndex] = useState(ImgIndex);

  const onTurnOff = useCallback(() => {
    setPreTurnOff(true);
    setTimeout(() => {
      turnOff();
      setPreTurnOff(false);
    }, 300);
  }, [turnOff]);

  const handleKeyDown = (e) => {
    console.log(e);
  };
  const handleUserKeyPress = useCallback(
    (event) => {
      // console.log(event.key);
      if (event.key === "ArrowLeft") {
        setCurrentIndex((c) => (c === 0 ? images.length - 1 : c - 1));
        isEverKeyDown.left = true;
        setIsEverKeyDown({ ...isEverKeyDown });
      }
      if (event.key === "ArrowRight") {
        setCurrentIndex((c) => (c === images.length - 1 ? 0 : c + 1));
        isEverKeyDown.right = true;
        setIsEverKeyDown({ ...isEverKeyDown });
      }
      if (event.key === "Escape") {
        onTurnOff();
      }
    },
    [setCurrentIndex, images.length, onTurnOff, isEverKeyDown]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleUserKeyPress);
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
  return (
    <>
      <div
        className={`fade-layer ${isPreTurnOff ? " modal-out " : " modal-in "}`}
        onClick={() => onTurnOff()}
      >
        <div
          className={`image-view-modal ${
            isPreTurnOff ? " modal-out " : " modal-in "
          }`}
          onClick={handleInnerClick}
          onKeyDown={handleKeyDown}
        >
          <Header tittle={images[currentImgIndex].name} onTurnOff={onTurnOff} />
          <Container
            images={images}
            currentImgIndex={currentImgIndex}
            isEverKeyDown={isEverKeyDown}
          />
        </div>
        {images.length > 1 && (
          <PositionLine
            length={images.length}
            current={currentImgIndex}
            isEverKeyDown={isEverKeyDown}
          />
        )}
      </div>
    </>
  );
}
// export
