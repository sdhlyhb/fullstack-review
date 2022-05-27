import React from 'react';

const RepoEntry = (props) => {
  return (
      <li className="repoEntry">Repo Name: {props.repo.repo_name}</li>
  )
}



export default RepoEntry;