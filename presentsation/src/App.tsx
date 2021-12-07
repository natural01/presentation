import './App.css';
import { addPresentation, addSlide } from './model/actions';
import { AppType, Mode, Presentation, Background, Block, BlockSize, CommandsHistory} from './model/type';
import { Element, Position, Slide, Text, Primitive} from './model/type';

function App() {
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
      <div className="line"></div>
      <div className="slides">
        <div className="slideList">
        </div>
        <div className="slide"></div>
      </div>
    </div>
  );
}

export default App;