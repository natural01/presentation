import './App.css';
import React, { createRef, Key, useRef } from 'react';
import { AppType, Mode, Presentation, Background, Block, BlockSize, CommandsHistory} from './model/type';
import { Element, Position, Slide, Text, Primitive} from './model/type';
import { getEditor, dispatch } from './state/editor';
import {addPresentation, addPrimitive, addRedo, addSlide, addTitle, addUndo, changeBackgroundColorSlide} from './model/actions'
import {changeBackgroundImgSlide, changeBlock, changeMode, delElements, delSlide, editPrimitiveColorback} from './model/actions'
import {editPrimitiveColorline, makeId, moveSlide, selectElements, selectSlide, addText, addImg} from './model/actions'
import { presentation } from './model/testData';

type AppProps = {
  editor: AppType
}

function App(this: any, {editor}: AppProps) {
  const selectSlideId = editor.presentation.selectSlides[0]
  const index = indexSelectSlide(editor, selectSlideId)
  const title = document.getElementById('newTitle')?.nodeValue

  function choiceSlide(id: string) {
    dispatch(selectSlide, id)
  }

  function deleteSlide() {
    if (editor.presentation.slides.length > 1) {
      dispatch(delSlide, {})
    }
  }

  function newPresentation() {
    dispatch(addPresentation, 'title')
  }

  function updataTitile() {
    dispatch(addTitle, '')
  }

  function newTitile(title: any) {
    console.log(title);
    
    // dispatch(addTitle, textInput.current)
  }

  function newSlide() {
    dispatch(addSlide, {})
  }

  function newText() {
    dispatch(addText, 'text')
  }

  function newImg() {
    dispatch(addImg, 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg')
  }

  return (
    <div className="App">
      <div className="topmenu">
        <button className="button" onClick={newPresentation}>Добавить презентацию</button>
        <div className="dropdown">
          <button className="button" id="AddSlide">Презентиация</button>
          <div className="dropdown-child">
            <button className="button" onClick={updataTitile}>Изменить title</button>
            <button className="button" onClick={newSlide}>Добавить Слайд</button>
            <button className="button" onClick={deleteSlide}>Удалить слайд</button>
          </div>
        </div>
        <div className="dropdown">
          <button className="button" id="AddSlide">Слайд</button>
          <div className="dropdown-child">
            <button className="button" onClick={newText}>текст</button>
            <button className="button" onClick={newImg}>картинка</button>
            <button className="button">фигура</button>
          </div> 
        </div>
        <div className="title">
          {editor.presentation.title != '' && <span className="titleStr">{editor.presentation.title}</span>}
          {editor.presentation.title == '' &&
          <div>
            <input type="text" id="newTitle"/>
            <button className="button" onClick={()=>newTitile(title)}>сохранить</button>
          </div>}
        </div>
      </div>
      <div className="lineHorizon"></div>
      <div className="slides">
      <div className="slidesList">
        {editor.presentation.slides.map(slide => {
          if (slide.slideId == editor.presentation.selectSlides[0]) {
            return (
              <div key={slide.slideId} className="slideList-dedicatedSlide">
                {slide.blocks.map(block => {
                  const listsBlockSize = {
                    width: block.blockSize.width/7,
                    height: block.blockSize.height/7
                  }
                  const sizeText = {
                    width: block.blockSize.width/7,
                    height: block.blockSize.height/7,
                    fontSize: block.element.text.size/3
                  }
                  return(
                    <div>
                      {block.element.text.content != '' &&
                        <div key={block.element.elementId} style={sizeText} className="element-Text">{block.element.text.content}</div>
                      }       
                      {block.element.src != '' &&
                        <img key={block.element.elementId} style={listsBlockSize} src={block.element.src}/>
                      } 
                    </div>
                  )
                })}
              </div>
            )
          } else {
            return (
              <div key={slide.slideId} onClick={()=>choiceSlide(slide.slideId)} className="slidesList-element">
                {slide.blocks.map(block => {
                  const listsBlockSize = {
                    width: block.blockSize.width/7,
                    height: block.blockSize.height/7
                  }
                  const sizeText = {
                    width: block.blockSize.width/7,
                    height: block.blockSize.height/7,
                    fontSize: block.element.text.size/3
                  }
                  return(
                    <div>
                      {block.element.text.content != '' &&
                        <div key={block.element.elementId} style={sizeText} className="element-Text">{block.element.text.content}</div>
                      }       
                      {block.element.src != '' &&
                        <img key={block.element.elementId} style={listsBlockSize} src={block.element.src}/>
                      } 
                    </div>
                  )
                })}
              </div>
            )
          }
        })}
        </div>
        <div className="lineVertical"></div>
        {selectSlideId != undefined &&
          <div key={selectSlideId} className="slide">
            {editor.presentation.slides[index].blocks.map(block => {
              const listsBlockSize = {
                width: block.blockSize.width,
                height: block.blockSize.height
              }
              const sizeText = {
                width: block.blockSize.width,
                height: block.blockSize.height,
                fontSize: block.element.text.size
              }
              return(
                <div>
                  {block.element.text.content != '' &&
                    <div key={block.element.elementId} style={sizeText} className="element-Text">{block.element.text.content}</div>
                  }       
                  {block.element.src != '' &&
                    <img key={block.element.elementId} style={listsBlockSize} src={block.element.src}/>
                  } 
                </div>
              )
            })}
          </div>
        }
      </div>
    </div>
  );
}

function indexSelectSlide(editor: AppType, selectSlideId: string) {
  let index = 0
  for(const slide of editor.presentation.slides) {
    if (slide.slideId == selectSlideId) {
      break
    }
    index += 1
  }
  return index
}

export default App;