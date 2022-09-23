import { useHistory } from 'react-router-dom'

const NavBar = ({updateUser, currentUser}) => {

	const history = useHistory()

	const handleLogout = (e) => {
		fetch(`/logout`, {
			method: 'DELETE'
		})
		.then(() => {
			updateUser("")
			history.push('/')
		})
	}

	return(
		<div>
			{currentUser ? <button onClick={handleLogout}>Log Out</button> : null}
		</div>
	)
}

export default NavBar
