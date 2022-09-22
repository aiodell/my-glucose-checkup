import { useState } from "react";
import {useHistory, Link} from "react-router-dom"

const Signup = () => {
	const history = useHistory()
	const [errors, setErrors] = useState([])
	const[userData, setUserData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password_confirmation: ""
	})
	
	const {
		first_name,
		last_name,
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
					history.pushState(`/login`)
				})
			} else{ r.json().then(json => setErrors(json.errors)) }
		})
	}

	return(
		<div>
			<form onSubmit={handleSignup}>
				<label htmlFor="first_name"> First Name </label>
				<input type="text" name="first_name" value= {first_name} placeholder= "First Name" onChange={handleChange}/>
				
				<label htmlFor="last_name">Last Name </label>
				<input type="text" name="last_name" value={last_name}  placeholder="Last Name"onChange={handleChange}/>
				
				<label htmlFor= "E-mail"> Email </label>
				<input type="text" name="email" value={email}  placeholder="Email" onChange={handleChange}/>
				
				<label htmlFor="password"> Password </label>
				<input type="password" name="password" placeholder="Password" onChange={handleChange}/>

				<label htmlFor="password_confirmation"> Confirm Password </label>
				<input type="password" name="password_confirmation"  placeholder="Confirm Password"value={password_confirmation} onChange={handleChange}/>
				
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

