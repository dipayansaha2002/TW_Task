import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import Loader from '../components/Loader'
import DeletePost from './DeletePost'
// import { DUMMY_POSTS } from '../data'

const Dashboard = () => {

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()

  const { currentUser } = useContext(UserContext)
  const token = currentUser?.token

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const fetchPosts = async () => {
      try {

        const response = await axios.get(`http://localhost:5000/api/posts/users/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        })
        setPosts(response.data)

      } catch (err) {
        console.log(err)
      }
      setIsLoading(false)
    }

    fetchPosts();

  }, [id])

  if (isLoading) {
    return <Loader />
  }

  return (
    <section className="dashboard">
      {
        posts.length > 0 ? <div className="container dashboard_container">
          {
            posts.map(post => {
              return <article key={post.id} className="dashboard_post">
                <div className="dashboard_post-info">
                  <div className="dashboard_post-thumbnail">
                    <img src={`http://localhost:5000/uploads/${post.thumbnail}`} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard_post-actions">
                  <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                  <DeletePost postId={post._id}/>
                </div>
              </article>
            })
          }
        </div> : <h2 className='center'>You've no posts yet!</h2>
      }
    </section>
  )
}

export default Dashboard