import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
  // Constructor is used to define state in Class Based Component
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4921c1f185e441ccbacc1f58801e06b2&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totArticles: parseData.totalResults,
      loading: false
    });
  }

  handlePrevClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4921c1f185e441ccbacc1f58801e06b2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      totArticles: parseData.totalResults,
      loading: false
    })
  }
  
  handleNextClick = async ()=>{
    if(this.state.page + 1 > Math.ceil(this.state.totArticles/this.props.pageSize)){
      
    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4921c1f185e441ccbacc1f58801e06b2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        totArticles: parseData.totalResults,
        loading: false
      })
    }
    }
    
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
          <div className="container d-flex justify-content-between">
            <button
              className="btn btn-dark"
              onClick={this.handlePrevClick}
              type="button"
              disabled={this.state.page<=1}
            >
              {" "}
              &larr; Previous
            </button>
            <button className="btn btn-dark" onClick={this.handleNextClick} type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totArticles/this.props.pageSize)}>
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
