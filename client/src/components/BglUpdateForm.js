import { useState } from "react"
import {useParams, useHistory } from "react-router-dom"

const BglUpdateForm = ({updateBgl}) => {
	const[bgl, setBgl]= useState([])

	useEffect(()=> {
		fetch(`/bgls/${id}`)
		.then((r)=>r.json())
		.then(setBgl)
	}, [])

	const[value, setValue] = useState({value: ""})
	
	return(
		<form>
			<label>Update Bgl Value from {bgl.value}</label>
		</form>
	)

}

export default BglUpdateForm