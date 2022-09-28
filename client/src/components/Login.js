import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';

const Login = ({updateUser}) => {
	const history = useHistory()
	const [errors, setErrors] = useState([])
 	const[username, setUsername] = useState("")
	const[password, setPassword] = useState("")

	 function handleLogin(e){
		e.preventDefault()
		const user = {
				username,
				password
		}
		// Logs in user
		fetch(`/login`,{
			method:"POST",
			headers:{"Content-Type": "application/json"},
			body:JSON.stringify(user)
		})
		.then(r => {
			if(r.ok){
					r.json().then(user => {
						updateUser(user)
						history.push(`/dashboard`)
					})
			}else {
					r.json().then(json => setErrors(json.errors))
			}
		})
	}

	return(
	<Container className="form-style">
		<h2 className="title">Login</h2>
			{errors ? errors.map(e => <section>{e}</section>):null}
			<Form onSubmit={handleLogin}>
					<Form.Group className="mb=3" controlId="username">
						<Form.Label> Username </Form.Label>
						<Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>					
					</Form.Group>
					<Form.Group className="mb=3" controlId="password">
						<Form.Label> Password </Form.Label>
						<Form.Control type="password" placeholder="Password" onChange={(e => setPassword(e.target.value))}/>					
					</Form.Group>
					<div>
						<Button className="btns" type="submit" value="Login">Login</Button>
						<p>Need an account? <Link to='/signup'>Sign up!</Link></p>
					</div>				
			</Form>				
	</Container>
	)
}

export default Login

