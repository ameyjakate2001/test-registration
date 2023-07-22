import React, { useState, useEffect, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'
const RegisterScreen = () => {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState('')
  const [otp, setOtp] = useState('')
  const [cities, setCities] = useState([])
  const [states, setStates] = useState([])
  const [subjects, setSubjects] = useState([])
  const [dates, setDates] = useState([])
  const [times, setTimes] = useState([])
  const captchaRef = useRef(null)
  const registerHandler = (e) => {
    e.preventDefault()
    console.log(name, email, state, city, subject, date, time)
    if (!name || !email || !state || !city || !subject || !date || !time)
      return setError('please fill all the fields')
    setError('')
    //API CALL TO THE EMAIL

    axios
      .post('http://localhost:7000/otp/sent', {
        email,
      })
      .then((res) => {
        console.log(res)
        setError('')
        setStep(2)
      })
      .catch((e) => setError(e.response.data.error))
  }

  const verifyHandler = (e) => {
    e.preventDefault()
    const token = captchaRef.current.getValue()
    captchaRef.current.reset()

    axios
      .post('http://localhost:7000/otp/verify', {
        token,
        otp,
        email,
        name,
        state,
        city,
        subject,
        date,
        time,
      })
      .then((res) => {
        console.log(res)
        setError('')
        setStep(3)
      })
      .catch((e) => {
        console.log(e.response)

        setError(e.response.data.error)
      })
  }

  const fillCityHandler = (e) => {
    console.log(e.target.value)
    console.log(
      cities.filter((city) => {
        return city.state_id._id == e.target.value
      })
    )
    setCities(
      cities.filter((city) => {
        return city.state_id._id == e.target.value
      })
    )
    setState(e.target.value)
  }
  const fillTimeHandler = (e) => {}
  useEffect(() => {
    axios
      .get('http://localhost:7000/users/data')
      .then((res) => {
        console.log(res.data)
        setStates(res.data.state)
        setCities(res.data.city)
        setSubjects(res.data.subject)
        setDates(res.data.date)
        setTimes(res.data.time)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  function registerForm() {
    return (
      <form id='submitForm' onSubmit={registerHandler}>
        <h3>Register</h3>
        <div className='mb-3'>
          <label>Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='First name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label>State</label>
          <select name='state' id='state' onChange={fillCityHandler}>
            {states &&
              states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.state}
                </option>
              ))}
          </select>
        </div>
        <div className='mb-3'>
          <label>City</label>
          <select
            name='state'
            id='state'
            onChange={(e) => setCity(e.target.value)}
          >
            {cities &&
              cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.city}
                </option>
              ))}
          </select>
        </div>
        <div className='mb-3'>
          <label>Subject</label>
          <select
            name='subject'
            id='subject'
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjects &&
              subjects.map((subject, i) => (
                <option key={i} value={subject._id}>
                  {subject.subject}
                </option>
              ))}
          </select>
        </div>
        <div className='mb-3'>
          <label>Test Date</label>
          <select name='date' id='date' onChange={fillTimeHandler}>
            {dates &&
              dates.map((date, i) => (
                <option key={i} value={date._id}>
                  {date.date}
                </option>
              ))}
          </select>
        </div>
        <div className='mb-3'>
          <label>Time Slot</label>
          <select
            name='time'
            id='time'
            onChange={(e) => setTime(e.target.value)}
          >
            {times &&
              times.map((time, i) => (
                <option key={i} value={time._id}>
                  {time.time}
                </option>
              ))}
          </select>
        </div>

        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>

        <div className='d-grid'>
          <button type='submit' className='btn btn-primary'>
            Register
          </button>
        </div>
      </form>
    )
  }
  function confirmRegistration() {
    return (
      <form id='submitForm'>
        <h3>Confirm Email</h3>
        <div className='otpBox'>
          <input
            type='text'
            maxLength='4'
            placeholder='Enter 4 digit otp'
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div
          style={{ margin: '20px', display: 'flex', justifyContent: 'center' }}
        >
          <ReCAPTCHA
            sitekey='6LcFpCYnAAAAAOF4ajllrKVKUuzgwD4ff5k6-fcn'
            ref={captchaRef}
          />
        </div>
        <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
          {error}
        </p>
        <button className='btn btn-primary' onClick={() => setStep(1)}>
          Go back
        </button>
        <div className='d-grid'>
          <button
            type='submit'
            className='btn btn-primary w-full'
            onClick={verifyHandler}
          >
            Verify
          </button>
        </div>
      </form>
    )
  }

  return (
    <div>
      {step === 1
        ? registerForm()
        : step === 2
        ? confirmRegistration()
        : step === 3 && (
            <div style={{ margin: '20px auto', textAlign: 'center' }}>
              <h4>Hurray 🥳🎉</h4>
              <p>Congratulations !! You have registered for the Test</p>
              <button className='btn btn-primary' onClick={() => setStep(1)}>
                Go back
              </button>
            </div>
          )}
    </div>
  )
}

export default RegisterScreen
