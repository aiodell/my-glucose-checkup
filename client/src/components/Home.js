import {useHistory} from "react-router-dom"
import {useEffect} from "react"
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button"
import bloodtest from '../bloodtest.jpg'
import '../styles.css';
// main display when a user enters the page
const Home = () => {
  
	return (
    <Container className="Home">
      <header className="home-background">
          <h1 className="welcome">
            Welcome to My Glucose Check-Up
          </h1>
          <div className="home-btn-div">
            <Button className="btns" href="/signup">Signup</Button>{' '}
            <Button className="btns" href="/login">Login</Button>
          </div>
      </header>
    </Container>
  )
}

export default Home