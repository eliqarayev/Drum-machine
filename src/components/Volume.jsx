import React from "react";
import { IoVolumeHighOutline } from "react-icons/io5";

const Volume = ({ index, handleVolumeChange }) => {
  return (
    <div style={{ display: "flex" }}>
      <span>
        <IoVolumeHighOutline style={{ color: "white", fontSize: "20px" }} />
      </span>
      <input
        type="range"
        max={30}
        min={-50}
        defaultValue={1}
        onClick={(e) => handleVolumeChange(index, parseInt(e.target.value))}
      />
    </div>
  );
};

export default Volume;
