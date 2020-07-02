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
  const [displayDasboard, setdisplayDashboard] = useState(false);

  return (
    <div className="decider">
      <div className="hide">
        <img
          style={
            displayDasboard
              ? {
                  marginTop: "20px",
                  marginLeft: "20px",
                  width: "35px",
                  cursor: "pointer",
                }
              : { display: "none" }
          }
          onClick={() => {
            setdisplayDashboard(!displayDasboard);
          }}
          src={require("../../images/burger.svg")}
          alt="bur"
        />
      </div>
      <div
        className="main-dashboard"
        style={displayDasboard ? { display: "none" } : {}}
      >
        <div className="dashboard-heading">
          <div>
            <h1>Dashboard</h1>
          </div>
          <div className="hide">
            <img
              onClick={() => {
                setdisplayDashboard(!displayDasboard);
              }}
              src={require("../../images/burger.svg")}
              alt="bur"
            />
          </div>
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
              setdisplayDashboard(true);
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
              setdisplayDashboard(true);
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
              setdisplayDashboard(true);
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
              setdisplayDashboard(true);
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
              setdisplayDashboard(true);
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
