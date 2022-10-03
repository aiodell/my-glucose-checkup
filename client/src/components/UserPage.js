import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import SearchBar from "./SearchBar"
import UserContainer from "./UserContainer"

const UserPage = ({currentUser}) => {
	const[users, setUsers] = useState([])
	const [showSearch, setShowSearch] = useState(false)
	const [search, setSearch] = useState("")
	const[follows, setFollows] = useState([])
	const[errors, setErrors] = useState([])
	const history = useHistory()

	useEffect(() => {
		fetch("/users")
		.then((r) => r.json())
		.then(setUsers)
	}, [])

	const toggleSearch = () => setShowSearch((prev) => !prev)
	// display the user's name when searched by email
	const displayedUsers = users.filter((user) => 
  	user.email.toLowerCase().includes(search.toLowerCase()));
	return(
		
		<Container className="container-style">
			<div>
				<Button onClick={toggleSearch}>{ showSearch ? "Hide Search Bar" : "Search For User"}</Button>
				{showSearch ? <SearchBar setSearch = {setSearch}/> : null}			
			</div>
			<UserContainer users = {displayedUsers} />
		</Container>
		
	)
}

export default UserPage