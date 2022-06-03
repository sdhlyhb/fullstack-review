import React from 'react';

const RepoEntry = (props) => {
  return (
      <li className="repoEntry"> <a href={props.repo.repo_url}>{props.repo.repo_name}</a> <span className="user-span">by {props.repo.username} {" "}🌟: {props.repo.stargazers_count}</span> </li>
  )
}



export default RepoEntry;