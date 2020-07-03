import React, { useState, useEffect } from "react";
import "../publicRepo/index.scss";
import axios from "axios";
import Card from "../card";

interface Provider {
  type: any;
  name: string;
  html_url: string;
  language: string;
  private: boolean;
  node_id: number;
  owner: {
    avatar_url: string;
    html_url: string;
    login: string;
  };
}

const UserRepo = () => {
  const [searchtext, setsearchtext] = useState("");
  const [results, setresults] = useState<Provider[]>([]);
  const [errorstate, seterrorstate] = useState(false);
  const [filter, setfilter] = useState<string[]>([]);
  const [lang, setlang] = useState("All");

  const handleSubmit = async () => {
    await axios
      .get(`https://api.github.com/users/${searchtext}/repos`)
      .then((response) => {
        setresults(response.data);
      })
      .catch((error) => {
        seterrorstate(true);
        setresults([]);
      });
  };

  useEffect(() => {
    console.log(results.length);
    let data = [];
    data[0] = "All";
    for (let i = 1; i < results.length; i++) {
      if (results[i].language !== null) data[i] = results[i].language;
    }
    const uniquedata = data.filter((x, i, a) => a.indexOf(x) === i);
    setfilter(uniquedata);
  }, [results]);

  return (
    <div className="userRepo">
      <div className="searchbar">
        <div className="input-field">
          <input
            className="inputBox"
            type="text"
            placeholder="Search here"
            onChange={(e) => {
              setsearchtext(e.target.value);
              seterrorstate(false);
            }}
          />
        </div>
        <div onClick={() => handleSubmit()} className="searchicon">
          <img
            className="icon"
            src={require("../../images/search-icon.svg")}
            alt="Search"
          />
        </div>
      </div>
      {filter.length > 1 ? (
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
      ) : (
        <div></div>
      )}
      <div className="card-list">
        {results.length > 0 ? (
          // eslint-disable-next-line array-callback-return
          results.map((roughdata) => {
            if (lang === "All") {
              return (
                <Card
                  node_id={roughdata.node_id}
                  avatar_url={roughdata.owner.avatar_url}
                  name={roughdata.name}
                  html_url={roughdata.html_url}
                  h_url={roughdata.owner.html_url}
                  owner={roughdata.owner.login}
                  language={roughdata.language}
                  privates={roughdata.private}
                />
              );
            }
            if (lang === roughdata.language) {
              return (
                <Card
                  node_id={roughdata.node_id}
                  avatar_url={roughdata.owner.avatar_url}
                  name={roughdata.name}
                  html_url={roughdata.html_url}
                  h_url={roughdata.owner.html_url}
                  owner={roughdata.owner.login}
                  language={roughdata.language}
                  privates={roughdata.private}
                />
              );
            }
          })
        ) : errorstate === true && searchtext.length > 0 ? (
          <div className="alternative">
            <h2>Nothing here matches your search </h2>
            <h2>Please retype to find your results </h2>
          </div>
        ) : (
          <div className="alternative">
            <h2>Search Any Specific User Here </h2>
            <img
              className="displayimage"
              src={require("../../images/mark-black.png")}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRepo;
