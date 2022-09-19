import React, { useState, useCallback, useEffect } from "react";
import TrashIcon from "../icon/trashIcon";
import EyeSVG from "../icon/eyeSVG";

const Index = ({
  img,
  size,
  deleteImg,
  isGroupSelect,
  turnGroupSelect,
  isCheck = false,
  setIsCheck,
  triggerDelete,
  onOpenImgModal,
}) => {
  const [inDelete, setInDelete] = useState(false);
  const [timeOut, setTimeOut] = useState(null);

  const Delete = useCallback(
    (isJustNoice = false) => {
      setInDelete(true);
      !isJustNoice && setTimeout(() => deleteImg(), 500);
    },
    [deleteImg]
  );
  const ActBeDelete = () => {
    isCheck === true && Delete(true);
  };
  useEffect(() => {
    ActBeDelete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerDelete]);
  useEffect(() => {
    isGroupSelect && setIsCheck(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGroupSelect]);

  const handleMouseHold = (e) => {
    if (e.type === "mousedown") {
      setTimeOut(() =>
        setTimeout(() => {
          turnGroupSelect();
        }, 1000)
      );
    } else {
      clearTimeout(timeOut);
    }
  };
  return (
    <div
      className={`image-container ${
        inDelete
          ? ` ${size === 3 ? " upOut " : " out "} `
          : ` ${size === 3 ? " upIn " : " in "} `
      }  ${size === 1 ? " small " : size === 2 ? " medium " : " interhit "} ${
        (size !== 3) & isCheck & isGroupSelect && " checked "
      }`}
      onMouseDown={handleMouseHold}
      onMouseUp={handleMouseHold}
      onClick={() => setIsCheck(!isCheck)}
    >
      {size === 3 && (
        <input
          type="checkbox"
          name=""
          checked={isCheck}
          id=""
          onChange={(e) => console.log(e.target.checked)}
          className={`group-select-box ${isGroupSelect ? " in " : " out "}`}
        />
      )}

      <img
        src={img.url}
        className=" object-cover"
        alt=""
        onClick={() => onOpenImgModal()}
      />
      <p className="file-name">{img.name} </p>
      <p className="file-size">{img.size} Kb</p>

      <div className={size !== 3 ? `hover-layer` : ``}>
        <button
          className={` icon-eye ${!isGroupSelect ? " in " : " out "}`}
          onClick={() => onOpenImgModal()}
        >
          <EyeSVG />
        </button>
        <button
          className={` image-delete ${!isGroupSelect ? " in " : " out "}`}
          onClick={() => Delete()}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
export default Index;
