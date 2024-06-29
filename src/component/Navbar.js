import React from 'react'
import './navbar.css'
import { Link,NavLink,useNavigate} from 'react-router-dom'
const Navbar = () => {
    const navigate=useNavigate()
    const auth=localStorage.getItem('logged');            //prevent logout      
    const user=JSON.parse(localStorage.getItem('user'));  //get user details     
    const userName="Hemant Kumar"
    const handleLogout=()=>{                            //log out function
        localStorage.removeItem('logged')
        // localStorage.clear()               
        navigate('/login')
    }
  return (
  <nav className="navbar navbar-expand-sm bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Deshboard</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {                                             //protected route hide
        auth?
        <>
          <li className="nav-item">
            <NavLink className="nav-link"  to="/">Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link"  to="/add">Add</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/update">Update</NavLink>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {userName || user.name}   
            </Link>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" onClick={handleLogout}>Log Out</a></li>
              
            </ul>
          </li>
        </>:
        <>    
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">Register</NavLink>
          </li>
        </>
        }   
      </ul>
      </div>
  </div>
  </nav>
  )
}

export default Navbar
