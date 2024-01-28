import React from 'react'

export default function UserBadgeItem({user,handdleFunction}) {
  return (
    <span style={{backgroundColor:"green", padding:"3px 5px",margin:"2px",color:"white",fontSize:"17px", fontWeight:"600", borderRadius:"6px"}}>
      <span>{user.name}</span>
      <span onClick={handdleFunction} style={{color:"red",marginLeft:"3px", cursor:"pointer"}}>X</span>
    </span>
  )
}
