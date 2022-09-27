import { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import BglUpdateForm from "./BglUpdateForm"

const BglEventDetails = ({deleteReading, updateBgl}) => {
	const[showForm, setShowForm] = useState(false)
	const history = useHistory()
	const [{data: bgl, error, status}, setBgl] = useState({
		data: null,
		error: null,
		status: "pending"
	})
	const params = useParams()

	useEffect(() => {
		fetch(`/bgls/${params.id}`).then((r) => {
			if(r.ok){
				r.json().then((bgl) =>
				setBgl({data: bgl, error: null, status: "resolved"})
				)
			} else{
				r.json().then((data) => {
					setBgl({data: null, error: data.error, status: "rejected"})
				})
			}
		})
	}, [])

	if(status === "pending") return <h1>Gathering your data...</h1>
	if(status === "rejected") return <h1>Error: {error.error}</h1>

	// return tp dashboard
	const toDashboard = () => {history.push("/dashboard")}
	const showUpdateForm = () => { setShowForm(current => !current)}

	const handleDelete = () => {
		fetch(`/bgls/${params.id}`, {
			method: "DELETE",
		})
		.then(() =>{
			deleteReading(params.id)
			history.push('/dashboard')
		})
	}

	return(
		<div>
			<button onClick={toDashboard}>To Dashboard</button>
			<h2>{bgl.value}</h2>
			<h2>{bgl.created_at}</h2>
			<section>
				<h3>Event Details:</h3>
				{bgl.events.map((event) => (
					<div key= {event.id}>
						<p>{event.category} <br/>
						</p>
					</div>
				))}
			</section>
			<div>
				<Link to={`/bgls/${params.id}/bgl_events/new`}>add new event</Link>
			</div>
			<div>
				<button onClick = {handleDelete}>Delete</button>
				<button onClick= {showUpdateForm}>Edit Value</button>
				{showForm ? 
					<BglUpdateForm 
						bgl= {bgl} 
						setBgl= {setBgl} 
						updateBgl = {updateBgl}
					/> 
				: null}
			</div>
		</div>
	)
}

export default BglEventDetails