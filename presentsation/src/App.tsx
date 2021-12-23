import './App.css';
import React, {useEffect, Key, useRef, useState, MouseEvent } from 'react';
import { AppType, Mode, Presentation, Background, Block, BlockSize, CommandsHistory} from './model/type';
import { Element, Position, Slide, Text, Primitive} from './model/type';
import { getEditor, dispatch } from './state/editor';
import {addPresentation, addPrimitive, addRedo, addSlide, addTitle, addUndo, changeBackgroundColorSlide} from './model/actions'
import {changeBackgroundImgSlide, changeBlock, changeMode, delElements, delSlide, editPrimitiveColorback} from './model/actions'
import {editPrimitiveColorline, makeId, moveSlide, selectElements, selectSlide, addText, addImg, ResetSelectElem} from './model/actions'
import { presentation } from './model/testData';
import { createImmediatelyInvokedFunctionExpression, resolveTypeReferenceDirective } from 'typescript';
import { moveCursor } from 'readline';

type AppProps = {
  editor: AppType
}

function App(this: any, {editor}: AppProps) {
  const selectSlideId = editor.presentation.selectSlides[0]
  const index = indexSelectSlide(editor, selectSlideId)
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  function choiceSlide(id: string) {
    dispatch(ResetSelectElem, {})
    dispatch(selectSlide, id)
  }

  function choiceElement(id: string) {
    dispatch(selectElements, id)
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

  function newTitile() {
    if (inputRef.current) {
      dispatch(addTitle, inputRef.current.value)
    }
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

  function addCircle() {
    dispatch(addPrimitive, 'circle')
  }
  function addRectangle() {
    dispatch(addPrimitive, 'rectangle')
  }

  function mouseDown(e: React.MouseEvent) {
    const position = {
      x: e.pageX,
      y: e.pageY
    }
    return position
  }

  function DnD(style: any, e: React.MouseEvent){
    let startPos = mouseDown(e)
    let finishPos = {
      x: e.pageX,
      y: e.pageY
    }
    style = {
      ...style,
      left: 1,
      top: startPos.y - finishPos.y
    }
    return style 
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
            <button className="button" >треугольник</button>
            <button className="button" onClick={addCircle}>квадрат</button>
            <button className="button" onClick={addRectangle}>круг</button>
          </div> 
        </div>
        <div className="title">
          {editor.presentation.title != '' && <span className="titleStr">{editor.presentation.title}</span>}
          {editor.presentation.title == '' &&
          <div className="changeTitle">
            <input type="text" ref={inputRef} id="newTitle"/>
            <button className="button" onClick={newTitile}>сохранить</button>
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
                  const primitive = {
                    width: block.blockSize.width/7,
                    height: block.blockSize.height/7
                  }
                  return(
                    <div>
                      {block.element.primitive.primitiveType == 'circle' &&
                        <div key={block.element.elementId} style={primitive} className="selectCircle"></div>
                      }
                      {block.element.primitive.primitiveType == "rectangle" &&
                      <div key={block.element.elementId} style={primitive} className="selectRectangle"></div>
                      }
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
                  const primitive = {
                    width: block.blockSize.width/7,
                    height: block.blockSize.height/7
                  }
                  return(
                    <div>
                      {block.element.primitive.primitiveType == 'circle' &&
                        <div key={block.element.elementId} style={primitive} className="selectCircle"></div>
                      }
                      {block.element.primitive.primitiveType == "rectangle" &&
                        <div key={block.element.elementId} style={primitive} className="selectRectangle"></div>
                      }
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
              let listsBlock = {
                width: block.blockSize.width,
                height: block.blockSize.height
              }
              let Text = {
                fontSize: block.element.text.size
              }
              let primitive = {
                left: block.position.x,
                top: block.position.y,
                width: block.blockSize.width,
                height: block.blockSize.height
              }
              if (block.element.elementId == editor.presentation.selectElements[0]) {
                return(
                  <div>
                    {block.element.primitive.primitiveType == "rectangle" &&
                      <div key={block.element.elementId} style={primitive} className="selectElem-rectangle" draggable="true" onMouseDown={(e: React.MouseEvent) => {primitive = DnD(primitive, e)}}></div>
                    }
                    {block.element.primitive.primitiveType == "circle" &&
                      <div key={block.element.elementId} style={primitive} className="selectElem" draggable="true" onMouseDown={(e: React.MouseEvent) => {primitive = DnD(primitive, e)}}></div>
                    }
                    {block.element.text.content != '' &&
                      <div key={block.element.elementId} style={Text} className="selectElem" draggable="true">{block.element.text.content}</div>
                    }       
                    {block.element.src != '' &&
                      <img key={block.element.elementId} style={listsBlock} className="selectElem" src={block.element.src} draggable="true"/>
                    } 
                  </div>
                ) 
              } else {
                return (
                  <div>
                    {block.element.primitive.primitiveType == 'rectangle' &&
                      <div key={block.element.elementId} style={primitive} className="rectangle" onClick={()=>choiceElement(block.element.elementId)}></div>
                    }
                    {block.element.primitive.primitiveType == 'circle' &&
                      <div key={block.element.elementId} style={primitive} className="circle" onClick={()=>choiceElement(block.element.elementId)}></div>
                    }
                    {block.element.text.content != '' &&
                      <div key={block.element.elementId} onClick={()=>choiceElement(block.element.elementId)} style={Text}>{block.element.text.content}</div>
                    }       
                    {block.element.src != '' &&
                      <img key={block.element.elementId} onClick={()=>choiceElement(block.element.elementId)} style={listsBlock} src={block.element.src}/>
                    } 
                  </div>
                )
              }
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