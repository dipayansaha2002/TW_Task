import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',  // confirm password
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const registerUser = async (e) => {
    e.preventDefault()
    setError('')
    try {

      const response = await axios.post("http://localhost:5000/api/users/register", formData)
      const newUser = await response.data
      if (!newUser) {
        setError("Could'nt register, please try after some time")
      }
      navigate('/login')

    } catch (err) {
      // setError(err.response.data.message)
      setError(err.response?.data?.message || 'An error occurred')
    }
  }

  return (
    <>

      <section className="register">
        <div className="container">
          <h2>Sign Up</h2>
          <form action="#" className="form register_form" onSubmit={registerUser}>
            {error && <p className="form_error-message">{error}</p>}
            <input type="text" placeholder='Full Name' name='name' value={formData.name} onChange={handleChange} />
            <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleChange} />
            <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange} />
            <input type="password" placeholder='Confirm Password' name='password2' value={formData.password2} onChange={handleChange} />
            <button type='submit' className='btn primary'>Register</button>
          </form>
          <small>Already have an account? <Link to="/login">sign in</Link> </small>
        </div>
      </section>

    </>
  )
}

export default Register