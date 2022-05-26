import './App.css';
import ClassPage from "./ClassPage.js"
import MainDashboard from "./MainDashboard.js"
import { Link, Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <MainDashboard />

    </div>
  );
}

export default App;