import React, { useState } from "react";

const PublicRepo = () => {
  const [searchtext, setsearchtext] = useState("");
  return (
    <div className="PublicRepo">
      <div className="searchbar">
        <div className="input-field">
          <input
            type="text"
            onChange={(e) => {
              setsearchtext(e.target.value);
            }}
          />
        </div>
        <div className="searchicon">
          <img src={require("../../images/search-icon.svg")} alt="Search" />
        </div>
      </div>
    </div>
  );
};

export default PublicRepo;
