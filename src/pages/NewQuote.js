import React from 'react'
import {useNavigate} from 'react-router-dom'

import QuoteForm from '../components/quotes/QuoteForm'

import useHttp from '../hooks/use-http'
import {addQuote} from '../lib/api'

const NewQuote = () => {

    const {sendRequest, status} = useHttp(addQuote)
    const navigate = useNavigate()

    React.useEffect(()=>{
        if(status === 'completed'){
            navigate('/quotes' /*, {replace:true} replace instead of pushing a new route to the history of pages. can't 'go back'*/)
        }
    }, [status])

    const onAddQuote = quoteData => {
        sendRequest(quoteData)
    }
    
    return (
        <QuoteForm isLoading={status === 'pending'} onAddQuote={onAddQuote} />
    )
}

export default NewQuote