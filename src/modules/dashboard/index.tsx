import React, { useState } from "react";
import "./index.scss";
import PublicRepo from "../publicRepo";
import UserRepo from "../userRepo";
import OrgRepo from "../orgRepo";
import YourRepo from "../yourRepo";
import YourOrg from "../yourOrg";

const Dashboard = () => {
  const [publicRepo, setpublicRepo] = useState(false);
  const [userRepo, setuserRepo] = useState(false);
  const [orgRepo, setorgRepo] = useState(false);
  const [yourRepo, setyourRepo] = useState(false);
  const [yourOrg, setyourOrg] = useState(false);

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
              setorgRepo(false);
              setyourRepo(false);
              setyourOrg(false);
            }}
          >
            <h3>Search Public Repositories</h3>
          </div>
          <div
            onClick={() => {
              setpublicRepo(false);
              setuserRepo(true);
              setorgRepo(false);
              setyourRepo(false);
              setyourOrg(false);
            }}
            className="option-list"
          >
            <h3>Search Users</h3>
          </div>
          <div
            onClick={() => {
              setpublicRepo(false);
              setorgRepo(true);
              setuserRepo(false);
              setyourRepo(false);
              setyourOrg(false);
            }}
            className="option-list"
          >
            <h3>Search Public Organisations</h3>
          </div>
          <div
            onClick={() => {
              setpublicRepo(false);
              setorgRepo(false);
              setuserRepo(false);
              setyourRepo(true);
              setyourOrg(false);
            }}
            className="option-list"
          >
            <h3>Your Repositories</h3>
          </div>
          <div
            onClick={() => {
              setpublicRepo(false);
              setorgRepo(false);
              setuserRepo(false);
              setyourRepo(false);
              setyourOrg(true);
            }}
            className="option-list"
          >
            <h3>Your Organisation</h3>
          </div>
        </div>
      </div>
      <div className="rendered-component">
        {publicRepo ? <PublicRepo /> : <div></div>}
        {userRepo ? <UserRepo /> : <div></div>}
        {orgRepo ? <OrgRepo /> : <div></div>}
        {yourRepo ? <YourRepo /> : <div></div>}
        {yourOrg ? <YourOrg /> : <div></div>}
      </div>
    </div>
  );
};

export default Dashboard;
