import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

// will only be completed once
const CreateProfile = () => {
	const[user, setUser] = useState("")
	const[errors, setErrors] = useState([])
	const[month, setMonth] = useState("")
	const[day, setDay] = useState("")
	const[year, setYear] = useState("")
	const[phone, setPhone] = useState("")
	const[noFollows, setNoFollows] = useState(false)
	const[isFamily, setIsFamily] = useState(false)
	const history = useHistory()
	const params = useParams()

	useEffect(() => {
		fetch(`/users/${params.id}`)
		.then((r)=> r.json())
		.then(setUser)
	}, [params.id])

	const onSubmit = (e) => {
		e.preventDefault()

		const profileData = {
			user_id: user.id,
			month: month,
			day: day,
			year: year,
			phone: phone,
			allow_followers: noFollows,
			family_member: isFamily
		}

		fetch("/profiles", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(profileData)
		}).then((r) => {
			if(r.ok){
				history.push("/me")
			}else {
				r.json().then((data) => setErrors(data.errors))
			}
		})
	}

	const handleAllowFollowers = (e) => {setNoFollows(e => !e)}
	const handleFamilyCheck = (e) => {setIsFamily(e => !e)}

	return(
		<Container className="container-style">
			{errors ? errors.map(e => <section>{e}</section>):null}
			<h3 className= "form-title">Complete your profile</h3>	
			<Form  className="profile-completion" onSubmit={onSubmit}>
				<Form.Label className="profile-label" >Date of Birth</Form.Label>
				<Form.Group className="mb=3" controlId="month">
					<Form.Control type="number" min="1" max="12" placeholder="Enter Month" onChange={(e) => setMonth(e.target.value)}/>
				</Form.Group>
				<Form.Group className="mb=3" controlId="day">
					<Form.Control type="number" min="1" max="31"placeholder="Enter Day" onChange={(e) => setDay(e.target.value)}/>
				</Form.Group>
				<Form.Group className="mb=3" controlId="year">
					<Form.Control type="number" min="1900" max="2004" placeholder="Enter Year" onChange={(e) => setYear(e.target.value)}/>
				</Form.Group>
				<Form.Group className="mb=3" controlId="phone">
					<Form.Label className="profile-label">Phone Number</Form.Label>
					<Form.Control type="text" placeholder="Enter Phone Number" onChange={(e) => setPhone(e.target.value)}/>
				</Form.Group>
				<Form.Group className="mb=3" controlId="allow_followers">
					<Form.Check
						type="checkbox"
						label= "I don't want any followers"
						onChange={handleAllowFollowers}
					/>
				</Form.Group>	
				<Form.Group className="mb=3" controlId="family_member">
					<Form.Check
						type="checkbox"
						label="I am only a family member"
						onChange={handleFamilyCheck}
					/>
				</Form.Group>
				<Button type="submit" className="delete-btn">Submit</Button>		
			</Form>
		</Container>
	)
}

export default CreateProfile