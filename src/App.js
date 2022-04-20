import { useState, useEffect } from 'react'
import { db } from './Firebase/firebase'
import './App.css';

function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    db.collection('tweets').onSnapshot((snapshot) => {
      setTweets(snapshot.docs.map((doc) => ({
        id: doc.id,
        tweet: doc.data()
      })))
    })
  })

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
