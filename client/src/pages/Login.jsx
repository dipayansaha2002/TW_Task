import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/userContext'

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData(prevState => {
      return {...prevState, [e.target.name]:e.target.value}
    })
  }

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const {setCurrentUser} = useContext(UserContext)

  const loginUser = async (e) => {
    e.preventDefault()
    setError('')
    try {

      const response = await axios.post("http://localhost:5000/api/users/login", formData)
      const user = await response.data
      setCurrentUser(user)
      navigate('/')

    } catch(err) {
      setError(err.response?.data?.message || 'An error occurred')
    }
  }


  return (

    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form action="#" className="form login_form" onSubmit={loginUser}>
          {error && <p className="form_error-message">{error}</p>}
          <input type="text" placeholder='Email' name='email' value={formData.email} onChange={handleChange} autoFocus />
          <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange} />
          <button type='submit' className='btn primary'>Login</button>
        </form>
        <small>Don't have an account? <Link to="/register">sign up</Link> </small>
      </div>
    </section>

  )
}

export default Login