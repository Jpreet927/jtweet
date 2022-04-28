import React from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import '../../Styles/Navbar/Navbar.css'

function Navbar() {
  return (
    <div className='navbar__container'>
        <img src={require('../../Assets/Images/Logo-3D-Soft.png')} className='navbar__logo' alt="Jtweet Logo" />
        <nav>
            <ul>
                <Link to="/home" style={{ textDecoration: 'none' }}><li>Home</li></Link>
                <Link to="/messages" style={{ textDecoration: 'none' }}><li>Messages</li></Link>
                <Link to="/profile" style={{ textDecoration: 'none' }}><li>Profile</li></Link>
            </ul>
        </nav>
        <div className="navbar__search-avatar">
            <div className="navbar__search">
                <SearchIcon className="navbar__search-icon" />
                <input type="text" placeholder='Search'/>
            </div>
            <div className="navbar__avatar">
                <img src={require("../../Assets/Images/Default-pfp.jpg")} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Navbar