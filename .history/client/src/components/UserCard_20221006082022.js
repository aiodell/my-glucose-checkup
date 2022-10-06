import {useEffect, useState} from "react"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

const UserCard = ({user, currentUser, addNewFollow, removeCurrentFollowing}) => {
const [errors, setErrors] = useState([])

// find the followee_id that matches the user_id
const userFollows = currentUser.followees?.find(followee => followee.followee_id === user.id)

// follow the user
const handleFollow = () => {

  const following = currentUser ? {
    follower_id: currentUser.id,
    followee_id: user.id
  } : null

    fetch(`/relationships`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(following)
  }).then(r => {
    if(r.ok){
      r.json().then(newFollow => {
        addNewFollow(newFollow)
      })
    }else{
      r.json().then(data => {
        setErrors(data.errors)
      })
    }
  })
}

// unfollow the user
const handleUnfollow = () => {
 fetch(`/relationships/${user.id}`, {
      method: "DELETE",
    }).then((r) => r.json())
    .then(data => {
     removeCurrentFollowing(data)})
}

	return(
	<Container>
    {errors ? errors.map(e => <section>{e}</section>):null}
		<Accordion as={Card} key={user.id} className="user-card">
			<Accordion.Header as="h2">
			{user.first_name} {user.last_name}
			</Accordion.Header>
			<Accordion.Body className="user-card">
				Also known as: <b> {user.username} </b>	
			</Accordion.Body>
      {/* give the user the ability to follow someone if they already have a profile made */}
			{user.has_profile ?
      <Accordion.Body>
     {userFollows ?<Button onClick={handleUnfollow}>Stop Notifications</Button> : 
      <Button onClick={handleFollow}>Get notified</Button>
      } 
			</Accordion.Body> 
      : <Accordion.Body>
        This user has not yet created a profile to be followed
      </Accordion.Body>}
			<Accordion.Body>
			</Accordion.Body>
		</Accordion>		
	</Container>
	)
}

export default UserCard