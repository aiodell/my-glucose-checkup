import {useEffect, useState} from "react"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import Container from "react-bootstrap/Container"
import FollowBtn from "./FollowBtn"

const UserCard = ({user, currentUser, addNewFollow, deleteFollow}) => {

	return(
	<Container>
		<Accordion as={Card} key={user.id}>
			<Accordion.Header as="h2">
			{user.first_name} {user.last_name}
			</Accordion.Header>
			<Accordion.Body>
				Also known as: <b> {user.username} </b>	
			</Accordion.Body>
			{user.has_profile ? <Accordion.Body>
        <FollowBtn
          currentUser = {currentUser}
          user = {user}
          deleteFollow = {deleteFollow}
          addNewFollow = {addNewFollow}
        />		
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