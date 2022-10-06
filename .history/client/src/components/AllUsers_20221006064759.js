import { useState } from "react"
import UserContainer from "./UserContainer"
import SearchBar from "./SearchBar"

const AllUsers = ({currentUser, users, addNewFollow, removeCurrentFollowing}) => {
	const [search, setSearch] = useState("")

	const displayedNames = users?.filter((user) => 
		user.email.toLowerCase().includes(search.toLowerCase()) || 
		user.first_name.toLowerCase().includes(search.toLowerCase()) || 
		user.last_name.toLowerCase().includes(search.toLowerCase())
	)
	
	return(
		<div>
			<SearchBar setSearch = {setSearch}/>
			<UserContainer 
				users = {displayedNames}
				currentUser = {currentUser}
				addNewFollow = {addNewFollow}
				removeCurrentFollowing = {removeCurrentFollowing}
			/>
		</div>
	)
}

export default AllUsers