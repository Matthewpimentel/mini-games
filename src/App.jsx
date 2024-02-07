import './App.css'
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import { GiTicTacToe } from "react-icons/gi";
import { MdOutlineGridOn } from "react-icons/md";
import { FaCrosshairs } from "react-icons/fa";



function App() {

  return (
    <div className='home-container'>
      <h1>Minigames Hub</h1>
    <div className='home'>
      <div className='button-container'>
        <Link to="/tictactoe"><button><GiTicTacToe size={40} /></button></Link>
        <span>Tic Tac Toe</span>
      </div>
      <div className='button-container'>
       <Link to="/memorymatching"><button><MdOutlineGridOn size={40} /></button></Link>
        <span>Memory Matching</span>
      </div>
      <div className='button-container'>
       <Link to="/aimtrainer"><button><FaCrosshairs size={40} /></button></Link>
        <span>Aim Trainer</span>
      </div>
    </div>
    </div>
  )
}

export default App
