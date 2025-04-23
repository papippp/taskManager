import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './Pages/AuthPage'
import TaskPage from './Pages/TaskPage'
import './App.css'

import './App.css'
import { Provider } from 'react-redux'
import store from './store'


export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthPage />} path='/login' />
          <Route element={<AuthPage />} path='*' />
          <Route element={<TaskPage />} path='/home' />
        </Routes>

      </BrowserRouter>
    </Provider>

  )
}
