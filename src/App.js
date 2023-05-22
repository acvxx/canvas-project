import { Component } from "react";
import Canvas from "./components/Canvas";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: { title: "WEB" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for information" },
      ],
    };
  } // 상위 컴포넌트의 state 값을 하위 컴포넌트의 props로 전달
  render() {
    return (
      <div className="App">
        <Canvas></Canvas>
      </div>
    );
  }
}

export default App;
