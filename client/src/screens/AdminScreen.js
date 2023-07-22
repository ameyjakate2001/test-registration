import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminScreen = () => {
  const [tab, setTab] = useState(false)
  const [users, setUsers] = useState([])
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [subject, setSubject] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  function tabChangeHandler(prev) {
    if (prev !== tab) setTab(!tab)
  }

  useEffect(() => {
    axios
      .get('http://localhost:7000/users/candidates')
      .then((res) => {
        console.log(res)
        setUsers(res.data)
        // setError('')
      })
      .catch((e) => {
        console.log('in error')
      })
  }, [])

  function deleteHandler(id) {
    axios
      .get(`http://localhost:7000/users/candidate/${id}`)
      .then((res) => {
        setUsers(users.filter((user) => user._id !== id))
        console.log(res)
      })
      .catch((e) => {
        console.log('in error')
      })
  }
  function clearForm() {
    setState('')
    setSubject('')
    setCity('')
    setDate('')
    setTime('')
  }
  function addDateHandler(e) {
    e.preventDefault()
    console.log(state, city, date, time)
    if (!state || !city || !subject || !date || !time)
      return setError('please fill all the fields')
    setError('')
    axios
      .post(`http://localhost:7000/users/addData`, {
        state,
        city,
        subject,
        date,
        time,
      })
      .then((res) => {
        clearForm()
        setSuccess(res.data.message)
        setTimeout(() => {
          setSuccess('')
        }, 3000)
        console.log(res)
      })
      .catch((e) => {
        console.log('in error')
      })
  }
  return (
    <>
      <div className='tab'>
        <p>
          <span
            onClick={() => tabChangeHandler(false)}
            style={!tab ? { fontWeight: 'bold' } : null}
          >
            Candidate
          </span>
          <span
            style={tab ? { fontWeight: 'bold' } : null}
            onClick={() => tabChangeHandler(true)}
          >
            Add Test
          </span>
        </p>
      </div>
      {!tab ? (
        <div class='table'>
          <table class='content-table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td> {user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.city_id.city}</td>
                    <td>{user.date_id.date}</td>
                    <td>{user.time_id.time}</td>
                    <td
                      onClick={() => {
                        deleteHandler(user._id)
                      }}
                    >
                      <button type='submit' className='btn btn-primary'>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <form id='submitForm'>
            <div className='mb-3'>
              <label>State</label>
              <input
                type='text'
                className='form-control'
                value={state}
                placeholder='Enter State'
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label>City</label>
              <input
                type='text'
                value={city}
                className='form-control'
                placeholder='Enter City'
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label>Subject</label>
              <input
                value={subject}
                type='text'
                className='form-control'
                placeholder='Enter Subject'
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label>Date</label>
              <input
                type='date'
                value={date}
                className='form-control'
                placeholder='Enter Date'
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label>Time</label>
              <input
                type='time'
                value={time}
                className='form-control'
                placeholder='Enter Time'
                onChange={(e) => setTime(e.target.value)}
              />
            </div>{' '}
            <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
            <p style={{ color: 'green', fontWeight: 'bold' }}>{success}</p>
            <div className='d-grid'>
              <button
                type='submit'
                className='btn btn-primary'
                onClick={addDateHandler}
              >
                Add Data
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default AdminScreen
