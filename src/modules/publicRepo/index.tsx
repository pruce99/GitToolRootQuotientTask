import React, { useState } from "react";
import "./index.scss";
import axios from "axios";

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

const PublicRepo = () => {
  const [searchtext, setsearchtext] = useState("");
  const [results, setresults] = useState<Provider[]>([]);

  const handleSubmit = async () => {
    console.log("entered");
    await axios
      .get(`https://api.github.com/search/repositories?q=${searchtext}/`)
      .then((response) => {
        setresults(response.data.items);
      });
  };

  // const roughdata = {
  //   id: 125152692,
  //   node_id: "MDEwOlJlcG9zaXRvcnkxMjUxNTI2OTI=",
  //   name: "Nefarians",
  //   full_name: "MrMadBones/Nefarians",
  //   private: false,
  //   owner: {
  //     login: "MrMadBones",
  //     id: 19666644,
  //     node_id: "MDQ6VXNlcjE5NjY2NjQ0",
  //     avatar_url: "https://avatars0.githubusercontent.com/u/19666644?v=4",
  //     gravatar_id: "",
  //     url: "https://api.github.com/users/MrMadBones",
  //     html_url: "https://github.com/MrMadBones",
  //     followers_url: "https://api.github.com/users/MrMadBones/followers",
  //     following_url:
  //       "https://api.github.com/users/MrMadBones/following{/other_user}",
  //     gists_url: "https://api.github.com/users/MrMadBones/gists{/gist_id}",
  //     starred_url:
  //       "https://api.github.com/users/MrMadBones/starred{/owner}{/repo}",
  //     subscriptions_url:
  //       "https://api.github.com/users/MrMadBones/subscriptions",
  //     organizations_url: "https://api.github.com/users/MrMadBones/orgs",
  //     repos_url: "https://api.github.com/users/MrMadBones/repos",
  //     events_url: "https://api.github.com/users/MrMadBones/events{/privacy}",
  //     received_events_url:
  //       "https://api.github.com/users/MrMadBones/received_events",
  //     type: "User",
  //     site_admin: false,
  //   },
  //   html_url: "https://github.com/MrMadBones/Nefarians",
  //   description: "SMH2018 Jaipur",
  //   fork: false,
  //   url: "https://api.github.com/repos/MrMadBones/Nefarians",
  //   forks_url: "https://api.github.com/repos/MrMadBones/Nefarians/forks",
  //   keys_url: "https://api.github.com/repos/MrMadBones/Nefarians/keys{/key_id}",
  //   collaborators_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/collaborators{/collaborator}",
  //   teams_url: "https://api.github.com/repos/MrMadBones/Nefarians/teams",
  //   hooks_url: "https://api.github.com/repos/MrMadBones/Nefarians/hooks",
  //   issue_events_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/issues/events{/number}",
  //   events_url: "https://api.github.com/repos/MrMadBones/Nefarians/events",
  //   assignees_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/assignees{/user}",
  //   branches_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/branches{/branch}",
  //   tags_url: "https://api.github.com/repos/MrMadBones/Nefarians/tags",
  //   blobs_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/git/blobs{/sha}",
  //   git_tags_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/git/tags{/sha}",
  //   git_refs_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/git/refs{/sha}",
  //   trees_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/git/trees{/sha}",
  //   statuses_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/statuses/{sha}",
  //   languages_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/languages",
  //   stargazers_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/stargazers",
  //   contributors_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/contributors",
  //   subscribers_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/subscribers",
  //   subscription_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/subscription",
  //   commits_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/commits{/sha}",
  //   git_commits_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/git/commits{/sha}",
  //   comments_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/comments{/number}",
  //   issue_comment_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/issues/comments{/number}",
  //   contents_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/contents/{+path}",
  //   compare_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/compare/{base}...{head}",
  //   merges_url: "https://api.github.com/repos/MrMadBones/Nefarians/merges",
  //   archive_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/{archive_format}{/ref}",
  //   downloads_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/downloads",
  //   issues_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/issues{/number}",
  //   pulls_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/pulls{/number}",
  //   milestones_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/milestones{/number}",
  //   notifications_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/notifications{?since,all,participating}",
  //   labels_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/labels{/name}",
  //   releases_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/releases{/id}",
  //   deployments_url:
  //     "https://api.github.com/repos/MrMadBones/Nefarians/deployments",
  //   created_at: "2018-03-14T03:56:36Z",
  //   updated_at: "2018-03-31T02:50:01Z",
  //   pushed_at: "2018-03-31T02:49:56Z",
  //   git_url: "git://github.com/MrMadBones/Nefarians.git",
  //   ssh_url: "git@github.com:MrMadBones/Nefarians.git",
  //   clone_url: "https://github.com/MrMadBones/Nefarians.git",
  //   svn_url: "https://github.com/MrMadBones/Nefarians",
  //   homepage: null,
  //   size: 57738,
  //   stargazers_count: 1,
  //   watchers_count: 1,
  //   language: "Python",
  //   has_issues: true,
  //   has_projects: true,
  //   has_downloads: true,
  //   has_wiki: true,
  //   has_pages: false,
  //   forks_count: 0,
  //   mirror_url: null,
  //   archived: false,
  //   disabled: false,
  //   open_issues_count: 0,
  //   license: null,
  //   forks: 0,
  //   open_issues: 0,
  //   watchers: 1,
  //   default_branch: "master",
  //   score: 1.0,
  // };



  return (
    <div className="PublicRepo">
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
          <div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicRepo;
