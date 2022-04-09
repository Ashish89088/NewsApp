import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {

  // Taken an array from Sample Output

  // articles = [
  //   {
  //     source: { id: null, name: "New York Times" },
  //     author: "Victor Mather",
  //     title: "Shane Warne, Cricket Legend, Dies at 52",
  //     description:
  //       "Warne’s management company said the Australian star died Friday of a suspected heart attack.",
  //     url: "https://www.nytimes.com/2022/03/04/sports/cricket/shane-warne-dead.html",
  //     urlToImage:
  //       "https://static01.nyt.com/images/2022/03/04/sports/04warneWEB1/merlin_203223255_e7279261-1f33-4aa8-97a8-5401c95fb72e-facebookJumbo.jpg",
  //     publishedAt: "2022-03-04T18:10:41Z",
  //     content:
  //       "Shane Warne, one of the greatest cricket players of all time, and a larger-than-life figure on and off the field, died Friday in Thailand. He was 52.\r\nThe cause was suspected to be a heart attack, hi… [+927 chars]",
  //   },
  //   {
  //     source: { id: "bbc-news", name: "BBC News" },
  //     author: null,
  //     title: "Australian cricket legend Warne dies aged 52",
  //     description:
  //       "Legendary Australia leg-spinner Shane Warne, one of the greatest cricketers of all time, dies of a suspected heart attack aged 52.",
  //     url: "https://www.bbc.co.uk/sport/cricket/60622426",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/13590/production/_97584297_breaking_news.png",
  //     publishedAt: "2022-03-04T14:27:53Z",
  //     content:
  //       "Legendary Australia leg-spinner Shane Warne, one of the greatest cricketers of all time, has died of a suspected heart attack aged 52.\r\nWarne took 708 Test wickets, the second most of all time, in 14… [+284 chars]",
  //   },
  //   {
  //     source: { id: "bbc-news", name: "BBC News" },
  //     author: "https://www.facebook.com/bbcnews",
  //     title:
  //       "Shane Warne: Australian cricket legend died from natural causes - police",
  //     description:
  //       "Thai police say there's no sign of foul play in the cricketer's death while on holiday on Koh Samui.",
  //     url: "https://www.bbc.co.uk/news/world-asia-60645939",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/108B7/production/_123576776_mediaitem123576775.jpg",
  //     publishedAt: "2022-03-07T09:23:35Z",
  //     content:
  //       "Image caption, Warne had been on holiday on Koh Samui when he died of a suspected heart attack\r\nAustralian cricket legend Shane Warne's death in Thailand was from natural causes, police have confirme… [+449 chars]",
  //   },
  //   {
  //     source: { id: "bbc-news", name: "BBC News" },
  //     author: "https://www.facebook.com/bbcnews",
  //     title:
  //       "Women's World Cup: An India v Pakistan cricket match minus fireworks",
  //     description:
  //       "The arch rivals face each other on Sunday in the Women's ODI cricket World Cup in New Zealand.",
  //     url: "https://www.bbc.co.uk/news/world-asia-india-60572874",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/5769/production/_123477322_gettyimages-805583774-594x594.jpg",
  //     publishedAt: "2022-03-05T01:29:12Z",
  //     content:
  //       "Image source, Getty Images\r\nImage caption, India's star batter Smriti Mandhana has recovered from a blow on her helmet in a warm-up game\r\nArch rivals India and Pakistan will face each other in a marq… [+5340 chars]",
  //   },
  // ];

  // Constructor is used to define state in Class Based Component
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=4921c1f185e441ccbacc1f58801e06b2&page=1&pageSize=20";
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({articles: parseData.articles, totalArticles: parseData.totalResults})
  }

  handleNextClick = async ()=>{
    if(this.state.page + 1 > Math.ceil (this.state.totalResults/20)){

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4921c1f185e441ccbacc1f58801e06b2&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles
      })
    }
  }
    
  handlePrevClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4921c1f185e441ccbacc1f58801e06b2&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
  
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles
    })
  }
  
  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title?element.title.slice(0,45):""}
                description={element.description?element.description.slice(0,88):""}
                imgUrl={element.urlToImage}
                newsUrl={element.url}
              />
            </div>
          })}
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
            <button className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div>
      </div>
    );
  }
}
