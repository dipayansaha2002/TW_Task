import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'

const DeletePost = ({ postId: id}) => {

  const { currentUser } = useContext(UserContext)
  const token = currentUser?.token

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  const removePost = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${id}`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log("ffff")

      if(response.status == 200) {
        if(location.pathname == `/myposts/${currentUser.id}`) {
          navigate(0)
        } else {
          navigate('/')
        }
      }
    } catch(error) {
      console.log("Could'nt delete the post")
    }
  }

  return (
    <Link className='btn sm danger' onClick={() => removePost(id)}>Delete</Link>
  )
}

export default DeletePost