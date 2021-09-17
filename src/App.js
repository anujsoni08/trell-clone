import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { GlobalProvider } from "./context/GlobalState";

const App = () => {
  return (
    <GlobalProvider>
      <div className="App">
        <Header />
        <hr />
        <Dashboard />
      </div>
    </GlobalProvider>
  );
};

export default App;
