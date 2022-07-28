import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { UserContext } from '../context/userContext';
import axios from 'axios'
// import Avatar from '../images/avatar3.jpg'


const UserProfile = () => {

  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isAvatarTouched, setIsAvatarTouched] = useState(false)
  const [error, setError] = useState('')

  const { currentUser } = useContext(UserContext)

  const token = currentUser?.token
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {

    const getUser = async () => {
      const response = await axios.get(`http://localhost:5000/api/users/${currentUser.id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        })
      const { name, email, avatar } = response.data;
      setName(name)
      setEmail(email)
      setAvatar(avatar)
    }

    getUser();
  })

  const changeAvatarHandler = async () => {

    setIsAvatarTouched(false)

    try {
      console.log("Avatar updated")

      const postData = new FormData()
      postData.set('avatar', avatar)
      const response = await axios.post(`http://localhost:5000/api/users/change-avatar`, postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        })

      setAvatar(response?.data.avatar)

    } catch (err) {
      console.log(err)
    }

  }

  const updateUserDetails = async () => {

    e.preventDefault();

    try {

      const userData = new FormData()
      userData.set('name', name)
      userData.set('email', email)
      userData.set('currentPassword', currentPassword)
      userData.set('newPassword', newPassword)
      userData.set('confirmNewPassword', confirmNewPassword)

      const response = await axios.patch(`http://localhost:5000/api/users/edit-user`, userData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        })

      if (response.status == 200) {
        navigate('/logout')
      }

    } catch (error) {
      setError(error.response.data.message)
    }

  }


  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${currentUser.id}`} className='btn'>My Posts</Link>

        <div className="profile_details">
          <div className="avatar_wrapper">

            <div className="profile_avatar">
              <img src={`http://localhost:5000/uploads/${avatar}`} alt="" />
            </div>

            <form className="avatar_form">
              <input type="file" name='avatar' id='avatar' accept='png, jpg, jpeg' onChange={e => setAvatar(e.target.files[0])} />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}><FiEdit /></label>
            </form>

            {isAvatarTouched && <button className='profile_avatar-btn' onClick={changeAvatarHandler}><FaCheck /></button>}
          </div>

          <h1>{currentUser.name}</h1>

          <form className="form profile_form" onSubmit={updateUserDetails}>
            {error && <p className="form_error-message">{error}</p>}
            <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='Current password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder='New password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input type="password" placeholder='Confirm new password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
            <button type='submit' className='btn primary'>Update details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile