import {useState} from "react"
import Button from "react-bootstrap/Button"

const FollowBtn = ({currentUser, user, onFollow, isFollowing}) => {
	const [errors, setErrors] = useState([])

  function handleFollow(e) {
    const following = currentUser ? {followee_id: user.id, follower_id: currentUser.id} : null

    isFollowing ? (
      fetch(`/users/${user.id}/unfollow`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then(( ) => {
          onFollow(false)
        })
      ) : (
        fetch("/users/${user.id}/follow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(following)
        })
          .then((r) => {
            if (r.ok) {
              r.json().then(( ) => {
                onFollow(true)
              })
            } else {
              r.json().then((data) =>setErrors(data.errors))
            }
          })
      )
  }

  return(
    <>
	  {errors ? errors.map(e => <section>{e}</section>):null}
      <Button onClick={handleFollow} className="delete-btn">{isFollowing ? "Stop Notifications" : "Get Notified"}</Button>
    </>
  )
}

export default FollowBtn;