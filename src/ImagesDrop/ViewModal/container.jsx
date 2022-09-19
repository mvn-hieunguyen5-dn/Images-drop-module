import React from "react";
export default function Container({images,currentImgIndex,isEverKeyDown}) {
  return (
    <div className="modal-img-container relative">
      <img
        src={images[currentImgIndex].url}
        alt="modal-view"
        srcSet=""
      />
      <p className="size">{images[currentImgIndex].size} Kb</p>
    
    </div>
  );
}
