import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./screens/homescreen/homescreen";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <HomeScreen />
      </div>
    </Provider>
  );
}

export default App;
