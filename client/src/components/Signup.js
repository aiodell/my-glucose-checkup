import { useState } from "react";
import {useHistory, Link, NavLink} from "react-router-dom"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Signup = () => {
	const history = useHistory()
	const[errors, setErrors] = useState([])
	const[username, setUsername] = useState("")
	const[password, setPassword] = useState("")
	const[passwordConfirmation, setPasswordConfirmation] = useState("")
	const[firstName, setFirstName] = useState("")
	const[lastName, setLastName] = useState("")
	const[email, setEmail] = useState("")
	
	// sign up user and automatically redirect to login page after 5 seconds
	const handleSignup = (e) => {
		e.preventDefault()
		const userData ={
			username: username,
			password: password,
			password_confirmation: passwordConfirmation,
			first_name: firstName,
			last_name: lastName,
			email: email,
			has_profile: false
		}
		fetch(`/signup`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(userData)
		})
		.then(r => {
			if(r.ok){
				r.json().then( () => {history.push(`/login`)})
			} else{ 
				r.json().then(data => setErrors(data.errors)) 
			}
		})
	}

	return(
		<Container className="container-style">
		<h2 className="title">Sign Up</h2>
		{errors ? errors.map(e => <section>{e}</section>):null}
			<Form onSubmit={handleSignup}>
			<Row>
				<Col>
					<Form.Group className="mb=3" controlId="username">
						<Form.Label> Username </Form.Label>
						<Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
					</Form.Group>
					<Form.Group className="mb=3" controlId="first_name">
						<Form.Label> First Name </Form.Label>
						<Form.Control type="text" placeholder= "First Name" onChange={(e) => setFirstName(e.target.value)}/>					
					</Form.Group>
					<Form.Group className="mb=3" controlId="password">
						<Form.Label> Password </Form.Label>
						<Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
					</Form.Group>										
				</Col>
				<Col>
					<Form.Group className="mb=3" controlId="email">
						<Form.Label> Email </Form.Label>
						<Form.Control type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>					
					</Form.Group>
					<Form.Group className="mb=3" controlId="last_name">
						<Form.Label>Last Name </Form.Label>
						<Form.Control type="text" placeholder="Last Name"onChange={(e) => setLastName(e.target.value)}/>					
					</Form.Group >
					<Form.Group className="mb=3" controlId="password_confirmation">
						<Form.Label> Confirm Password </Form.Label>
						<Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setPasswordConfirmation(e.target.value)}/>					
					</Form.Group>								
				</Col>
			</Row>
				<div>
					<Button className="btns"type="submit">Submit</Button>
					<NavLink to="/">
						<Button className="btns" type="button">Cancel</Button>	
					</NavLink>
				</div>
				<p>Already have an account? <Link to='/login'>Login</Link></p>
			</Form>
		</Container>
	)
}

export default Signup

