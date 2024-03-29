import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MemoryMatchingGame from './Pages/MemoryMatchingGame.jsx';
import TicTacToe from './Pages/TicTacToe.jsx';
import AimTrainer from './Pages/AimTrainer.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/tictactoe",
    element: <TicTacToe/>
  },
  {
    path: "/memorymatching",
    element: <MemoryMatchingGame/>
  },
  {
    path: "/aimtrainer",
    element: <AimTrainer/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
