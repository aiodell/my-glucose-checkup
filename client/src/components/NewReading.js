import {useState} from "react"
import {useHistory} from "react-router-dom"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';

const NewReading = ({addNewReading}) => {
	const[errors, setErrors] = useState([])
	const history = useHistory()
	const[readingData, setReadingData] = useState({value: ""})

	const {value} = readingData

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
					setErrors(data.error)
				})
			}
		})
	}

	return(
		<div>
			<h2 className="title">New Reading</h2>
			{errors ? errors.map(e => <section>{e}</section>):null}
			<Form onSubmit={onSubmit}>
				<Form.Group className="mb=3" controlId="value">
					<Form.Label>Enter BGL</Form.Label>
					<Form.Control type="text" placeholder="Enter value" onChange= {(e) => setReadingData(e.target.value)}/>				
				</Form.Group>
				<div>
					<Button className="btns" type="submit" value="submit">Submit</Button>
					<Button className="btns" type="button" value="cancel" href="/dashboard">Cancel</Button>
				</div>
			</Form>
		</div>
	)
}

export default NewReading