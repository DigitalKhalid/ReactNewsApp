import React from 'react'
import noImage from './noImage.jpg'

const NewsItem =(props)=> {
    let { title, description, author, publishedAt, newsUrl, imageUrl, sourceName } = props

    return (
      <div className='my-3'>
        <div className="card">
          <img src={imageUrl ? imageUrl : noImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-info">{sourceName}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            {author ? <p className="card-text"><small className="text-muted">By {author}</small></p> : ''}
            <p className="card-text"><small className="text-muted">Updated on {new Date(publishedAt).toDateString()}</small></p>
            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
export default NewsItem