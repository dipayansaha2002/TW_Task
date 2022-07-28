import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'

const PostItem = ({ postID, category, title, description, thumbnail, authorID, createdAt }) => {

    const shortDescription = description.length > 140 ? description.substr(0, 145) + '....' : description;
    const shortTitle = title.length > 35 ? title.substr(0, 35) + '....' : title

    return (
        <article className="post">
            <div className="post_thumbnail">
                <img src={`http://localhost:5000/uploads/${thumbnail}`} alt={title} />
            </div>
            <div className="post_content">
                <Link to={`/posts/${postID}`}>
                    <h3>{shortTitle}</h3>
                </Link>
                <p dangerouslySetInnerHTML={{__html: shortDescription}}/>
                <div className="post_footer">
                    <PostAuthor authorID={authorID} createdAt={createdAt} />
                    <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
                </div>
            </div>
        </article>
    )
}

export default PostItem