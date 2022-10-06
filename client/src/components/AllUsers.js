import { useState } from "react"
import UserContainer from "./UserContainer"
import SearchBar from "./SearchBar"

const AllUsers = ({currentUser, users, addNewFollow, deleteFollow}) => {
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
				deleteFollow = {deleteFollow}
			/>
		</div>
	)
}

export default AllUsers