import UserCard from "./UserCard"
import useState from "react"
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
					setIsFollowing = {setIsFollowing}
				/>
			))}
		</ul>
	)	
}

export default UserContainer