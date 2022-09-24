import { useState, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import Card from 'react-bootstrap/Card';

const AllReadings = ({readings, setReadings}) => {
	const [errors, setErrors] = useState([])
	const history = useHistory()

	useEffect(() => {
		fetch("/bgls")
		.then(r => {
			if(r.ok){
				r.json().then(readings => setReadings(readings))
			}else{
				r.json().then(data => {
					setErrors(data.error)
					history.push("/login")
				})
			}
		})
	}, [])

	const renderReadings = readings.map((bgl) => {
		return(
			<Card body as= {Link} key= {bgl.id} to= {`/bgls/${bgl.id}`}>
				<p>
					Value: {bgl.value} mg/dl <br/> 
					Entered {bgl.created_at} 
				</p>
			</Card>
		)
	})

	// move to new reading page
	const newReading = () => {
		history.push("/bgls/new")
	}
	
	// return tp dashboard
	const toDashboard = () => {
		history.push("/dashboard")
	}

	return(
		<>
			<button onClick={newReading}>New Reading</button>
			<button onClick={toDashboard}>Back to Dashboard</button>
			{renderReadings}
		</>
	)
}

export default AllReadings