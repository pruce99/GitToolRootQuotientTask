import React, { useState } from "react";
import "./index.scss";
import PublicRepo from "../publicRepo";
import UserRepo from "../userRepo";

const Dashboard = () => {
  const [publicRepo, setpublicRepo] = useState(false);
  const [userRepo, setuserRepo] = useState(false);

  return (
    <div className="decider">
      <div className="main-dashboard">
        <div className="dashboard-heading">
          <h1>Dashboard</h1>
        </div>
        <div className="options">
          <div
            className="option-list"
            onClick={() => {
              setpublicRepo(true);
              setuserRepo(false);
            }}
          >
            <h3>Search Public Repositories</h3>
          </div>
          <div
            onClick={() => {
              setpublicRepo(false);
              setuserRepo(true);
            }}
            className="option-list"
          >
            <h3>Search Users</h3>
          </div>
          <div className="option-list">
            <h3>Search Public Organisations</h3>
          </div>
          <div className="option-list">
            <h3>Your Repositories</h3>
          </div>
          <div className="option-list">
            <h3>Your Organisation</h3>
          </div>
        </div>
      </div>
      <div className="rendered-component">
        {publicRepo ? <PublicRepo /> : <div></div>}
        {userRepo ? <UserRepo /> : <div></div>}
      </div>
    </div>
  );
};

export default Dashboard;
