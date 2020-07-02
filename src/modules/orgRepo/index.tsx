import React,{useState} from 'react'
import '../publicRepo/index.scss'
import axios from 'axios'

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
 
const OrgRepo = () => {
    const [searchtext, setsearchtext] = useState("");
  const [results, setresults] = useState<Provider[]>([]);

  const handleSubmit = async () => {
    console.log("entered");
    await axios
      .get(`https://api.github.com/orgs/${searchtext}/repos`)
      .then((response) => {
        setresults(response.data);
        setsearchtext("");
      });
  };
    return ( 
        <div className="OrgRepo">
      <div className="searchbar">
        <div className="input-field">
          <input
            className="inputBox"
            type="text"
            placeholder="Search here"
            onChange={(e) => {
              setsearchtext(e.target.value);
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
        ) : (
            <div style={{ marginLeft: "18px", marginTop: "50px" }}>
            <h2>Search Any Public Organisation Repository Here </h2>
            <img
              style={{ width: "180px" }}
              src={require("../../images/organization.svg")}
              alt=""
            />
            </div>
        )}
      </div>
    </div>
     );
}
 
export default OrgRepo;