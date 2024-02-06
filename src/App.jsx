import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import TicTacToe from './Pages/ticTacToe';
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
