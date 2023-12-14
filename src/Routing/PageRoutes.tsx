import React from 'react'
import { Routes , Route } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import CreateAccount from '../Pages/CreateAccount'

function PageRoutes() {
  return (
    <>
    <Routes>
        <Route path="/"  element={<HomePage />} />
        <Route path="/create-account"  element={<CreateAccount />} />

    </Routes>
    </>
  )
}

export default PageRoutes