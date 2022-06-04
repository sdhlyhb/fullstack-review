import React from 'react';

const RepoEntry = (props) => {
  var avatarUrl = "https://github.com/" + props.repo.username + ".png?size=12";
  return (
      <li className="repoEntry"> <a href={props.repo.repo_url}>{props.repo.repo_name}</a> <span className="user-span">by {"  "} <img src={avatarUrl}/>{props.repo.username} {" "}🌟: {props.repo.stargazers_count}</span> </li>
  )
}



export default RepoEntry;