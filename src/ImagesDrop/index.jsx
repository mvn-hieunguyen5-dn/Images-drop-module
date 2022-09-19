import React, { useState, useCallback, useEffect } from "react";
import ImageContainer from "./ImageContainer";
import UploadIcon from "./upload_512.png";
import MouseSVG from "./icon/mouseSVG";
import ViewModal from "./ViewModal";
import "./images-selector.css";
export default function Index({ size = 3 ,onChange = ()=>{}}) {
  const [images, setImages] = useState([]);
  const [isGroupSelect, setIsGroupSelect] = useState(false);
  const [triggerDelete, setDeleteG] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [isOpenImgModal, setOpenImgModal] = useState(false);
  const [ImgModalIndex, setImgModalIndex] = useState(1);

  const onInputChagne = (e) => {
    console.log(e);
    setDragActive(false);
    e.preventDefault();
    e.stopPropagation();
    e.target.files &&
      setImages([...images, ...ConvertToTemplate(Array.from(e.target.files))]);
    e.dataTransfer &&
      setImages([
        ...images,
        ...ConvertToTemplate(NonImageFillter(Array.from(e.dataTransfer.files))),
      ]);
    console.log(images);
  };
  const deleteImage = useCallback(
    (id) => {
      const IMG = images.filter((e) => e.id !== id);
      setImages([...IMG]);
    },
    [images]
  );
  const deleteMultimage = useCallback(
    (id) => {
      setIsGroupSelect(false);
      setTimeout(() => {
        const IMG = images.filter((e) => e.isCheck !== true);
        setImages([...IMG]);
      }, 500);
    },
    [images]
  );
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const ConvertToTemplate = (obj) => {
    let Result = [];
    obj.forEach((item) => {
      Result.push({
        id: Math.floor(Math.random() * 10000),
        name: item.name,
        size: item.size,
        url: URL.createObjectURL(item),
        file: item,
      });
    });
    return Result;
  };
  const NonImageFillter = (arr) => {
    const RES = arr.filter((obj) => obj.type.includes("image"));
    return RES;
  };

  const onOpenImgModal = (index) => {
    setImgModalIndex(index);
    setOpenImgModal(true);
  };

  useEffect(()=>onChange(images),[images,onChange])

  return (
    <div
      className={`images-container-${size === 3 ? "listmode" : "picmode"} `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
    >
      {isOpenImgModal && (
        <ViewModal
          isOpenImgModal={isOpenImgModal}
          images={images}
          turnOff={() => setOpenImgModal(false)}
          ImgIndex={ImgModalIndex}
        />
      )}

      <input
        type="file"
        accept="image/*"
        multiple
        name=""
        id="images-input"
        onChange={(e) => onInputChagne(e)}
        onClick={(e) => {
          e.target.value = null;
        }}
        style={{ display: "none" }}
      />
      <div className={`images-box ${size === 3 && " column "} `}>
        {images.map((img, index) => (
          <ImageContainer
            img={img}
            size={size}
            key={img.id}
            index={img.id}
            deleteImg={() => deleteImage(img.id)}
            isGroupSelect={isGroupSelect === true}
            turnGroupSelect={() => setIsGroupSelect(!isGroupSelect)}
            triggerDelete={triggerDelete}
            isCheck={img.isCheck}
            onOpenImgModal={() => onOpenImgModal(index)}
            setIsCheck={(b) => {
              b ? (img.isCheck = true) : (img.isCheck = false);
              setImages([...images]);
            }}
          />
        ))}

        <button
          onClick={() => {
            setDeleteG(!triggerDelete);
            deleteMultimage();
          }}
          className={`button group-delete-button ${
            isGroupSelect === true
              ? " in "
              : isGroupSelect === false
              ? " out "
              : " "
          }  ${
            size === 1 ? " small " : size === 2 ? " medium " : " interhit "
          }`}
          disabled={images.filter((e) => e.isCheck === true).length === 0}
        >
          <p>Delete</p>
        </button>

        <label
          onDragOver={handleDrag}
          htmlFor="images-input"
          className={`button add-new-image ${
            size === 1 ? " small " : size === 2 ? " medium " : " interhit "
          } ${dragActive && "drag-over"}`}
          onDrop={(e) => onInputChagne(e)}
        >
          {/* {size === 3 ? ( */}
          <>
            {dragActive ? (
              <div className="mouse-up">
                <MouseSVG />
              </div>
            ) : (
              <img
                src={UploadIcon}
                alt="React Logo"
                className={`icon ${dragActive ? "   " : ""}`}
              />
            )}{" "}
            <p>
              {dragActive
                ? "Mouse up"
                : size === 3
                ? "Drag or Upload file "
                : "Upload file "}
            </p>
          </>
        </label>
      </div>
    </div>
  );
}
