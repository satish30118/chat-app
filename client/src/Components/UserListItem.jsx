import React from 'react'

export default function UserListItem({user,handdleFunction}) {

    
  return (
    <div style={{backgroundColor:"lightgray", height:"auto", width:"auto",padding:"6px 10px", margin:"2px", cursor:"pointer"}} onClick={handdleFunction}>
      <p style={{margin:"0px",padding:"0px", fontWeight:"600"}}>{user.name}</p>
      <p style={{margin:"0px",padding:"0px"}}>{user.email}</p>
    </div>
  )
}
