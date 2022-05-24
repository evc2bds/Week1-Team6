import './App.css';
import MainDashboard from "./MainDashboard.js"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";


function App() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp)


  return (
    <div className="App">
      <MainDashboard />
    </div>
  );
}

export default App;
