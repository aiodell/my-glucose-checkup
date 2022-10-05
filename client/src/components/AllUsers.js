import { useState } from "react"
import UserContainer from "./UserContainer"
import SearchBar from "./SearchBar"

const AllUsers = ({currentUser, users }) => {
	const [search, setSearch] = useState("")

	const displayedNames = users.filter((user) => 
  	user.email.toLowerCase().includes(search.toLowerCase()))
	
	return(
		<div>
			<SearchBar setSearch = {setSearch}/>
			<UserContainer 
				users = {displayedNames}
				currentUser = {currentUser}
			/>
		</div>
	)
}

export default AllUsers