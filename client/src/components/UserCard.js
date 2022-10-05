import {useState} from "react"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"


const UserCard = ({user, currentUser}) => {
const [errors, setErrors] = useState([])
const [isFollowing, setIsFollowing] = useState(false)

const onFollow = () => {
    setIsFollowing((prev) => !prev)
}

  const handleFollow = () => {
    const following = currentUser ? {
      followed_id: user.id,
      followee_id: currentUser.id
      } : null 

      isFollowing ? (
        fetch(`/follows/${user.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }).then((r) => {
          if (r.ok){
            r.json().then((onFollow(false)))
          }else{
            r.json().then((data) => setErrors(data.errors))
          }
        })
      ) : (
        fetch("/follows", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(following)
        })
        .then((r) => {
          if(r.ok){
            r.json().then(() => onFollow(true)
            )}else{
            r.json().then((data) => setErrors(data.errors))
          }
        })
      )
  }

	return(
	<Container>
		<Accordion as={Card} key={user.id}>
			<Accordion.Header as="h2">
			{user.first_name} {user.last_name}
			</Accordion.Header>
			<Accordion.Body>
				Also known as: <b> {user.username} </b>	
			</Accordion.Body>
			<Accordion.Body>
				<Button onClick={handleFollow} className="delete-btn">
					{isFollowing ? "Stop Notifications" : "Get Notified"}
				</Button>		
			</Accordion.Body>
			<Accordion.Body>
			</Accordion.Body>
		</Accordion>		
	</Container>
	)
}

export default UserCard