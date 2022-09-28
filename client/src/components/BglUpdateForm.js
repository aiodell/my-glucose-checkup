import { useState } from "react"
import {useParams } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';

const BglUpdateForm = ({updateBgl, setBgl}) => {
	const [errors, setErrors] = useState([])
	const[value, setValue]= useState("")
	const {id} = useParams()

	const handleUpdate = (e) => {
		e.preventDefault()
		
		const updatedBgl = {value: value}

		fetch(`/bgls/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify(updatedBgl)
		})
		.then(r => {
			if(r.ok){
				r.json().then(bglUpdate => {
					updateBgl(bglUpdate)
				})
			}else{
				r.json().then(data => {
					setErrors(data.errors)
				})
			}e.target.reset()
		})
	}
	
	return(
		<Container className="container-style">
			{errors ? errors.map(e => <section>{e}</section>):null}
			<Form onSubmit={handleUpdate}>
				<Form.Group className="mb=3" controlId="value">
					<Form.Control type="text" name="value" onChange={(e) => setValue(e.target.value)}/>
					<Button className="btns" type="submit">Update</Button>			
				</Form.Group>
			</Form>
		</Container>
	)
}

export default BglUpdateForm