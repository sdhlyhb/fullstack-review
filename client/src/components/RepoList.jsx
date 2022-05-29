import React from 'react';
import RepoEntry from './RepoEntry.jsx'

const RepoList = (props) => (
  <div className="repoList">
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos ranking based on stargazers_count.
    <ol>
       {props.repos.map(repo => <RepoEntry key = {repo.repo_id} repo = {repo}/>)}
    </ol>

  </div>
)

export default RepoList;