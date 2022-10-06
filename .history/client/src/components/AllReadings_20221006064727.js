import { useState, useEffect } from "react"
import Pagination from "react-bootstrap/Pagination"
import { useHistory, Link, NavLink } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

const AllReadings = ({readings, setReadings }) => {
	const [errors, setErrors] = useState([])
	const [ currentRange, setCurrentRange ] = useState([0, 10]);
	const history = useHistory()

	useEffect(() => {
		fetch("/bgls")
		.then(r => {
			if(r.ok){
				r.json().then(readings => setReadings(readings))
			}else{
				r.json().then(data => {
					setErrors(data.errors)
					history.push("/login")
				})
			}
		})
	}, [])

	const handleDelete = (id) => {
		fetch(`/bgls/${id}`, {
			method: "DELETE",
		})
		.then(() =>{
			setReadings((readings) => readings.filter((reading) => reading.id !== id))
		})
	}

		// render the current Bgls
	const renderReadings = readings.map((bgl) => {
		return(
			<Card className="bgl-card" key= {bgl.id}>
				<Card.Body as={Link} to= {`/bgls/${bgl.id}`}>
					<Card.Title className="card-title">
						{bgl.value} mg/dl
					</Card.Title>
					<Card.Text>
						{bgl.created_at} 
					</Card.Text>
				</Card.Body>
				<Button className="delete-btn" onClick={() => handleDelete(bgl.id)}>
					Delete
				</Button>				
			</Card>
		)
	})


	// pagination of the Bgls
  	const handlePageClick = (e) => {
    const pageNum = e.target.innerText;

    if(pageNum === '1') {
      setCurrentRange([ 0, 20 ]);
    } else {
      const start = pageNum * 20 - 19;
      const end = pageNum * 20;
      setCurrentRange([ start, end ]);
    }
  }	

	const bglPages = () => {
    let pages = [];
    let numOfPages = renderReadings.length / 20 + 1;

    for( let pageNum = 1; pageNum <= numOfPages; pageNum++ ) {
      pages.push(
        <Pagination.Item
          key={ pageNum }
          onClick={ handlePageClick }
          active={ currentRange[1] / 20 === pageNum }
          disabled={ currentRange[1] / 20 === pageNum }
        >
          { pageNum }
        </Pagination.Item>
      )
    }
    return pages;
  }
  	// end of pagination of Bgls	

	const bglPage = renderReadings.slice(...currentRange)

	return(
		<>
		{errors ? errors.map(e => <section>{e}</section>):null}		
			<Container className="all-bgl-container-style">
				<h3 className="title">All Readings</h3>
				<NavLink to="/bgls/new">
					<Button className="btns">Add New</Button>				
				</NavLink>
				<NavLink to="/dashboard">
					<Button className="btns">Dashboard</Button>				
				</NavLink>
				<Pagination>{ bglPages() }</Pagination>
					{bglPage.length > 0 ? bglPage : "You do no have any readings registered!"}
				<Pagination>{ bglPages() }</Pagination>
			</Container>
		</>
	)
}

export default AllReadings