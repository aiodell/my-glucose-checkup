import { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"

const EventDetails = () => {
	const[bgl, setBgl] = useState({})
	const[errors, setErrors] = useState([])
	const history = useHistory()
	const params = useParams()
	
	// use useEffect on both Bgl and Event fetches
	useEffect(() => {
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
	}, [])

	// user can have a comment associated with every event category entered, but is optional
	return(
		<div>
			<h1>Test</h1>
			<button>Edit</button>
			<button>Save</button>
		</div>
	)
}

export default EventDetails