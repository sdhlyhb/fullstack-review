import React from 'react';
import UserEntry from './UserEntry.jsx'

const AllUsers = (props) => {

  return (
    <div id="allUsers">
      <h3>This is users list:</h3>
      {props.users.map(user => <UserEntry key={user} user = {user}/>)}
    </div>
  )

}


export default AllUsers;