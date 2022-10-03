import { useEffect, useState } from "react"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import Container from "react-bootstrap/Container"
import SearchBar from "./SearchBar"
import FollowBtn from "./FollowBtn"

const FindUser = () => {
	const [users, setUsers] = useState([])

	useEffect(()=> {
		fetch(`users`)
		.then((r)=>r.json())
		.then(setUsers)
	}, [])
	
	const renderUsers = users.map((user) => {
		return(
		<Container>
			<Accordion as={Card} key={user.id}>
				<Accordion.Header as="h2">
				{user.first_name} {user.last_name}
				</Accordion.Header>
				<Accordion.Body>
					<FollowBtn />
				</Accordion.Body>
			</Accordion>		
		</Container>

		)
	})
	return(
		<div>
			<SearchBar />
			{renderUsers}
		</div>
	)
}

export default FindUser