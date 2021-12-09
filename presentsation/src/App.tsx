import './App.css';
import { useState, useEffect } from 'react';
import { AppType, Mode, Presentation, Background, Block, BlockSize, CommandsHistory} from './model/type';
import { Element, Position, Slide, Text, Primitive} from './model/type';
import { getEditor, dispatch } from './state/editor';
import {addPresentation, addPrimitive, addRedo, addSlide, addTitle, addUndo, changeBackgroundColorSlide} from './model/actions'
import {changeBackgroundImgSlide, changeBlock, changeMode, delElements, delSlide, editPrimitiveColorback} from './model/actions'
import {editPrimitiveColorline, makeId, moveSlide, selectElements, selectSlide} from './model/actions'
import { presentation } from './model/testData';

type AppProps = {
  editor: AppType
}

function App({editor}: AppProps) {
  function newPresentation() {
    dispatch(addPresentation, 'title')
  }

  function newTitile() {
    dispatch(addTitle, 'new title')
  }

  function newSlide() {
    dispatch(addSlide, {})
  }

  return (
    <div className="App">
      <div className="topmenu">
        <button className="button" onClick={newPresentation}>Добавить презентацию</button>
        <button className="button" onClick={newTitile}>изменить title</button>
        <button className="button" onClick={newSlide}>Добавить Слайд</button>
        <div className="dropdown">
          <button className="button" id="AddSlide">Слайд</button>
          <div className="dropdown-child">
            <button className="button">текст</button>
            <button className="button">картинка</button>
            <button className="button">фигура</button>
          </div>
        </div>
        <div className="title"><span className="titleStr">{editor.presentation.title}</span></div>
      </div>
      <div className="lineHorizon"></div>
      <div className="slides">
      <div className="slidesList">
        {editor.presentation.slides.map(slide => {
          return (
            <div key={slide.slideId} className="slidesList-element"></div>
          )
        })}
        </div>
        <div className="lineVertical"></div>
        {/* {editor.presentation.slides[0]} */}
        <div className="slide"></div>
      </div>
    </div>
  );
}

export default App;