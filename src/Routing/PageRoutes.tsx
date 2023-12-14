import React from 'react'
import { Routes , Route } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import Account from '../Pages/Account'
import PageNotFoundPage from '../Pages/PageNotFoundPage'
import Accounts from '../Pages/Accounts'

function PageRoutes() {
  return (
    <>
    <Routes>
        <Route path="/"  element={<HomePage />} />
        <Route path="/account"  element={<Account />} />
        <Route path="/accounts"  element={<Accounts />} />
        <Route path="*" element={<PageNotFoundPage />} />
    </Routes>
    </>
  )
}

export default PageRoutes