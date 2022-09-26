import { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"

const EventDetails = () => {
	const history = useHistory()
	const [{data: bgl, error, status}, setBgl] = useState({
		data: null,
		error: null,
		status: "pending"
	})
	const { id } = useParams()

	useEffect(() => {
		fetch(`/bgls/${id}`).then((r) => {
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
	}, [id])

	if(status === "pending") return <h1>Gathering your data...</h1>
	if(status === "rejected") return <h1>Error: {error.error}</h1>

	// return tp dashboard
	const toDashboard = () => {history.push("/dashboard")}

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
						<Link to={`/events/${event.id}/bgl_events/edit`}>edit event</Link>
						</p>
					</div>
				))}
			</section>
			<div>
				<Link to={`/bgls/${id}/bgl_events/new`}>add new event</Link>
			</div>
		</div>
	)
}

export default EventDetails