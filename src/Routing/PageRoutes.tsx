import React from 'react'
import { Routes , Route } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import CreateAccount from '../Pages/CreateAccount'
import CreateTransaction from '../Pages/CreateTransaction'

function PageRoutes() {
  return (
    <>
    <Routes>
        <Route path="/"  element={<HomePage />} />
        <Route path="/create-account"  element={<CreateAccount />} />
        <Route path="/create-transaction"  element={<CreateTransaction />} />
    </Routes>
    </>
  )
}

export default PageRoutes