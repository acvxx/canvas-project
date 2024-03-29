import { Component } from "react";
import { CanvasProvider } from "../contexts/CanvasContext";
import CanvasContainer from "../components/CanvasContainer";
import View from "../components/View";
import Manage from "../components/Manage";

class Page extends Component {
  // 상위 컴포넌트의 state 값을 하위 컴포넌트의 props로 전달
  render() {
    return (
      <CanvasProvider>
        <div className="Page">
          <Manage></Manage>
          <View></View>
          <CanvasContainer></CanvasContainer>
        </div>
      </CanvasProvider>
    );
  }
}

export default Page;
