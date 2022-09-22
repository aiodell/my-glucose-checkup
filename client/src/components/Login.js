import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Login = ({updateUser}) => {
	const history = useHistory()
	const [errors, setErrors] = useState([])
	const[loginData, setLoginData] = useState({
		email: "",
		password: ""
	 })

	 const { email, password } = loginData

	 const handleChange = (e) => { setLoginData({ ...loginData, [e.target.name]: e.target.value }) }

	 function handleLogin(e){
		e.preventDefault()
		const user = {
				email,
				password
		}
		// Logs in user
		fetch(`/login`,{
			method:"POST",
			headers:{"Content-Type": "application/json"},
			body:JSON.stringify(user)
		})
		.then(res => {
			if(res.ok){
					res.json().then(user => {
						updateUser(user)
						history.push(`/dashboard`)
					})
			}else {
					res.json().then(json => setErrors(json.errors))
			}
		})
	}

	
	return(
	<div>
		<h2>Login</h2>
			{errors ? errors.map(e => <section>{e}</section>):null}
			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor= "E-mail"> Email </label>
					<input type="text" name="email" value={email} placeholder="Email" onChange={handleChange}/>

					<label htmlFor="password"> Password </label>
					<input type="password" name="password" value={password} placeholder="Password" onChange={handleChange}/>

					<div>
						<button type="submit" value="Login">Login</button>
						<p>Need an account? <Link to='/signup'>Sign up!</Link></p>
					</div>

				</div>
			</form>				
	</div>
	)
}

export default Login

