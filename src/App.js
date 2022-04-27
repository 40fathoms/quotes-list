import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'

import AllQuotes from './pages/AllQuotes'
import NewQuote from './pages/NewQuote'
import NotFound from './pages/NotFound'
import QuoteDetail from './pages/QuoteDetail' 

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate to='/quotes' />} />
        <Route path='/quotes/' element={<AllQuotes />} />
        <Route path='/quotes/:quoteId/*' element={<QuoteDetail />} />
        <Route path='/new-quote' element={<NewQuote />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App