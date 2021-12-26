import './App.css';
import React, {useEffect, Key, useRef, useState, MouseEvent } from 'react';
import { AppType, Mode, Presentation, Background, Block, BlockSize, CommandsHistory} from './model/type';
import { Element, Position, Slide, Text, Primitive} from './model/type';
import { getEditor, dispatch } from './state/editor';
import {addPresentation, addPrimitive, addRedo, addSlide, addTitle, addUndo, changeBackgroundColorSlide} from './model/actions'
import {changeBackgroundImgSlide, changeBlock, changeMode, delElements, delSlide, editPrimitiveColorback} from './model/actions'
import {editPrimitiveColorline, makeId, moveSlide, selectElements, selectSlide, addText, addImg, ResetSelectElem, changeThisText} from './model/actions'
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
  const text: React.RefObject<HTMLInputElement> = React.createRef()
  const len = editor.presentation.slides.length
  let startPosition = {
    x: 0,
    y: 0
  }
  const [changeElem, setChangeElem] = useState(true)
  const [changeImg, setChengImg] = useState('https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg')
  const [view, setView] = useState(false)
  const [changeBackgroundSlide, setChangeBackgroundSlide] = useState(false)
  const [slideNum, setSlideNum] = useState(0)
  const [slideStyle, setSlideStyle] = useState({})

  function handleKeywordKeyPress(e: React.KeyboardEvent, changeElem: boolean) {
    if( e.key == 'Enter' ){
      if (text.current) {
        dispatch(changeThisText, text.current.value)
        setChangeElem(true)
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
  }

  function ChangeColorSlide(color: string) {
    dispatch(changeBackgroundColorSlide, color)
    setSlideStyle({backgroundColor: color})
  }

  function choiceElement(id: string) {
    dispatch(selectElements, id)
    setChangeElem(true)
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

  function newText(text: string) {
    dispatch(addText, text)
  }

  function newImg(changeImg: string) {
    dispatch(addImg, changeImg)
  }

  // function onImageChange (e: React.DragEvent<HTMLDivElement>) {
  //   const link = document.createElement('a')
  //   link.onload
  // } 
  function addCircle() {
    dispatch(addPrimitive, 'circle')
  }
  function addRectangle() {
    dispatch(addPrimitive, 'rectangle')
  }

  function mouseDown(e: React.MouseEvent, startPosition: any) {
    startPosition = {
      x: e.pageX,
      y: e.pageY
    }
    console.log(startPosition);
    return startPosition
  }

  const [pos, setPos] = useState({
    left: 0,
    top: 0
  })
  
  const handleSaveToPC = (editor: any) => {
    const fileData = JSON.stringify(editor);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'filename.json';
    link.href = url;
    link.click();
  }

  const [drag, setDrag] = useState(false)

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDrag(true)
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDrag(false)
  }

  function onDragHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file: any = e.dataTransfer.files
    const reader = new FileReader()
    console.log(file)
    
    setDrag(false)
  }

  return (
    view 
    ? <div>
        <button className='button' onClick={changeViewMode}>редактировать</button>
        <div key={selectSlideId} className="slide" style={{backgroundColor: editor.presentation.slides[slideNum].background.color}}>
          {editor.presentation.slides[slideNum].blocks.map(block => {
            let listsBlock = {
              width: block.blockSize.width,
              height: block.blockSize.height
            }
            let Text = {
              fontSize: block.element.text.size
            }
            let primitive = {
              width: block.blockSize.width,
              height: block.blockSize.height
            }
            return (
              <div>
                {block.element.primitive.primitiveType == 'rectangle' &&
                  <div key={block.element.elementId} style={primitive} className="rectangle" ></div>
                }
                {block.element.primitive.primitiveType == 'circle' &&
                  <div key={block.element.elementId} style={primitive} className="circle" ></div>
                }
                {block.element.text.content != '' &&
                  <div key={block.element.elementId} style={Text}>{block.element.text.content}</div>
                }       
                {block.element.src != '' &&
                  <img key={block.element.elementId} style={listsBlock} src={block.element.src}/>
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
          <button className="button" onClick={()=>handleSaveToPC(editor)}>скачать</button>
          <button className="button" onClick={()=>setView(true)}>смотреть</button>
        </div>
      </div>
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
          <button className='button' onClick={()=>setChangeBackgroundSlide(true)}>Изменить цвет слайда</button>
          <button className="button" onClick={()=>newText('новый тект')}>текст</button>
          <button className="button" onClick={()=>newImg(changeImg)}>картинка</button>
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
    {editor.presentation.slides.length == 0 &&
       <div className='dropArea'
          onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e)}
          onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
          onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e)}
          onDrop={(e: React.DragEvent<HTMLDivElement>) => onDragHandler(e)}
        >Отпустите файл, чтобы загрузить его</div>
    }
    <div className="slides">
    <div className="slidesList">
      {editor.presentation.slides.map(slide => {
          const slidesStyle = {
            backgroundColor: slide.background.color 
          }
        if (slide.slideId == editor.presentation.selectSlides[0]) {
          return (
            <div key={slide.slideId} className="slideList-dedicatedSlide" style={slidesStyle}>
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
            <div key={slide.slideId} onClick={()=>{choiceSlide(slide.slideId); setSlideStyle(slidesStyle)}} className="slidesList-element" style={slidesStyle}>
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
        <div key={selectSlideId} className="slide" style={slideStyle}>
          {editor.presentation.slides[index].blocks.map(block => {
            let listsBlock = {
              width: block.blockSize.width,
              height: block.blockSize.height
            }
            let Text = {
              fontSize: block.element.text.size
            }
            let primitive = {
              width: block.blockSize.width,
              height: block.blockSize.height
            }
            if (block.element.elementId == editor.presentation.selectElements[0]) {
              return(
                <div>
                  {block.element.primitive.primitiveType == "rectangle" &&
                    <div key={block.element.elementId} style={primitive} className="selectElem-rectangle" draggable="true" onMouseDown={(e: React.MouseEvent) => {startPosition = mouseDown(e, startPosition)}}></div>
                  }
                  {block.element.primitive.primitiveType == "circle" &&
                    <div key={block.element.elementId} style={primitive} className="selectElem" draggable="true"></div>
                  }
                  { block.element.text.content != '' &&
                    <div key={block.element.elementId} style={Text} className="selectElem" draggable="true" onDoubleClick={()=>{setChangeElem(false)}}>
                      {changeElem
                        ? block.element.text.content
                        : <input type="text" ref={text} className='inputText' onKeyPress={(e: React.KeyboardEvent) => {handleKeywordKeyPress(e, changeElem)}}/> 
                      }
                    </div>
                  }       
                  {block.element.src != '' &&
                    <img key={block.element.elementId} style={listsBlock} className="selectElem" src={changeImg} draggable="true"/>
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
      <div className="lineVertical"></div>
      {changeBackgroundSlide &&
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
        </div>
      }
    </div>
  </div>
  )
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