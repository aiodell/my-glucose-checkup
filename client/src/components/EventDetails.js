import { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"

const EventDetails = () => {
	const[bgl, setBgl] = useState({})
	const[events, setEvents] = useState({})
	const[errors, setErrors] = useState([])
	const history = useHistory()
	const params = useParams()
	
	// fetch the selected Bgl
	const fetchBgl = () => {
		fetch(`/bgls/${params.id}`)
		.then(r => {
			if(r.ok){
				r.json().then(bgl => setBgl(bgl))
			}else{
				r.json().then(data => {
					setErrors(data.error)
					history.push('/login')
				})
			}
		})
	}

	// fetch the events associated with the selected Bgl
	const fetchEvents = () => {
		fetch(`/events`)
		.then(r => {
			if(r.ok){
				r.json().then(events => setEvents(events))
			}else{
				r.json().then(data =>{
					setErrors(data.error)
					history.push('/dashboard')
				})
			}
		})
	}

	// use useEffect on both Bgl and Event fetches
	useEffect(() => {
		fetchBgl()
		fetchEvents()
	 }, [])

	// user can have a comment associated with every event category entered, but is optional
	return(
		<div>
			<h3>Back to Dashboard</h3>
			<div>
				{bgl.value}
			</div>
			<div>
				
			</div>
			<div>
				<button>Edit</button>
				<button>Save</button>
			</div>
		</div>
	)
}

export default EventDetails