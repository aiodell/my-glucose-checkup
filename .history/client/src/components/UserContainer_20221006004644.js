import UserCard from "./UserCard"
import {useState} from "react"
const UserContainer = ({users, currentUser, addNewFollow, deleteFollow, removeCurrentFollowing}) => {
	return(
		<ul>
			{users.map((user) => (
				<UserCard 
					key = {user.id}
					user = {user}
					currentUser = {currentUser}
					addNewFollow = {addNewFollow}
					deleteFollow = {deleteFollow}
					removeCurrentFollowing = {removeCurrentFollowing}
				/>
			))}
		</ul>
	)	
}

export default UserContainer