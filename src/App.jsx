import './App.css'
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import { GiTicTacToe } from "react-icons/gi";
import { MdOutlineGridOn } from "react-icons/md";


function App() {

  return (
    <>
    <div>
      <button><Link to="/tictactoe"><GiTicTacToe size={20}/></Link></button>
      <button><Link to="/memorymatching"><MdOutlineGridOn size={20}/></Link></button>
    </div>
    </>
  )
}

export default App
