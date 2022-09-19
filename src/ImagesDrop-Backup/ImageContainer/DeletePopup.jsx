import React, { useEffect, useRef, useState } from "react";
import MarkSVG from "../icon/markSVG";
import NegativeSVG from "../icon/negativeSVG";
//
// 13-9 : non nesscessary - continute later
//
export default function DeletePopup({
  onConfirm,
  isGroupSelect,
  size,
  images,
  offGroupSelect,
}) {
  const innerRef = useRef();
  const [isConfirmDip, setConfirmDip] = useState(false);
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (innerRef.current && !innerRef.current.contains(e.target))
        setConfirmDip(false);
      else {
        setConfirmDip(true);
      }
    }
  }, []);

  return (
    <>
      <div
        onClick={() => {}}
        ref={innerRef}
        onFocus={(e) => console.log(e)}
        className={`button group-delete-button ${
          isGroupSelect === true
            ? " in "
            : isGroupSelect === false
            ? " out "
            : " "
        }  ${size === 1 ? " small " : size === 2 ? " medium " : " interhit "}`}
        disabled={images.filter((e) => e.isCheck === true).length === 0}
      >
        {isConfirmDip ? (
          <>
            {" "}
            <div className={`multi-delete-pop `}>
              {
                size === 3 &&  
                 <button className="negative " onClick={() => offGroupSelect()}>
                  <span className=" ">Cancel</span>

                  <NegativeSVG />
                </button>
              }
              
       

              <button
                className="confirm"
                onClick={() => {
                  onConfirm();
                }}
              >
                <span className="">Confirm</span>

                <MarkSVG />
              </button>
            </div>
          </>
        ) : (
          <p>Delete</p>
        )}
      </div>
    </>
  );
}
