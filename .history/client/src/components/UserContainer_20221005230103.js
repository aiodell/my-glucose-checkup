import UserCard from "./UserCard"

const UserContainer = ({users, currentUser, addNewFollow, deleteFollow}) => {
	const[isFollowing, setIsFollowing] = useState(false)
	return(
		<ul>
			{users.map((user) => (
				<UserCard 
					key = {user.id}
					user = {user}
					currentUser = {currentUser}
					addNewFollow = {addNewFollow}
					deleteFollow = {deleteFollow}
					isFollowing = {isFollowing}
				/>
			))}
		</ul>
	)	
}

export default UserContainer