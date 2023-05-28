import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const [data, setData] = useState(0)
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  //Delay Function
  const handleClick = async (event) => {
    console.log("before");

    await delay(1000);

    console.log("after");
  };

  // useEffect(() => {
  //   async function makeRequest() {
  //     console.log('before');

  //     await delay(1000);

  //     console.log('after');
  //   }

  //   makeRequest();
  // });


  //Get requests
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('https://api.npms.io/v2/search?q=react')
        .then(response => response.json())
        .then(data => setData(data.total));
// empty dependency array means this effect will only run    once (like componentDidMount in classes)
}, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="button-animation">
          <button onClick={handleClick}>Coming in from left</button>
        </div>
        <div className="button-animation2">
          <button onClick={handleClick}>Coming in from right</button>
        </div>
      </header>

    </div>
  );
}

export default App;
