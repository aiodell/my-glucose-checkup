import { useHistory, NavLink } from 'react-router-dom'
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
		<>
		{currentUser ?
			<Navbar bg="dark" variant="dark" expand="lg">
			<Container className="nav-bar">
				<Navbar.Brand>My Glucose Checkup</Navbar.Brand>	
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
					<Nav className="me-auto">
						<NavLink className="nav-link" to="/dashboard">
							<Nav.Item>Dashboard</Nav.Item>						
						</NavLink>
						<NavLink className="nav-link" to="/bgls/all">
							<Nav.Item>My BGLs</Nav.Item>			
						</NavLink>
						<NavLink className="nav-link" to="/bgls/new">
							<Nav.Item>New Reading</Nav.Item>						
						</NavLink>
						<NavLink className="nav-link" to="/me">
							<Nav.Item>My Account</Nav.Item>
						</NavLink>						
						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					</Nav> 		
			</Container> 
		</Navbar> : null } 
		</>
	)
}

export default NavBar
