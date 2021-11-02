import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
      <div className={'slide'}>

      </div>
    );
   //  let [counter, setCounter] = useState(1)
   //
   //  useEffect(() => {
   //      const button = document.getElementById('id123')
   //      const listener = () => {
   //          console.log(`counter=${counter}`)
   //          setCounter(counter + 1)
   //      }
   //      if (button)
   //      {
   //          button.addEventListener('click', listener)
   //      }
   //
   //      return () => {
   //          button?.removeEventListener('click', listener)
   //      }
   // }, [counter])

  // return (
  //   <div className="App">
  //       <button id="id123">Нажми меня</button>
  //     <WriteText counter={counter}/>
  //     <OriginalReactApp />
  //     <HelloWorld data={"lol"} secretKey={"kek"} num={3}/>
  //   </div>
  // );
}

type Params = {
  data: string,
  secretKey: string,
  counter?: number,
  num: number,
}

function HelloWorld(params: Params) {
  return (
      <div className="App">
        {params.data}, {params.secretKey}, counter=[{params.num}]
      </div>
  );
}

function OriginalReactApp() {
  return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  );
}

type per = {
  counter: number,
}
function WriteText(text: per) {
  return (
      <div className="My-Text">
        {text.counter}
      </div>
  )
}

export default App;
