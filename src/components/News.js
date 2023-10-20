import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 10,
    category: "general",
    title: "Top Headlines"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    title: PropTypes.string
  }

  get hasMore() {
    console.log('this.state.articles.length', this.state.articles.length)
    console.log('this.state.totalResults', this.state.totalResults)
    return this.state.articles.length !== this.state.totalResults
  }

  capitalize = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // Constructor is used to define state in Class Based Component
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=145929f30227468b91c8e31bfc4191cd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
}

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async ()=>{
    this.setState({page: this.state.page - 1});
    this.updateNews();
  }
  
  handleNextClick = async ()=>{
    this.setState({page: this.state.page + 1})
    this.updateNews();
    }

    fetchMoreData = async () => {
      this.setState({page :this.state.page + 1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=145929f30227468b91c8e31bfc4191cd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parseData.articles),
        totArticles: parseData.totalResults,
        loading: false
      })
    };

    
  render() {
    return (
      <>
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - {this.props.title}</h1>

        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.hasMore}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
          </div>
          </div>
          </InfiniteScroll>
        </div>
        </>
    );
  }
}
