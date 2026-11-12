import React from 'react'
import RoutesApp from './routes'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
