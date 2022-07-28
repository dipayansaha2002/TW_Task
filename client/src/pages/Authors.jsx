import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Authors = () => {

  const [authors, setAuthors] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {

    const getAuthors = async () => {

      try {

        const response = await axios.get(`http://localhost:5000/api/users`)
        setAuthors(response.data) 
  
      } catch (err) {
        setError(err)
      }
    }

    getAuthors();

  })


  return (
    <section className="authors">
      {authors.length > 0 ? <div className="container authors_container">
        {
          authors.map(({_id: id, avatar, name, posts }) => {
            return (
                <Link key={id} to={`/posts/users/${id}`} className="author">
                    <div className="author_avatar">
                        <img
                            src={`https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg`}
                            alt="Image not found"
                        />
                    </div>
                    <div className="author_info">
                        <h4>{name}</h4>
                        <p>{posts}</p>
                    </div>
                </Link>
            );
          })
        }
      </div> : <h2 className='center'>No authors found</h2>
      }
    </section>
  )
}

export default Authors