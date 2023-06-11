import { Component } from "react";
import Canvas from "../components/Canvas";
import Manage from "../components/Manage";
import View from "../components/View";
import { CanvasProvider } from "../CanvasContext";

class Page extends Component {
  // 상위 컴포넌트의 state 값을 하위 컴포넌트의 props로 전달
  render() {
    return (
      <CanvasProvider>
        <div className="Page">
          <Manage></Manage>
          <View></View>
          <Canvas></Canvas>
        </div>
      </CanvasProvider>
    );
  }
}

export default Page;
