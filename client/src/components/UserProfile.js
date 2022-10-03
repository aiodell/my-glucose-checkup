import Button from "react-bootstrap/Button"
import {NavLink } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

const UserProfile = ({currentUser}) => {
	console.log(currentUser.profile.day)
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
						<Card.Text><b>Allows Followers? </b>{currentUser.profile.allow_followers ? "No" : "Yes" }</Card.Text>
						<Button>Edit Permissions</Button>
					</Card.Body>
				</Card>
					<Accordion as={Card} className="follow">
						<Accordion.Item eventKey="0">
							<Accordion.Header as="h2"><b>Following</b></Accordion.Header>
							<Accordion.Body>
								You are not following anyone.
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>

					<Accordion as={Card} className="follow">
						<Accordion.Item eventKey="1">
							<Accordion.Header as="h2"><b>Followers</b></Accordion.Header>
							<Accordion.Body>
								You have no followers
							</Accordion.Body>							
						</Accordion.Item>
					</Accordion>			
			</Container>
			:
				<div>
				<h3>Finish creating your profile! </h3>
					<NavLink to="/create-profile">
						<Button className="btns">Finish Profile</Button> 
					</NavLink>
				</div>
			}
		</div>
	)
}

export default UserProfile