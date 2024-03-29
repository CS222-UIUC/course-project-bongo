import React from "react"
import { ReactDOM } from "react";



export default class Clock extends React.Component {
  // called 1
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  // called 1.001
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // special function
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {

    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

