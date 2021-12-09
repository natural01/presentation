import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {getEditor, addChangeHandler} from './state/editor';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App editor={ getEditor() }/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

addChangeHandler(render)
render()