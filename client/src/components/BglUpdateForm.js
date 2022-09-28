import { useState, useEffect } from "react"
import {useParams, useHistory } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';

const BglUpdateForm = ({updateBgl}) => {
	const [errors, setErrors] = useState([])
	const[value, setValue] = useState({ })
	const[bgl, setBgl]= useState([])
	const history = useHistory()
	const {id} = useParams()

	useEffect(()=> {
		fetch(`/bgls/${id}`)
		.then((r)=>r.json())
		.then(setBgl)
	}, [])

	const handleUpdate = (e) => {
		e.preventDefault()
		const updatedBgl = {value: value}

		fetch(`/bgls/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedBgl)
		})
		.then(r => {
			if(r.ok){
				r.json().then(bglUpdate => {
					updateBgl(bglUpdate)
					history.push("/bgls/all")
				})
			}else{
				r.json().then(data => {
					setErrors(data.error)
				})
			}e.target.reset()
		})
	}

	return(
		<Container className="container-style">
			{errors ? errors.map(e => <section>{e}</section>):null}
			<Form onSubmit={handleUpdate}>
				<Form.Group>
					<Form.Control type="text" name="value" onChange={(e) => setValue(e.target.value)}/>
					<Button className="btns" type="submit">Update</Button>			
				</Form.Group>
			</Form>
		</Container>
		
	)

}

export default BglUpdateForm