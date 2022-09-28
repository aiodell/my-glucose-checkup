import { useHistory } from 'react-router-dom'
import Container from "react-bootstrap/Container"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles.css';

const NavBar = ({updateUser, currentUser}) => {
	const history = useHistory()

	// log out only available when logged in
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
		<Navbar bg="dark" variant="dark" expand="lg">
		{currentUser ? 
			<Container className="nav-bar">
				<Navbar.Brand>My Glucose Checkup</Navbar.Brand>	
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
					<Nav className="me-auto">
						<Nav.Link href="/dashboard">Dashboard</Nav.Link>
						<Nav.Link href="/bgls/all">My BGLs</Nav.Link>
						<Nav.Link href="/bgls/new">New Reading</Nav.Link>
						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					</Nav> 		
			</Container> 
		: null } 	
		</Navbar>
	)
}

export default NavBar
