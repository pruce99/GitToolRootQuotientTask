import React from "react";

type CardProps = {
  name: string;
  html_url: string;
  h_url: string;
  language: string;
  privates : boolean;
  node_id: number;
  avatar_url: string;
  owner: string;
}

const Card = ({
  name,
  html_url,
  h_url,
  language,
  privates,
  node_id,
  avatar_url,
  owner,
}: CardProps) => {
  return (
    <div key={node_id} className="card">
      <div className="first-half">
        <div className="avatar">
          <img
            className="avatar-img"
            src={avatar_url}
            alt="avatar"
          />
        </div>
      </div>
      <div className="second-half">
        <div className="name">
          <h4>Name:{name}</h4>
        </div>
        <div className="link">
          <a
            style={{ textDecoration: "none", color: "black" }}
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
            rel="noreferrer"
            href={html_url}
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
            href={h_url}
          >
            <h4>Owner:{owner}</h4>
          </a>
        </div>

        <div className="language">
          <h4>
            Language:
            {language}
          </h4>
        </div>
        <div className="private">
          <h4>{privates ? "Private" : "Public"}</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
