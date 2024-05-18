import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './quote.css';

const QuoteOfTheDay = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    const fetchQuote = async () => {
        try {
            const response = await axios.get('https://api.quotable.io/quotes?tags=love|happiness|pain|inspiration|anxiety');
            const quotes = response.data.results;
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(randomQuote.content);
            setAuthor(randomQuote.author);
        } catch (error) {
            console.error('Error fetching the quote', error);
            setQuote('An error occurred while fetching the quote.');
            setAuthor('');
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="quote-container" onClick={fetchQuote}>
            <p className="quote-text">"{quote}"</p>
            <p className="quote-author">- {author}</p>
        </div>
    );
};

export default QuoteOfTheDay;

