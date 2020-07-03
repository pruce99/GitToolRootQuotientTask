import React, { useState } from "react";
import axios from "axios";
import "../publicRepo/index.scss";

interface Provider {
  type: any;
  name: string;
  html_url: string;
  language: string;
  private: boolean;
  node_id: number;
  default_branch: string;
  owner: {
    avatar_url: string;
    html_url: string;
    login: string;
  };
}
interface Ibranch {
  name: string;
}

const YourOrg = () => {
  const [orgText, setorgText] = useState("");
  const [tokentext, settokentext] = useState("");
  const [branchtoggle, setbranchtoggle] = useState(false);
  const [reposname, setreposname] = useState("");
  const [errorstate, seterrorstate] = useState(false);
  const [results, setresults] = useState<Provider[]>([]);
  const [branch, setbranch] = useState<Ibranch[]>([]);

  const handleSubmit = async () => {
    seterrorstate(false);
    await axios
      .get(`https://api.github.com/orgs/${orgText}/repos `, {
        headers: {
          Authorization: `Bearer ${tokentext}`,
        },
      })
      .then((response) => {
        setresults(response.data);
      })
      .catch((error) => {
        seterrorstate(true);
      });
  };

  const handleBranch = async (reponame: string, owner: string) => {
    setreposname(reponame);
    await axios
      .get(`https://api.github.com/repos/${owner}/${reponame}/branches`, {
        headers: {
          Authorization: `Bearer ${tokentext}`,
        },
      })
      .then((response) => {
        setbranch(response.data);
      });
  };

  return (
    <div className="YourRepo">
      <div className="searchbar">
        <div style={{ height: "34px" }} className="input-field">
          <input
            className="inputBox"
            type="text"
            style={{ marginTop: "6px" }}
            placeholder="Enter Your Organisation"
            onChange={(e) => {
              setorgText(e.target.value);
              seterrorstate(false);
            }}
          />
        </div>
      </div>
      <div className="searchbar">
        <div className="input-field">
          <input
            className="inputBox"
            type="password"
            placeholder="Enter Your Token here"
            onChange={(e) => {
              settokentext(e.target.value);
              seterrorstate(false);
            }}
          />
        </div>
        <div onClick={() => handleSubmit()} className="searchicon">
          <img
            className="icon"
            src={require("../../images/token.png")}
            alt="Search"
          />
        </div>
      </div>
      <div className="card-list">
        {results.length > 0 ? (
          results.map((roughdata) => {
            return (
              <div key={roughdata.node_id} className="card">
                <div className="first-half">
                  <div className="avatar">
                    <img
                      className="avatar-img"
                      src={roughdata.owner.avatar_url}
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="second-half">
                  <div className="name">
                    <h4>Name:{roughdata.name}</h4>
                  </div>
                  <div className="link">
                    <a
                      style={{ textDecoration: "none", color: "black" }}
                      // eslint-disable-next-line react/jsx-no-target-blank
                      target="_blank"
                      rel="noreferrer"
                      href={roughdata.html_url}
                    >
                      <h4>Repository Link</h4>
                    </a>
                  </div>
                  <div className="owner">
                    <a
                      style={{ textDecoration: "none", color: "black" }}
                      // eslint-disable-next-line react/jsx-no-target-blank
                      target="_blank"
                      rel="noreferrer"
                      href={roughdata.owner.html_url}
                    >
                      <h4>Owner:{roughdata.owner.login}</h4>
                    </a>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className="branches"
                    onClick={() => {
                      handleBranch(roughdata.name, roughdata.owner.login);
                      setbranchtoggle(!branchtoggle);
                    }}
                  >
                    <h4>
                      Branch:
                      {roughdata.default_branch}
                    </h4>
                    {branch.length > 0 &&
                    reposname === roughdata.name &&
                    branchtoggle === true ? (
                      <div>
                        <h3>{branch.length} branch</h3>
                        {branch.map((br) => {
                          return <li>{br.name}</li>;
                        })}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="language">
                    <h4>
                      Language:
                      {roughdata.language}
                    </h4>
                  </div>
                  <div className="private">
                    <h4>{roughdata.private ? "Private" : "Public"}</h4>
                  </div>
                </div>
              </div>
            );
          })
        ) : errorstate === true && tokentext.length > 0 ? (
          <div className="alternative-org-token">
            <h2>Invalid Token </h2>
            <h2>Visit this link to generate your token </h2>
          </div>
        ) : (
          <div className="alternative-org-token">
            <h2>Enter Your Username And Token</h2>
            <h2>To View Your Organisation's Public And Private Repository</h2>
            <img
              className="displayimage-org-token"
              src={require("../../images/worker.png")}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default YourOrg;
