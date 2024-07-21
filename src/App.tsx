import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Provider store={appStore}>
      <Router>
        <Body />
      </Router>
    </Provider>
  );
};

export default App;
