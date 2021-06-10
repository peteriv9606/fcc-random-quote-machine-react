import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import data from "./data";
import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    //set initial state (without ID) - we get state from randomInt -> data
    this.state = {
      id: 0,
      text: "",
      author: "",
      color: "",
      randInt: Math.floor(Math.random() * data.length),
      randomColor1: Math.floor(Math.random() * 16777215).toString(16),
      randomColor2: Math.floor(Math.random() * 16777215).toString(16),
      randDegrees: Math.floor(Math.random() * 360),
      fancyGradient: "",
    };
    console.log("State initiated");
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUnmount() {
    console.log("UNMOUNTED");
  }

  componentDidMount() {
    console.log("MOUNTED");
    this.handleClick(); // perform init quote
  }

  handleClick() {
    console.log("handleClick executed");
    this.setState({
      randInt: Math.floor(Math.random() * data.length),
      randomColor1: Math.floor(Math.random() * 16777215).toString(16),
      randomColor2: Math.floor(Math.random() * 16777215).toString(16),
      randDegrees: Math.floor(Math.random() * 360),
    });
    var fancyGradient =
      "linear-gradient(" +
      this.state.randDegrees +
      "deg, #" +
      this.state.randomColor1 +
      ", #" +
      this.state.randomColor2 +
      ")";
    this.setState({ fancyGradient: fancyGradient });
    data.map((el) => {
      if (el.id === this.state.randInt) {
        this.setState({
          id: el.id,
          text: el.text,
          author: el.author,
          color: fancyGradient,
        });
      }
    });
  }
  render() {
    return (
      <div
        id="wrapper"
        style={{
          backgroundImage: this.state.color,
          transition: "0.6s",
        }}
      >
        <div id="quote-box">
          <p id="text" style={{ transition: "0.6s" }}>
            <i className="fa fa-quote-left" style={{ margin: "0 10px" }}></i>
            {this.state.text}
          </p>
          <p id="author" style={{ transition: "0.6s" }}>
            - {this.state.author}
          </p>
          <button
            id="new-quote"
            className="btn btn-primary"
            style={{
              backgroundColor: "#" + this.state.randomColor1,
              color: "white",
              transition: "0.6s",
            }}
            onClick={this.handleClick}
          >
            Get New Quote
          </button>
          <a
            id="tweet-quote"
            href="https://twitter.com/intent/tweet?button_hashtag=LoveTwitter&ref_src=twsrc%5Etfw"
            target="_blank"
            rel="noreferrer"
            className="twitter-hashtag-button"
            data-text={this.state.text + " " + this.state.author}
            data-url="https://www.thisisthelinktothewebsite.com"
            data-show-count="false"
            style={{ color: "#" + this.state.randomColor1, transition: "0.6s" }}
          >
            <i className="fa fa-twitter-square"></i>
          </a>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          ></script>
        </div>
      </div>
    );
  }
}
