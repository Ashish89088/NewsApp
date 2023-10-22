import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !imgUrl
                ? "https://bitsofco.de/content/images/2018/12/broken-1.png"
                : imgUrl
            }
            className="card-img-top"
            alt="NewsImage"
            style={{height: "250px"}}
          />
          <div className="card-body" style={{height: "290px"}}>
            <h5 className="card-title" style={{height: "55px"}}>
              {title}
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex:1}}>
                {source}
              </span>
            </h5>
            <p className="card-text" style={{height: "70px"}}>{description}...</p>
            <p className="card-text" style={{height: "55px"}}>
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
