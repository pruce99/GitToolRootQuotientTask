import React from "react";
import "./index.scss";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage-heading">
        <h2>A GitHub Tool</h2>
      </div>
      <div className="imagelogo">
        <img className="image" src={require("../../images/aniOctocat.png")} alt="" />
      </div>
      <div className="contentsHeading">
        <h2>
          Make anything Possible
        </h2>
      </div>
      <div className="contents">
        <ul>
          <li>
            Search Public Repositories
          </li>
          <li>
            Search Users Repositories
          </li>
          <li>
            Search Organizations
          </li>
          <li>
            View Your Own Repositories
          </li>
          <li>
            View Your Organization Repositories
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
