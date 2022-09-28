import { useState, useEffect } from "react"
import {useParams } from "react-router-dom"

const BglUpdateForm = ({updateBgl}) => {
	const [errors, setErrors] = useState([])
	const[value, setValue] = useState({value: ""})
	const[bgl, setBgl]= useState([])
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
					window.location.reload(false)
				})
			}else{
				r.json().then(data => {
					setErrors(data.error)
				})
			}e.target.reset()
		})
	}

	const handleChange = (e) => {
		setValue(e.target.value)
	}
	
	return(
		<div>
			{errors ? errors.map(e => <section>{e}</section>):null}
			<form onSubmit={handleUpdate}>
				<label htmlFor="value">Update Bgl Value</label>
				<input type="text" name="value" onChange={handleChange}/>
				<button type="submit">Update</button>
			</form>
		</div>
		
	)

}

export default BglUpdateForm