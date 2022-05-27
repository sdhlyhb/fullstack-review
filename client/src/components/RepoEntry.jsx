import React from 'react';

const RepoEntry = (props) => {
  return (
      <li className="repoEntry">Repo Name: <a href={props.repo.repo_url}>{props.repo.repo_name}</a></li>
  )
}



export default RepoEntry;