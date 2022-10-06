import {useEffect, useState} from "react"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

const UserCard = ({user, currentUser, addNewFollow, deleteFollow}) => {
const [errors, setErrors] = useState([])
const [isFollowing, setIsFollowing] = useState()

const toggle = () => {
  setIsFollowing(isFollowing => !isFollowing)
  
  handleFollow()
}

const handleFollow = () => {

  const following = {
    follower_id: currentUser.id,
    followee_id: user.id
  }

  isFollowing ? (
    fetch(`/relationships/${user.id}`, {
      method: "DELETE",
    }).then(() => {
      
      // deleteFollow(user.id)
    })
  ) : ( 
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
      })
    }else{
      r.json().then(data => {
        setErrors(data.errors)
      })
    }
  })
  )
}

	return(
	<Container>
    {errors ? errors.map(e => <section>{e}</section>):null}
		<Accordion as={Card} key={user.id}>
			<Accordion.Header as="h2">
			{user.first_name} {user.last_name}
			</Accordion.Header>
			<Accordion.Body>
				Also known as: <b> {user.username} </b>	
			</Accordion.Body>
			{user.has_profile ? <Accordion.Body>
        <Button onClick={toggle}>{isFollowing ? "Stop Notifications" : "Get notified"}</Button>		
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