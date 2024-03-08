import React from "react";
import { IoVolumeHighOutline } from "react-icons/io5";

const Volume = ({ index, handleVolumeChange }) => {
  return (
    <div className="volume">
      <span className="icon">
        <IoVolumeHighOutline />
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
