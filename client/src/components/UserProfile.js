import Button from "react-bootstrap/Button"
import {NavLink } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Card from 'react-bootstrap/Card';

const UserProfile = ({currentUser}) => {

	return(
		<div>
			{currentUser.has_profile ?
			<Container className="profile-container">
				<Card className= "user-profile">
					<Card.Header as="h2">Hello {currentUser.first_name}!</Card.Header>
					<Card.Body>
						<Card.Title>Personal Information</Card.Title>
					</Card.Body>
					<Card.Body>
						<Card.Text className="body-1"><b>Full Name: </b>{currentUser.first_name} {currentUser.last_name}</Card.Text>
						<Card.Text className="body-2"><b>Date of birth: </b>{currentUser.profile.month} / {currentUser.profile.day} / {currentUser.profile.year}</Card.Text>
						<Card.Text><b>Email: </b>{currentUser.email}</Card.Text>
						<Card.Text><b>Phone Number: </b>{currentUser.profile.phone}</Card.Text>
					</Card.Body>
					<Card.Body>
						<Card.Text><b>Family Member? </b>{currentUser.profile.family_member ? "Yes": "No"}</Card.Text>
						<Card.Text><b>Allows Followers? </b>{currentUser.profile.allow_followers ? "Yes" : "No" }</Card.Text>
						<Button>Edit Permissions</Button>
					</Card.Body>
				</Card>
			</Container>
			:
				<Container className="container-style">
				<Card className= "user-profile">
				<Card.Header as="h2">Finish creating your profile!</Card.Header>
					<Card.Body>
						<NavLink to="/create-profile">
							<Button className="btns">Finish Profile</Button> 
						</NavLink>					
					</Card.Body>
				</Card>
				</Container>
			}
		</div>
	)
}

export default UserProfile