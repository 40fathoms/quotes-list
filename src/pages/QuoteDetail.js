import React from 'react'
import { useParams, Routes, Route, Link, useLocation } from 'react-router-dom'

import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from '../components/UI/LoadingSpinner'

import useHttp from '../hooks/use-http'
import {getSingleQuote} from '../lib/api'

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Max', text: 'Learning React is fun' },
    { id: 'q2', author: 'Maximilian', text: 'Learning React is great' },
]

const QuoteDetail = () => {

    const params = useParams()
    const location = useLocation()

    const {sendRequest, status, error, data: loadedQuote} = useHttp(getSingleQuote, true)

    React.useEffect(()=>{
        sendRequest(params.quoteId)
    }, [sendRequest, params.quoteId])


    if(status === 'pending'){
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        )
    }

    if (error){
        return <p className="centered">{error}</p>
    }

    if (!loadedQuote.text) {
        return (
            <p>No quote found!</p>
        )
    }

    return (
        <React.Fragment>
            <h1>Quote Details</h1>

            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />

            {(location.pathname === `/quotes/${params.quoteId}`) &&
                <div className="centered">
                    <Link to={`${location.pathname}/comments`} className='btn--flat'>Load Comments</Link>
                </div>
            }

            <Routes>
                <Route path='/comments' element={<Comments />} />
            </Routes>
        </React.Fragment>
    )
}

export default QuoteDetail