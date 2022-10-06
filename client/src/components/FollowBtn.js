import { useState } from 'react'
import Button from "react-bootstrap/Button"
import { useEffect } from 'react'

const FollowBtn = ({currentUser, user, addNewFollow, deleteFollow}) => {
const [errors, setErrors] = useState([])
const [isFollowing, setIsFollowing] = useState(false)

console.log(`${isFollowing} ${user.id}`)

const handleFollow = () => {
  const following = currentUser ? {
    follower_id: currentUser.id,
    followee_id: user.id
  } : null

  isFollowing ? 
    fetch(`/relationships/${user.id}`, {
      method: "DELETE",
	  headers: {"Content-Type": "application/json"}
    }).then(() => {
    //   deleteFollow(user.id)
    setIsFollowing(!isFollowing)
    })
  :
    fetch(`/relationships`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(following)
  }).then(r => {
    if(r.ok){
      r.json().then(newFollow => {
        // addNewFollow(newFollow)
       setIsFollowing(!isFollowing)
      })
    }else{
      r.json().then(data => {
        setErrors(data.errors)
      })
    }
  })
}

	return(
		<>
			{errors ? errors.map(e => <section>{e}</section>):null}
			<Button onClick={handleFollow} className="delete-btn">{isFollowing ? "Stop Notifications" : "Get Notified" }</Button>
		</>
	)
}

export default FollowBtn