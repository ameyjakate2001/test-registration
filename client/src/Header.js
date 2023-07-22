import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const [auth, setAuth] = useState(localStorage.getItem('auth'))
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem('auth')
    setAuth(!auth)
    navigate('/')
  }

  return (
    <div class='header'>
      <ul>
        <li>
          <Link to='/'>
            <h3>welcome to AlgoTest</h3>
          </Link>
        </li>
        <li>
          {!auth ? (
            <Link to='/login'>
              <button type='submit' className='btn btn-primary'>
                Login
              </button>
            </Link>
          ) : (
            <button
              type='submit'
              className='btn btn-primary'
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Header
