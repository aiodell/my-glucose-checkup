import {useState} from "react"
import {useHistory} from "react-router-dom"

const NewReading = ({addNewReading}) => {
	const[errors, setErrors] = useState([])
	const history = useHistory()
	const[readingData, setReadingData] = useState({
		value: ""
	})

	const {value} = readingData

	const handleChange = (e) => {setReadingData({...readingData, [e.target.name]: e.target.value})}
	
	const onSubmit = (e) => {
		e.preventDefault()
		
		const reading = {value: value}

		fetch(`/bgls`, {
			method:"POST",
			headers: {"Content-Type": "application/json"},
			body:JSON.stringify(reading)
		})
		.then(r => {
			if(r.ok){
				r.json().then(newReading => {
					addNewReading(newReading)
					history.push("/bgls/all")
				})
			}else {
				r.json().then(data => {
					setErrors(data.errors)
				})
			}
		})
	}

	// if cancelled, return to all readings
	const toAllReadings = () => {
		history.push("/bgls/all")
	}

	return(
		<div>
			<h2>New Reading</h2>
			<form onSubmit={onSubmit}>
				<label htmlFor="value">Enter BGL</label>
				<input type="text" name="value" placeholder="Enter value" onChange = {handleChange}/>
				<div>
					<button type="submit" value="submit">Submit</button>
					<button type="button" value="cancel" onClick={toAllReadings}>Cancel</button>
				</div>
			</form>
		</div>
	)
}

export default NewReading