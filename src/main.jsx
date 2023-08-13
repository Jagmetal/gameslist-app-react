import React from 'react'
import ReactDOM from 'react-dom/client'
import GamesList from './components/GamesList.jsx'
import GamesApp from './GamesApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render (
  <React.StrictMode>
    <GamesApp />
  </React.StrictMode>,
)

