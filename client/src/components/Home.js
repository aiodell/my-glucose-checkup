import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button"
import {NavLink} from "react-router-dom"
import '../styles.css';
// main display when a user enters the page
const Home = ({currentUser}) => {
  
	return (
    <Container className="Home">
      <header className="home-background">
          <h1 className="welcome">
            Welcome to My Glucose Check-Up
          </h1>
         {currentUser ? null :  <div className="home-btn-div">
            <NavLink to= "/signup">
              <Button className="btns" >Sign Up</Button>
            </NavLink>
            <NavLink to="/login">
              <Button className="btns" >Login</Button>
            </NavLink>
          </div>}
      </header>
    </Container>
  )
}

export default Home