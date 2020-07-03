import React, { useState, useEffect } from "react";
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
  const [filter, setfilter] = useState<string[]>([]);
  const [lang, setlang] = useState("All");
  const [pripub, setpripub] = useState("All");
  const [pubpri, setpubpri] = useState<string[]>([]);

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
        setresults([]);
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

  useEffect(() => {
    console.log(results.length);
    let data = [];
    data[0] = "All";
    let pripubdata = [];
    pripubdata[0] = "All";
    for (let i = 1; i < results.length; i++) {
      if (results[i].language !== null) data[i] = results[i].language;
      if (results[i].private === true) pripubdata[i] = "private";
      else if (results[i].private === false) pripubdata[i] = "public";
    }
    const unipripubdata = pripubdata.filter((x, i, a) => a.indexOf(x) === i);
    const uniquedata = data.filter((x, i, a) => a.indexOf(x) === i);
    setfilter(uniquedata);
    setpubpri(unipripubdata);
  }, [results]);

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
      {filter.length > 1 || pubpri.length > 1 ? (
        <div style={{ display: "inline-flex" }}>
          <div>
            <span style={{ marginRight: "10px" }}>
              <span>Language:</span>
              <select
                defaultValue={"All"}
                onChange={(e) => setlang(e.target.value)}
                id="languages"
                name="languages"
              >
                {filter.map((lang) => {
                  return <option value={lang}>{lang}</option>;
                })}
              </select>
            </span>
          </div>
          <div>
            <span style={{ marginRight: "10px" }}>
              <span>Public/Private:</span>
              <select
                defaultValue={"All"}
                onChange={(e) => setpripub(e.target.value)}
                id="Public/Private"
                name="Public/Private"
              >
                <option value="All">All</option>
                <option value="true">private</option>
                <option value="false">public</option>
              </select>
            </span>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="card-list">
        {results.length > 0 ? (
          // eslint-disable-next-line array-callback-return
          results.map((roughdata) => {
            if (lang === "All" && pripub === "All") {
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
            } else if (lang === roughdata.language && pripub === "All") {
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
            } else if (lang === "All" && pripub === `${roughdata.private}`) {
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
            } else if (
              lang === roughdata.language &&
              pripub === `${roughdata.private}`
            ) {
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
            }
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
