import { useSelector } from "react-redux";
import AppContainer from "./components/AppContainer";
import ReflectionContainer from "./components/ReflectionContainer";
import Calendar from "./pages/Calendar";
import Graph from "./pages/Graph";
import { selectRoute } from "./redux/routeSlice";

function App() {
  const route = useSelector(selectRoute);

  const appView = route === "graph" ? <Graph /> : <Calendar />;

  return appView;
}

export default App;
