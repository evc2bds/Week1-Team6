import './App.css';
// import MainDashboard from "./MainDashboard.js"
import ClassPage from "./ClassPage.js"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import {db, firebaseApp} from "./firebase.js"
import ClassDashboard from "./ClassDashboard"

function App() {

  return (
    <div className="App">
      <ClassPage />
    </div>
  );
}

export default App;