import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // const [loading, setLoading] = useState(false)
  
  const fetchAPI = async () => {
    // setLoading(true)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`
    let data = await fetch(url);
    let parseddata = await data.json();
    setPage(page)
    setArticles(parseddata.articles)
    setTotalResults(parseddata.totalResults)
    // setLoading(false)
  }
  
  // Initial mounting of component
  useEffect(() => {
    fetchAPI()
    document.title = `BizzNews | ${capitalizeFirstLetter(props.category)}`
    props.setProgress(100)
    // Below line is to dismiss the warning about dependencies of useEffect. We are not using because we want to run it once like componentDidMount
    // eslint-disable-next-line
  }, [])
  
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url);
    let parseddata = await data.json();
    setArticles(parseddata.articles)
    setArticles(articles.concat(parseddata.articles))
  }
  return (
    <>
      <div className='container my-3 mb-3'>
        <h1 className='text-center' style={{marginTop:'75px'}}>BizzNews - Top {props.category !== 'general' ? capitalizeFirstLetter(props.category) : ''} Headlines</h1>
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={page * props.pageSize <= totalResults & totalResults!==0}
        loader={<Spinner />}
      >
        <div className='container my-3 mb-3'>
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem title={element.title} description={element.description} publishedAt={element.publishedAt} author={element.author} newsUrl={element.url} imageUrl={element.urlToImage} sourceName={element.source.name} />
                </div>
              )
            })}
            <h3 className='text-center'>{page * props.pageSize >= totalResults & totalResults!==0? '** You have done all **' : ''}</h3>
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News