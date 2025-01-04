import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRandomQuote = async () => {
    const response = await axios.get('https://dummyjson.com/quotes');
    const quotes = response.data.quotes;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
};

const Quote = () => {
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['randomQuote'],
        queryFn: fetchRandomQuote
    });

    if (isLoading) return <div style={{fontSize:"4rem"}}>Quotes Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='quoteContainer'>
            <h1>Quote</h1>
            <p>{data.quote}</p>
            <p>- {data.author}</p>
            <button onClick={refetch}>Get Another Quote</button>
        </div>
    );
};

export default Quote;