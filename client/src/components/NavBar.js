import { useHistory } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = ({updateUser, currentUser}) => {
	const history = useHistory()

	// log out only available when logged in
	// const handleLogout = (e) => {
	// 	fetch(`/logout`, {
	// 		method: 'DELETE'
	// 	})
	// 	.then(() => {
	// 		updateUser("")
	// 		history.push('/')
	// 	})
	// }
	// {currentUser ? <button onClick={handleLogout}>Log Out</button> : null}		
	return(
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">My Glucose Check-Up</Navbar.Brand>
			</Container>
		</Navbar>
	)
}

export default NavBar
