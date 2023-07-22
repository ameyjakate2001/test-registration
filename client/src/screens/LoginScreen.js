import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const LoginScreen = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const loginHandler = (e) => {
    e.preventDefault()
    if (!email || !password) return setError('Please fill all the fields')
    axios
      .post('http://localhost:7000/users/signin', {
        email,
        password,
      })
      .then((res) => {
        console.log(res)
        localStorage.setItem('auth', true)
        navigate('/adminPanel')
        setError('')
      })
      .catch((e) => {
        console.log('in error')
      })
  }

  return (
    <form id='submitForm'>
      <h3>Sign In</h3>
      <div className='mb-3'>
        <label>Email address</label>
        <input
          type='email'
          className='form-control'
          placeholder='Enter email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          placeholder='Enter password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      </div>
      <div className='d-grid'>
        <button
          type='submit'
          className='btn btn-primary'
          onClick={loginHandler}
        >
          Sign In
        </button>
      </div>
    </form>
  )
}

export default LoginScreen
