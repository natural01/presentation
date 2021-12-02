import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { addPresentation, addSlide } from './model/actions';
import { AppType, Mode, Presentation, Background, Block, BlockSize, CommandsHistory} from './model/type';
import { Element, Position, Slide, Text, Primitive} from './model/type';

function App() {
    let [counter, setCounter] = useState(1)

    useEffect(() => {
        const button = document.getElementById('id123')
        const listener = () => {
            console.log(`counter=${counter}`)
            setCounter(counter + 1)
        }
        if (button)
        {
            button.addEventListener('click', listener)
        }

        return () => {
            button?.removeEventListener('click', listener)
        }
   }, [counter])

    function decCounter() {
        setCounter(counter - 1)
    }


  return (
    <div className="App">
      <div className="topmenu">
        <button className="button" id="AddSlide">Добавить презентацию</button>
        <button className="button" id="AddSlide">Добавить презентацию</button>
        <div className="dropdown">
          <button className="button" id="AddSlide">Слайд</button>
          <div className="dropdown-child">
            <button className="button">текст</button>
            <button className="button">картинка</button>
            <button className="button">фигура</button>
          </div>
        </div>
      </div>
      <div className="slide"></div>
    </div>
  );
}

export default App;