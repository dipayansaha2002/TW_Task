import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import DeletePost from './DeletePost'
import Loader from '../components/Loader'
import PostAuthor from '../components/PostAuthor'
import axios from 'axios'

const PostDetail = () => {

  const { id } = useParams()
  const [post, setPost] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser } = useContext(UserContext)

  useEffect(() => {

    const getPost = async () => {

      setIsLoading(true)
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`)
        setPost(response.data)
      } catch (err) {
        setError(err)
      }
      setIsLoading(false)
    }

    getPost();

  }, [])

  if (isLoading) {
    return <Loader />
  }

  // console.log("userID -> " + currentUser.id + "PostID -> " + post.creator)
  // console.log(currentUser)
  // console.log(post.creator)

  return (
    <section className="post-detail">
      {error && <p className="form_error-message">{error}</p>}
      {post && <div className="container post-detail_container">

        <div className="post-detail_header">
          <PostAuthor authorID={post.creator} createdAt={post.createdAt} />

          {

            currentUser?.id == post?.creator &&
            <div className="post-detail_buttons">
              <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
              <DeletePost postId={id} />
            </div>
          }

        </div>
        <h1>{post?.title}</h1>
        <div className="post-detail_thumbnail">
          <img src={`http://localhost:5000/uploads/${post.thumbnail}`} alt="" />
        </div>

        <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
      </div>}
    </section>
  )
}

export default PostDetail