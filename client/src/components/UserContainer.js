import UserCard from "./UserCard"

const UserContainer = ({users, currentUser}) => {

	return(
		<ul>
			{users.map((user) => (
				<UserCard 
					key = {user.id}
					user = {user}
					currentUser = {currentUser}
				/>
			))}
		</ul>
	)	
}

export default UserContainer