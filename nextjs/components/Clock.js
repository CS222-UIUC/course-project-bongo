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
    // INFO about setState():
    // 1. Don't use this.state.comment = "lul", 
    //    use this.setState({comment: 'Hello});
    //    Only init assign in constructor
    // 
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






// const root = ReactDOM.createRoot(document.getElementById('root'));

// export default class Clock extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
//       </div>
//     ); 
//   }
  
// }


// function tick() {
//   root.render(<Clock date={new Date()} />);
// }

// setInterval(tick, 1000);









// const root = ReactDOM.createRoot(document.getElementById('root'));
  
// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   root.render(element);
// }

// setInterval(tick, 1000);


// export default function Clock() {
//   function tick() {
//     const element = (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {new Date().toLocaleTimeString()}.</h2>
//       </div>
//     );
//     root.render(element);
//   }

//   return (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {setInterval(tick, 1000)}.</h2>
//     </div>
//   )
// }