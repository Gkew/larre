import "./App.css";
import Dashboard from "./components/Dashboard";
import Navbar from './components/Navbar'
import './css/Navbar.css'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
      {/* <h1>
        Kom ihåg att inte koda på master, kör en npm i ibland, och viktigast av
        allt. HA KUL :)
      </h1> */}
    </div>
  );
}

export default App;
