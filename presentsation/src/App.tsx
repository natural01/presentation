import './App.css';
import React, {useEffect, Key, useRef, useState, MouseEvent, DragEvent } from 'react';
import { AppType, Mode, Presentation, Background, Block, BlockSize, CommandsHistory} from './model/type';
import { Element, Position, Slide, Text, Primitive} from './model/type';
import { getEditor, dispatch } from './state/editor';
import {addPresentation, addPrimitive, addSlide, addTitle, changeBackgroundColorSlide, undo, redo, addSelectSlide} from './model/actions'
import {changeBackgroundImgSlide, changeBlockPosition, changeBlockSize, delElements, delSlide, editPrimitiveColorback} from './model/actions'
import {editPrimitiveColorline, makeId, moveSlide, selectElements, selectSlide, addText, addImg, ResetSelectElem, changeThisText, uploadPresentation} from './model/actions'
import { presentation, slide } from './model/testData';
import { createImmediatelyInvokedFunctionExpression, resolveTypeReferenceDirective } from 'typescript';
import { moveCursor } from 'readline';
import { logDOM } from '@testing-library/react';

type AppProps = {
  editor: AppType
}

function App(this: any, {editor}: AppProps) {
  const selectSlideId = editor.presentation.selectSlides[0]
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef()
  const text: React.RefObject<HTMLInputElement> = React.createRef()
  const textInTextarea: React.RefObject<HTMLTextAreaElement> = React.createRef()
  const img: React.RefObject<HTMLInputElement> = React.createRef()
  const len = editor.presentation.slides.length

  const [changeElem, setChangeElem] = useState(true)
  const [view, setView] = useState(false)
  const [changeBackgroundSlide, setChangeBackgroundSlide] = useState(false)
  const [changeStylePrimitive, setChangeStylePrimitive] = useState(false)
  const [addImgSlide, setAddImgSlide] = useState(false)
  const [slideNum, setSlideNum] = useState(0)
  const [slideStyle, setSlideStyle] = useState({})
  const [position, setPosition] = useState(false)
  const [stylePos, setStylePos] = useState({})
  //-----
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  //-----
  const [startPosition, setStartPosition] = useState({})
  const [selectedFile, setSelectedFile] = useState(false)
  const indexes = findIndexes(editor)

  useEffect(() => {
    document.addEventListener("keydown", (event: KeyboardEvent) => ControlDown(event, view))
  }, [])
  console.log(editor.commandsHistory.undo);
  
  
  function ControlDown(e: KeyboardEvent, view: boolean) {
    if (view) {
      if (e.key == "Escape") {
        changeViewMode()
      }
    } else {
      if (e.ctrlKey && e.code === 'KeyZ') {
        closeMenu()
        dispatch(undo, {})
      }
      else if (e.ctrlKey && e.code === 'KeyY') {
          closeMenu()
          dispatch(redo, {})
      }
    }
  }

  const changeHandler = (event: any) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function(){
      const json = reader.result + ''
      const newEditor = JSON.parse(json)
      dispatch(uploadPresentation, newEditor)
    }
  }
  
  function downloadImgElement(e: any) {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
      const srcImg = reader.result + ''
      dispatch(addImg, srcImg)
    }
  }
  function downloadImgSLide(e: any) {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
      const srcImg = reader.result + ''
      dispatch(changeBackgroundImgSlide, srcImg)
    }
  }

  function handleKeywordKeyPress(e: React.KeyboardEvent) {
    if( e.key == 'Enter' ){
      if (textInTextarea.current) {
        dispatch(changeThisText, textInTextarea.current.value)
        setChangeElem(true)
        closeMenu()
      }
    }
  }

  function switchSlideNext(slideNum: number, len: number) {
    if (slideNum != len-1) {
      setSlideNum(slideNum+1)
    }
  }

  function switchSlidePrevious(slideNum: number) {
    if (slideNum != 0) {
      setSlideNum(slideNum-1)
    }
  }
  function changeViewMode() {
    setView(false)
  }

  function choiceSlide(id: string) {
    dispatch(ResetSelectElem, {})
    dispatch(selectSlide, id)
    setChangeElem(true)
    closeMenu()
  }

  function ChangeColorSlide(color: string) {
    if (editor.presentation.slides.length > 0) {
      dispatch(changeBackgroundColorSlide, color)
      setSlideStyle({backgroundColor: color})
    }
  }

  function choiceElement(id: string) {
    dispatch(selectElements, id)
    setChangeElem(true)
    closeMenu()
  }

  function deleteSlide() {
    if (editor.presentation.slides.length > 0) {
      dispatch(delSlide, {})
      closeMenu()
    }
  }
  function deleteElement() {
    if (editor.presentation.slides.length > 0) {
      dispatch(delElements, {})
      closeMenu()
    }
  }

  function newPresentation() {
    dispatch(addPresentation, 'title')
    closeMenu()
  }

  function updataTitile() {
    dispatch(addTitle, '')
    closeMenu()
  }

  function newTitile() {
    if (inputRef.current) {
      closeMenu()
      dispatch(addTitle, inputRef.current.value)
    }
  }

  function newSlide() {
    if (editor.presentation.slides.length > 0) {
      dispatch(addSlide, {})
      closeMenu()
    }
  }

  function newText(text: string) {
    if (editor.presentation.slides.length > 0) {
      closeMenu()
      dispatch(addText, text)
    }
  }

  function newImg() {
    if (img.current) {
      setAddImgSlide(false)
      dispatch(addImg, img.current.value)
    }
  }

  function addCircle() {
    if (editor.presentation.slides.length > 0) {
      closeMenu()
      dispatch(addPrimitive, 'circle')
    }
  }
  function addRectangle() {
    if (editor.presentation.slides.length > 0) {
      closeMenu()
      dispatch(addPrimitive, 'rectangle')
    }
  }

  function changeStylePrimitiveBackColor(color: string) {
    dispatch(editPrimitiveColorback, color)
  }
  function changeStylePrimitiveBorderColor(color: string) {
    dispatch(editPrimitiveColorline, color)
  }
  
  const handleSaveToPC = (editor: AppType) => {
    const fileData = JSON.stringify(editor);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download =  editor.presentation.title + '.json';
    link.href = url;
    link.click();
  }

  function startPosMove(e: React.MouseEvent, primitive: any) {
    closeMenu()
    setStartPosition({
      x: e.screenX,
      y: e.screenY
    })
    setPosition(true)
    setStylePos({
      x: primitive.left,
      y: primitive.top
    })
  }

  function finish(e: React.MouseEvent, startPosition: any, position: boolean, stylePos: any) {
    if (position) {
      const lastPos = {
        x: e.screenX - startPosition.x + stylePos.x,
        y: e.screenY - startPosition.y + stylePos.y
      }
      setPosition(false)
      dispatch(changeBlockPosition, lastPos)
    }
  }
  
  const [currentSlide, setCurrentSlide] = useState({})
  function dragStartHandler(e: DragEvent<HTMLDivElement>, slide: Slide) {
    setCurrentSlide(slide)
  }
  function dragEndHandler(e: DragEvent<HTMLDivElement>){}
  function dragOverHandler(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }
  function dropHandler(e: DragEvent<HTMLDivElement>, slide: Slide) {
    e.preventDefault()
    let pos = findPositionSlide(editor, slide)
    dispatch(moveSlide, pos)
  }

  function openMenuChangeSize() {
    setWidth(editor.presentation.slides[indexes.indexSelectSlide].blocks[indexes.indexSelectBlock].blockSize.width)
    setHeight(editor.presentation.slides[indexes.indexSelectSlide].blocks[indexes.indexSelectBlock].blockSize.height)
  }
  function closeMenu() {
    setChangeStylePrimitive(false)
    setAddImgSlide(false)
    setChangeBackgroundSlide(false)
    setSelectedFile(false)
    setWidth(100)
    setHeight(100)
  }
  function changeModeView(editor: AppType) {
    if (editor.presentation.slides.length > 0) {
      setView(true)
      setSlideNum(indexes.indexSelectSlide)
    } 
  }

  function decrementWidth(width: number, height: number) {
    if (width != 0) {
      width = width - 1
    }
    setWidth(width)
    dispatch(changeBlockSize, {width, height})
  }
  function decrementHeight(height: number, width: number) {
    if (height != 0) {
      height = height - 1
    }
    setHeight(height)
    dispatch(changeBlockSize, {width, height})
  }
  function incrementWidth(width: number, height: number) {
    setWidth(width+1)
    dispatch(changeBlockSize, {width, height})
  }
  function incrementHeight(width: number, height: number) {
    setHeight(height+1)
    dispatch(changeBlockSize, {width, height})
  }
  function changeWidthKey(e: React.KeyboardEvent, width: number) {
    if (e.key == "ArrowUp") {
      setWidth(width + 1)
      dispatch(changeBlockSize, {width, height})
    }
    if (e.key == "ArrowDown") {
      setWidth(width - 1)
      dispatch(changeBlockSize, {width, height})
    }
  }
  function changeHeightKey(e: React.KeyboardEvent, height: number) {
    if (e.key == "ArrowUp") {
      setHeight(height + 1)
      dispatch(changeBlockSize, {width, height})
    }
    if (e.key == "ArrowDown") {
      setHeight(height - 1)
      dispatch(changeBlockSize, {width, height})
    }
  }

  return (
    view 
    ? <div>
        <button className='button' onClick={changeViewMode}>редактировать</button>
        <div key={selectSlideId} className="slide" style={{backgroundColor: editor.presentation.slides[slideNum].background.color}}>
          {editor.presentation.slides[slideNum].blocks.map(block => {
            let listsBlock = {
              width: block.blockSize.width,
              height: block.blockSize.height,
              left: block.position.x,
              top: block.position.y
            }
            let Text = {
              fontSize: block.element.text.size,
              left: block.position.x,
              top: block.position.y,
              width: block.blockSize.width,
              height: block.blockSize.height
            }
            let primitive = {
              backgroundColor: block.element.primitive.colourBack,
              borderColor: block.element.primitive.colourLine,
              width: block.blockSize.width,
              height: block.blockSize.height,
              left: block.position.x,
              top: block.position.y
            }
            return (
              <div className='block'>
                {block.element.primitive.primitiveType == 'rectangle' &&
                  <div key={block.element.elementId} style={primitive} className="rectangle" ></div>
                }
                {block.element.primitive.primitiveType == 'circle' &&
                  <div key={block.element.elementId} style={primitive} className="circle" ></div>
                }
                {block.element.text.content != '' &&
                  <div key={block.element.elementId} style={Text} className='text'>{block.element.text.content}</div>
                }       
                {block.element.src != '' &&
                  <img key={block.element.elementId} style={listsBlock} className='img' src={block.element.src}/>
                } 
              </div>
            )
          })}
        </div>
        <div className='blockSwitch'>
          <button className='switch' onClick={()=>switchSlidePrevious(slideNum)}>{'<'}-</button>
          <button className='switch' onClick={()=>switchSlideNext(slideNum, len)}>-{'>'} </button>
        </div>
      </div>
    : <div className="App">
      <div className="topmenu">
        <div className="dropdown">
          <button className="button" id="AddSlide">Файл</button>
          <div className="dropdown-child">
            <button className="button" onClick={newPresentation}>Добавить презентацию</button>
            <button className="button" onClick={()=>handleSaveToPC(editor)}>сохранить</button>
            <button className="button" onClick={()=>{setChangeBackgroundSlide(false); setAddImgSlide(false); setSelectedFile(true); setChangeStylePrimitive(false)}}>загрузить</button>
            <button className="button" onClick={()=>changeModeView(editor)}>смотреть</button>
          </div>
        </div>
        <div className="dropdown">
          <button className="button" id="AddSlide">Презентация</button>
          <div className="dropdown-child">
            <button className="button" onClick={updataTitile}>Изменить title</button>
            <button className="button" onClick={newSlide}>Добавить Слайд</button>
            <button className="button" onClick={deleteSlide}>Удалить слайд</button>
          </div>
        </div>
        <div className="dropdown">
          <button className="button" id="AddSlide">Слайд</button>
          <div className="dropdown-child">
            <button className='button' onClick={()=>{setChangeBackgroundSlide(true); setAddImgSlide(false); setSelectedFile(false); setChangeStylePrimitive(false)}}>Изменить цвет слайда</button>
            <button className="button" onClick={()=>newText('новый тект')}>текст</button>
            <button className="button" onClick={()=>{setChangeBackgroundSlide(false); setAddImgSlide(true); setSelectedFile(false); setChangeStylePrimitive(false)}}>картинка</button>
            <button className="button" onClick={addCircle}>квадрат</button>
            <button className="button" onClick={addRectangle}>круг</button>
            <button className='button' onClick={deleteElement}>удалить элемент</button>
          </div> 
        </div>
        <button className="button" onClick={()=>{setChangeStylePrimitive(true); setChangeBackgroundSlide(false); setAddImgSlide(false); setSelectedFile(false); openMenuChangeSize()}}>редактировать элемент</button>
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
            const slidesStyle = {
              backgroundColor: slide.background.color,
              backgroundImage: 'url(' + slide.background.src + ')'
            }
          if (slide.slideId == editor.presentation.selectSlides[0]) {
            return (
              <div key={slide.slideId} className="slideList-dedicatedSlide" style={slidesStyle} draggable={true}
              onDragStart={(e: DragEvent<HTMLDivElement>)=>dragStartHandler(e, slide)}
              onDragLeave={(e: DragEvent<HTMLDivElement>)=>dragEndHandler(e)}
              onDragEnd={(e: DragEvent<HTMLDivElement>)=>dragEndHandler(e)}
              onDragOver={(e: DragEvent<HTMLDivElement>)=>dragOverHandler(e)}
              onDrop={(e: DragEvent<HTMLDivElement>)=>dropHandler(e, slide)}> 
                {slide.blocks.map(block => {
                  const listsBlockSize = {
                    width: block.blockSize.width/7,
                    height: block.blockSize.height/7,
                    left: block.position.x/7,
                    top: block.position.y/7
                  }
                  const sizeText = {
                    width: block.blockSize.width/7,
                    height: block.blockSize.height/7,
                    fontSize: 3,
                    left: block.position.x/7,
                    top: block.position.y/7
                  }
                  const primitive = {
                    backgroundColor: block.element.primitive.colourBack,
                    borderColor: block.element.primitive.colourLine,
                    width: block.blockSize.width/7,
                    height: block.blockSize.height/7,
                    left: block.position.x/7,
                    top: block.position.y/7
                  }
                  return(
                    <div className='block'>
                      {block.element.primitive.primitiveType == 'circle' &&
                        <div key={block.element.elementId} style={primitive} className="selectCircle"></div>
                      }
                      {block.element.primitive.primitiveType == "rectangle" &&
                      <div key={block.element.elementId} style={primitive} className="selectRectangle"></div>
                      }
                      {block.element.text.content != '' &&
                        <div key={block.element.elementId} style={sizeText} className="selectText">{block.element.text.content}</div>
                      }       
                      {block.element.src != '' &&
                        <img key={block.element.elementId} style={listsBlockSize} className='selectImg' src={block.element.src}/>
                      } 
                    </div>
                  )
                })}
              </div>
            )
          } else {
            return (
              <div key={slide.slideId} onClick={()=>{choiceSlide(slide.slideId); setSlideStyle(slidesStyle)}} className="slidesList-element" style={slidesStyle}
              onDragStart={(e: DragEvent<HTMLDivElement>)=>dragStartHandler(e, slide)}
              onDragLeave={(e: DragEvent<HTMLDivElement>)=>dragEndHandler(e)}
              onDragEnd={(e: DragEvent<HTMLDivElement>)=>dragEndHandler(e)}
              onDragOver={(e: DragEvent<HTMLDivElement>)=>dragOverHandler(e)}
              onDrop={(e: DragEvent<HTMLDivElement>)=>dropHandler(e, slide)}>
                {slide.blocks.map(block => {
                  const listsBlockSize = {
                    width: block.blockSize.width/7,
                    height: block.blockSize.height/7,
                    left: block.position.x/7,
                    top: block.position.y/7
                  }
                  const sizeText = {
                    width: block.blockSize.width/7,
                    height: block.blockSize.height/7,
                    fontSize: 3,
                    left: block.position.x/7,
                    top: block.position.y/7
                  }
                  const primitive = {
                    backgroundColor: block.element.primitive.colourBack,
                    borderColor: block.element.primitive.colourLine,
                    width: block.blockSize.width/7,
                    height: block.blockSize.height/7,
                    left: block.position.x/7,
                    top: block.position.y/7
                  }
                  return(
                    <div className='block'>
                      {block.element.primitive.primitiveType == 'circle' &&
                        <div key={block.element.elementId} style={primitive} className="selectCircle"></div>
                      }
                      {block.element.primitive.primitiveType == "rectangle" &&
                        <div key={block.element.elementId} style={primitive} className="selectRectangle"></div>
                      }
                      {block.element.text.content != '' &&
                        <div key={block.element.elementId} style={sizeText} className="selectText">{block.element.text.content}</div>
                      }       
                      {block.element.src != '' &&
                        <img key={block.element.elementId} style={listsBlockSize} className='selectImg' src={block.element.src}/>
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
          <div key={selectSlideId} className="slide" style={slideStyle} onMouseOverCapture={(e: React.MouseEvent) => {finish(e, startPosition, position, stylePos)}}>
            {editor.presentation.slides[indexes.indexSelectSlide].blocks.map(block => {
              let listsBlock = {
                width: block.blockSize.width,
                height: block.blockSize.height,
                left: block.position.x,
                top: block.position.y
              }
              let Text = {
                fontSize: block.element.text.size,
                left: block.position.x,
                top: block.position.y,
                width: block.blockSize.width,
                height: block.blockSize.height
              }
              let primitive = {
                backgroundColor: block.element.primitive.colourBack,
                borderColor: block.element.primitive.colourLine,
                width: block.blockSize.width,
                height: block.blockSize.height,
                left: block.position.x,
                top: block.position.y
              }
              if (block.element.elementId == editor.presentation.selectElements[0]) {
                return(
                  <div className='block'>
                    {block.element.primitive.primitiveType == "rectangle" &&
                      <div key={block.element.elementId} style={primitive} className="selectElem-rectangle" draggable="true" 
                      onMouseDown={(e: React.MouseEvent) => {startPosMove(e, primitive)}} onMouseUp={()=>setPosition(false)}>
                      </div>
                    }
                    {block.element.primitive.primitiveType == "circle" &&
                      <div key={block.element.elementId} style={primitive} className="selectElem" draggable="true" onMouseDown={(e: React.MouseEvent) => {startPosMove(e, primitive)}} onMouseUp={()=>setPosition(false)}></div>
                    }
                    { block.element.text.content != '' &&
                      <div key={block.element.elementId} style={Text} className="selectElem" draggable="true" onDoubleClick={()=>{setChangeElem(false)}} onMouseDown={(e: React.MouseEvent) => {startPosMove(e, Text)}} onMouseUp={()=>setPosition(false)}>
                        {changeElem
                          ? block.element.text.content
                          : <textarea ref={textInTextarea} className='inputText' onKeyPress={(e: React.KeyboardEvent) => {handleKeywordKeyPress(e)}}></textarea> 
                        }
                      </div>
                    }       
                    {block.element.src != '' && 
                      <div style={listsBlock} className="selectElem">
                        <img key={block.element.elementId} className='selectElem-img' src={block.element.src} draggable="true" onMouseDown={(e: React.MouseEvent) => {startPosMove(e, listsBlock)}} onMouseUp={()=>setPosition(false)}/>
                      </div>
                    } 
                  </div>
                ) 
              } else {
                return (
                  <div className='block'>
                    {block.element.primitive.primitiveType == 'rectangle' &&
                      <div key={block.element.elementId} style={primitive} className="rectangle" onClick={()=>choiceElement(block.element.elementId)}></div>
                    }
                    {block.element.primitive.primitiveType == 'circle' &&
                      <div key={block.element.elementId} style={primitive} className="circle" onClick={()=>choiceElement(block.element.elementId)}></div>
                    }
                    {block.element.text.content != '' &&
                      <div key={block.element.elementId} onClick={()=>choiceElement(block.element.elementId)} className='text' style={Text}>{block.element.text.content}</div>
                    }       
                    {block.element.src != '' &&
                      <img key={block.element.elementId} onClick={()=>choiceElement(block.element.elementId)} className='img' style={listsBlock} src={block.element.src}/>
                    } 
                  </div>
                )
              }
            })}
          </div>
        }
        <div className="lineVertical"></div>
        {addImgSlide &&
          editor.presentation.slides.length > 0 &&
          <div className='changeMenu'>
            <span className='changeMenu-top'>Ведите URL картинк</span>
            <div>
              <input type="text" ref={img} defaultValue='https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'/>
              <button className="button" onClick={newImg}>сохранить</button>
            </div>
            <span className='changeMenu-top'>Загрузите картинку</span>
            <input type="file" name="file" onChange={(e: any)=>downloadImgElement(e)}/>
          </div>
        }
        {selectedFile &&
          <div className='changeMenu'>
            <span className='changeMenu-top'>Выберите файл</span>
            <input type="file" name="file" onChange={(event: any)=>changeHandler(event)}/>
          </div>
        }
        {changeStylePrimitive &&
          editor.presentation.slides.length > 0 &&
          <div className='changeMenu'>
            <span style={{color: '#aeb1b4', display: 'flex', justifyContent: 'center'}}>Для примитивов</span>
            <div className='changeColor'>
              <span className='changeMenu-top'>Выберите цвет фона</span>
              <button className='primitiveColor-white' onClick={()=>changeStylePrimitiveBackColor('white')}></button>
              <button className='primitiveColor-silver' onClick={()=>changeStylePrimitiveBackColor('silver')}></button>
              <button className='primitiveColor-black' onClick={()=>changeStylePrimitiveBackColor('black')}></button>
              <button className='primitiveColor-blue' onClick={()=>changeStylePrimitiveBackColor('blue')}></button>
              <button className='primitiveColor-red' onClick={()=>changeStylePrimitiveBackColor('red')}></button>
              <button className='primitiveColor-pink' onClick={()=>changeStylePrimitiveBackColor('pink')}></button>
              <button className='primitiveColor-yellow' onClick={()=>changeStylePrimitiveBackColor('yellow')}></button>
              <span className='changeMenu-top'>Выберите цвет рамки</span>
              <button className='primitiveColor-white' onClick={()=>changeStylePrimitiveBorderColor('white')}></button>
              <button className='primitiveColor-silver' onClick={()=>changeStylePrimitiveBorderColor('silver')}></button>
              <button className='primitiveColor-black' onClick={()=>changeStylePrimitiveBorderColor('black')}></button>
              <button className='primitiveColor-blue' onClick={()=>changeStylePrimitiveBorderColor('blue')}></button>
              <button className='primitiveColor-red' onClick={()=>changeStylePrimitiveBorderColor('red')}></button>
              <button className='primitiveColor-pink' onClick={()=>changeStylePrimitiveBorderColor('pink')}></button>
              <button className='primitiveColor-yellow' onClick={()=>changeStylePrimitiveBorderColor('yellow')}></button>
            </div>
            <span className='changeMenu-top'>Выберите ширину блока</span>
            <div style={{marginBottom: 50}}>
              <div className='choseSize'>
                <button className='decrement' onClick={()=>decrementWidth(width, height)}>-</button>
                <input className='width' value={width} onKeyDown={(e: React.KeyboardEvent)=>changeWidthKey(e, width)}></input>
                <button className='increment' onClick={()=>incrementWidth(width, height)}>+</button>
              </div>
            </div>
            <span className='changeMenu-top'>Выберите высоту блока</span>
            <div className='choseSize'>
              <button className='decrement' onClick={()=>decrementHeight(height, width)}>-</button>
              <input className='width' value={height} onKeyDown={(e: React.KeyboardEvent)=>changeHeightKey(e, height)}></input>
              <button className='increment' onClick={()=>incrementHeight(width, height)}>+</button>
            </div>
          </div>
        }
        {changeBackgroundSlide &&
          editor.presentation.slides.length > 0 &&
          <div className='changeMenu'>
            <span className='changeMenu-top'>Выберите цвет</span>
            <div className='changeMenu-block'>
              <div className='color-white'></div>
              <button onClick={()=>{ChangeColorSlide('white'); setChangeBackgroundSlide(false)}}> применить </button>
            </div>
            <div className='changeMenu-block'>
              <div className='color-silver'></div>
              <button onClick={()=>{ChangeColorSlide('silver'); setChangeBackgroundSlide(false)}}> применить </button>
            </div>
            <div className='changeMenu-block'>
              <div className='color-black'></div>
              <button onClick={()=>{ChangeColorSlide('black'); setChangeBackgroundSlide(false)}}> применить </button>
            </div>
            <div className='changeMenu-block'>
              <div className='color-blue'></div>
              <button onClick={()=>{ChangeColorSlide('blue'); setChangeBackgroundSlide(false)}}> применить </button>
            </div>
            <div className='changeMenu-block'>
              <div className='color-red'></div>
              <button onClick={()=>{ChangeColorSlide('red'); setChangeBackgroundSlide(false)}}> применить </button>
            </div>
            <div className='changeMenu-block'>
              <div className='color-pink'></div>
              <button onClick={()=>{ChangeColorSlide('pink'); setChangeBackgroundSlide(false)}}> применить </button>
            </div>
            <div className='changeMenu-block'>
              <div className='color-yellow'></div>
              <button onClick={()=>{ChangeColorSlide('yellow'); setChangeBackgroundSlide(false)}}> применить </button>
            </div>
            <span className='changeMenu-top'>Выберите картинку</span>
            <input type="file" name="file" onChange={(e: any)=>downloadImgSLide(e)}/>
          </div>
        }
      </div>
    </div>
  )
}

function findIndexSelectSlide(editor: AppType) {
  let index = 0
  for(const slide of editor.presentation.slides) {
    if (slide.slideId == editor.presentation.selectSlides[0]) {
      break
    }
    index += 1
  }
  return index
}

function findIndexSelectBlock(editor: AppType, indexSelectSlide: number) {
  let index = 0
  for(const block of editor.presentation.slides[indexSelectSlide].blocks) {
    if (block.element.elementId == editor.presentation.selectElements[0]) {
      break
    }
    index += 1
  }
  return index
}

function findIndexes(editor: AppType) {
  let indexes = {
    indexSelectSlide: 0,
    indexSelectBlock: 0
  }
  if (editor.presentation.selectSlides.length !== 0) {
    indexes.indexSelectSlide = findIndexSelectSlide(editor)
  }
  if (editor.presentation.selectElements.length !== 0) {
    indexes.indexSelectBlock = findIndexSelectBlock(editor, indexes.indexSelectSlide)
  }
  return indexes
}

function findPositionSlide(editor: AppType, selectSlide: Slide) {
  let num = 0
  for (const slide of editor.presentation.slides) {
    if (slide.slideId == selectSlide.slideId) {
      break
    }
    num += 1
  }
  return num
}

export default App;