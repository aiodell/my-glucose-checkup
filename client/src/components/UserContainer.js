import UserCard from "./UserCard"

const UserContainer = ({users, currentUser, addNewFollow, deleteFollow}) => {

	return(
		<ul>
			{users.map((user) => (
				<UserCard 
					key = {user.id}
					user = {user}
					currentUser = {currentUser}
					addNewFollow = {addNewFollow}
					deleteFollow = {deleteFollow}
				/>
			))}
		</ul>
	)	
}

export default UserContainer