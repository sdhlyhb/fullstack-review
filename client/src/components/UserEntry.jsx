import React from 'react';

const UserEntry = (props) => {
  var avatarUrl = "https://github.com/" + props.user + ".png?size=20";
  return (
    <li className="userEntry">
      <img src={avatarUrl}/>
      {" "}
      <a>{props.user}</a>
    </li>

  )

}


export default UserEntry;