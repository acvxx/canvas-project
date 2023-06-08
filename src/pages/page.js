import { Component } from "react";
import Canvas from "../components/Canvas";

class Page extends Component {
  // 상위 컴포넌트의 state 값을 하위 컴포넌트의 props로 전달
  render() {
    return (
      <div className="Page">
        <Canvas></Canvas>
      </div>
    );
  }
}

export default Page;
