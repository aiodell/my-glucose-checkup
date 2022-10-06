import {useState} from "react"
import {useHistory, NavLink} from "react-router-dom"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';

const NewReading = ({addNewReading}) => {
	const[errors, setErrors] = useState([])
	const history = useHistory()
	const[value, setValue] = useState({})

	const onSubmit = (e) => {
		e.preventDefault()
		
		const reading = {value: value}

		fetch(`/bgls`, {
			method:"POST",
			headers: {
				"Content-Type": "application/json"
			},
			body:JSON.stringify(reading)
		})
		.then(r => {
			if(r.ok){
				r.json().then(newReading => {
					addNewReading(newReading)
					history.push("/dashboard")
				})
			}else {
				r.json().then(data => {
					setErrors(data.errors)
				})
			}
		})
	}

	return(
		<Container className="container-style">
			<h2 className="title">New Reading</h2>
			{errors ? errors.map(e => <section>{e}</section>):null}
			<Form className="form-style" onSubmit={onSubmit}>
				<Form.Group className="mb=3" controlId="value">
					<Form.Label>Enter BGL</Form.Label>
					<Form.Control type="text" placeholder="Enter value" onChange= {(e) => setValue(e.target.value)}/>				
				</Form.Group>
				<div>
					<Button className="btns" type="submit" value="submit">Submit</Button>
				<NavLink to="/dashboard">
					<Button className="btns" type="button" value="cancel">Cancel</Button>
				</NavLink>
				</div>
			</Form>
		</Container>
	)
}

export default NewReading