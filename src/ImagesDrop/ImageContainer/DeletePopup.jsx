import React from "react";
import MarkSVG from "../icon/markSVG";
import NegativeSVG from "../icon/negativeSVG";
//
// 13-9 : non nesscessary - continute later
//
export default function DeletePopup() {
  return (
    <div className="px-4 my-2 bg-red-400 w-fit  h-full rounded-md absolute right-0 flex items-center ">
      <button className=" w-5 h-5 relative fill-white hover:fill-green-500">
        <NegativeSVG />
      </button>
      <button className=" h-6 relative fill-white hover:fill-red-700 flex">
        <span className=" font-bold text-white">Confirm</span>
        <MarkSVG />
      </button>
    </div>
  );
}
