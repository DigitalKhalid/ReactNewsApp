import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

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
      page: 1,
      progress: 0,
      // apiKey: ''
    }
    document.title = `BizzNews | ${this.capitalizeFirstLetter(this.props.category)}`
  }

  async fetchAPI() {
    this.setState({ loading: true })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      page: this.state.page,
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false,
    })
  }

  fetchMoreData = () => {
    let loadedArticles = this.state.articles
    console.log({loadedArticles})
    this.setState({
      page: this.state.page + 1
    })
    this.fetchAPI()
    this.setState({
      articles: loadedArticles.concat(this.state.articles)
    })
  }

  // Initial mounting of component
  async componentDidMount() {
    this.props.setProgress(20)
    this.fetchAPI()
    this.props.setProgress(100)
  }

  handleNext = async () => {
    this.setState({
      page: this.state.page + 1,
    })
    this.props.setProgress(20)
    this.fetchAPI()
    this.props.setProgress(100)
  }

  handlePrevious = async () => {
    this.setState({
      page: this.state.page - 1,
    })
    this.props.setProgress(20)
    this.fetchAPI()
    this.props.setProgress(100)
  }

  render() {
    return (
      <>
        <div className='container my-3 mb-3'>
          <h1 className='text-center'>BizzNews - Top {this.props.category !== 'general' ? this.capitalizeFirstLetter(this.props.category) : ''} Headlines</h1>
        </div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.page*this.props.pageSize<=this.state.totalResults}
          loader={<Spinner />}
          >
          <div className='container my-3 mb-3'>
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem title={element.title} description={element.description} publishedAt={element.publishedAt} author={element.author} newsUrl={element.url} imageUrl={element.urlToImage} sourceName={element.source.name} />
                  </div>
                )
              })}
              <h3 className='text-center'>{this.state.page*this.props.pageSize>=this.state.totalResults?'** You have done all **':''}</h3>
            </div>
            
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News