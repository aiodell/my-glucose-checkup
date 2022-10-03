import React from "react"
import User from "./User"
import Card from "react-bootstrap/Card"

const UserContainer = ({users}) => {

	return(
		<Card className="bgl-card">
			{users.map((user) => (
				<User
				key = {user.key}
				user = {user}
				/>
			))}	
		</Card>
	)
}

export default UserContainer;