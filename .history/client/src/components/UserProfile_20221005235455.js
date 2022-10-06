import Button from "react-bootstrap/Button"
import {NavLink, useHistory } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Card from 'react-bootstrap/Card';
import Accordion from "react-bootstrap/Accordion"

const UserProfile = ({currentUser}) => {

	const renderFollowing = currentUser.followees?.map((user) => {
		console.log(user.id)
		return(
			<Card>
				<Card.Title>{user.first_name} {user.last_name}</Card.Title>
				<Card.Text></Card.Text>
			</Card>
		)
	})

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
				</Card>
				{/* who the user is following */}
				<Accordion as={Card} className= "user-profile">
					<Accordion.Header as="h2" className="follow-header">
						Following
					</Accordion.Header>
					<Accordion.Body>{renderFollowing}</Accordion.Body>
				</Accordion>							
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