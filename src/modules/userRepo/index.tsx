import React, { useState} from "react";
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


const UserRepo = () => {
  const [searchtext, setsearchtext] = useState("");
  const [results, setresults] = useState<Provider[]>([]);


  const handleSubmit = async () => {
    console.log("entered");
    await axios
      .get(`https://api.github.com/users/${searchtext}/repos`)
      .then((response) => {
         setresults(response.data);
        // console.log(response.data)
      });
  };

  // const data = {
  //   id: 276162086,
  //   node_id: "MDEwOlJlcG9zaXRvcnkyNzYxNjIwODY=",
  //   name: "CustomMusicPlayer",
  //   full_name: "pruce99/CustomMusicPlayer",
  //   private: false,
  //   owner: {
  //     login: "pruce99",
  //     id: 67650643,
  //     node_id: "MDQ6VXNlcjY3NjUwNjQz",
  //     avatar_url: "https://avatars3.githubusercontent.com/u/67650643?v=4",
  //     gravatar_id: "",
  //     url: "https://api.github.com/users/pruce99",
  //     html_url: "https://github.com/pruce99",
  //     followers_url: "https://api.github.com/users/pruce99/followers",
  //     following_url:
  //       "https://api.github.com/users/pruce99/following{/other_user}",
  //     gists_url: "https://api.github.com/users/pruce99/gists{/gist_id}",
  //     starred_url:
  //       "https://api.github.com/users/pruce99/starred{/owner}{/repo}",
  //     subscriptions_url: "https://api.github.com/users/pruce99/subscriptions",
  //     organizations_url: "https://api.github.com/users/pruce99/orgs",
  //     repos_url: "https://api.github.com/users/pruce99/repos",
  //     events_url: "https://api.github.com/users/pruce99/events{/privacy}",
  //     received_events_url:
  //       "https://api.github.com/users/pruce99/received_events",
  //     type: "User",
  //     site_admin: false,
  //   },
  //   html_url: "https://github.com/pruce99/CustomMusicPlayer",
  //   description:
  //     "A custom music player with no npm packages for creating the player",
  //   fork: false,
  //   url: "https://api.github.com/repos/pruce99/CustomMusicPlayer",
  //   forks_url: "https://api.github.com/repos/pruce99/CustomMusicPlayer/forks",
  //   keys_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/keys{/key_id}",
  //   collaborators_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/collaborators{/collaborator}",
  //   teams_url: "https://api.github.com/repos/pruce99/CustomMusicPlayer/teams",
  //   hooks_url: "https://api.github.com/repos/pruce99/CustomMusicPlayer/hooks",
  //   issue_events_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/issues/events{/number}",
  //   events_url: "https://api.github.com/repos/pruce99/CustomMusicPlayer/events",
  //   assignees_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/assignees{/user}",
  //   branches_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/branches{/branch}",
  //   tags_url: "https://api.github.com/repos/pruce99/CustomMusicPlayer/tags",
  //   blobs_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/git/blobs{/sha}",
  //   git_tags_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/git/tags{/sha}",
  //   git_refs_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/git/refs{/sha}",
  //   trees_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/git/trees{/sha}",
  //   statuses_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/statuses/{sha}",
  //   languages_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/languages",
  //   stargazers_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/stargazers",
  //   contributors_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/contributors",
  //   subscribers_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/subscribers",
  //   subscription_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/subscription",
  //   commits_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/commits{/sha}",
  //   git_commits_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/git/commits{/sha}",
  //   comments_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/comments{/number}",
  //   issue_comment_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/issues/comments{/number}",
  //   contents_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/contents/{+path}",
  //   compare_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/compare/{base}...{head}",
  //   merges_url: "https://api.github.com/repos/pruce99/CustomMusicPlayer/merges",
  //   archive_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/{archive_format}{/ref}",
  //   downloads_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/downloads",
  //   issues_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/issues{/number}",
  //   pulls_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/pulls{/number}",
  //   milestones_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/milestones{/number}",
  //   notifications_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/notifications{?since,all,participating}",
  //   labels_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/labels{/name}",
  //   releases_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/releases{/id}",
  //   deployments_url:
  //     "https://api.github.com/repos/pruce99/CustomMusicPlayer/deployments",
  //   created_at: "2020-06-30T17:08:48Z",
  //   updated_at: "2020-06-30T17:10:27Z",
  //   pushed_at: "2020-06-30T17:10:24Z",
  //   git_url: "git://github.com/pruce99/CustomMusicPlayer.git",
  //   ssh_url: "git@github.com:pruce99/CustomMusicPlayer.git",
  //   clone_url: "https://github.com/pruce99/CustomMusicPlayer.git",
  //   svn_url: "https://github.com/pruce99/CustomMusicPlayer",
  //   homepage: null,
  //   size: 4608,
  //   stargazers_count: 0,
  //   watchers_count: 0,
  //   language: "JavaScript",
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
  //   watchers: 0,
  //   default_branch: "master",
  // };

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

export default UserRepo;
