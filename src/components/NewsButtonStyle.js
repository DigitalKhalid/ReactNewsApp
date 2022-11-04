import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
  }
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1,
    }
    document.title = `BizzNews | ${this.capitalizeFirstLetter(this.props.category)}`
  }

  async fetchAPI() {
    this.setState({loading:true})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=88e85871368d49f0891a03e119b44f18&catagory=business&page=${this.state.page}&pagesize=${this.props.pageSize}`
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      page: this.state.page,
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading:false,
    })
  }

  // Initial mounting of component
  async componentDidMount() {
    this.fetchAPI()
  }

  handleNext = async ()=> {
    this.setState({
      page: this.state.page+1,
    })
    this.fetchAPI()
  }

  handlePrevious = async ()=> {
    this.setState({
      page: this.state.page-1,
    })
    this.fetchAPI()
  }

  render() {
    return (
      <div className='container my-3 mb-3'>
        <h1 className='text-center'>BizzNews - Top {this.props.category!=='general'?this.capitalizeFirstLetter(this.props.category):''} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <NewsItem title={element.title} description={element.description} publishedAt={element.publishedAt} author={element.author} newsUrl={element.url} imageUrl={element.urlToImage} sourceName={element.source.name}/>
              </div>
            )
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
          <p>Page {this.state.page} of {Math.ceil(this.state.totalResults/this.props.pageSize)}</p>
          <button disabled={this.state.page*this.props.pageSize>=this.state.totalResults} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News