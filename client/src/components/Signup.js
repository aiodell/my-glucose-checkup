import { useState } from "react";
import {useHistory, Link} from "react-router-dom"

const Signup = () => {
	const history = useHistory()
	const [errors, setErrors] = useState([])
	const[userData, setUserData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
		password_confirmation: ""
	})
	
	const {
		first_name,
		last_name,
		username,
		password,
		password_confirmation,
		email
	} = userData

	const handleChange = (e) => {setUserData({...userData, [e.target.name]: e.target.value})}

	// sign up user and automatically redirect to login page after 5 seconds
	const handleSignup = (e) => {
		e.preventDefault()

		fetch(`/signup`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(userData)
		})
		.then(r => {
			if(r.ok){
				r.json().then( () => {
					history.push(`/login`)
				})
			} else{ r.json().then(json => setErrors(json.errors)) }
		})
	}

	return(
		<div>
			<form onSubmit={handleSignup}>

				<label htmlFor= "username"> Username </label>
				<input type="text" name="username" value={username} placeholder="Username" onChange={handleChange}/>

				<label htmlFor="password"> Password </label>
				<input type="password" name="password" value = {password} placeholder="Password" onChange={handleChange}/>

				<label htmlFor="password_confirmation"> Confirm Password </label>
				<input type="password" name="password_confirmation" value={password_confirmation} placeholder="Confirm Password" onChange={handleChange}/>
				
				<label htmlFor="first_name"> First Name </label>
				<input type="text" name="first_name" value= {first_name} placeholder= "First Name" onChange={handleChange}/>
				
				<label htmlFor="last_name">Last Name </label>
				<input type="text" name="last_name" value={last_name}  placeholder="Last Name"onChange={handleChange}/>
				
				<label htmlFor= "E-mail"> Email </label>
				<input type="text" name="email" value={email}  placeholder="Email" onChange={handleChange}/>
				
				<div>
					<button type="submit">Submit</button>
					<button type="button">Cancel</button>	
				</div>
				<p>Already have an account? <Link to='/login'>Login</Link></p>
			</form>
		</div>
	)
}

export default Signup

