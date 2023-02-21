import { getRandomNum } from '../script.js';
import { lng, languageForQuote } from './translation.js';

// const URL_REMOTE_JSON = 'https://type.fit/api/quotes';
// const URL_LOCAL_JSON = 'assets/json/data-quote.json';

const quoteOut = document.querySelector('.quote');
const authorOut = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote');

export async function getQuotes(url) {
    const quotes = url;
    const res = await fetch(quotes);
    const data = await res.json();

    let number = getRandomNum(0, data.length);

    quoteOut.innerText = data[number].text;
    authorOut.innerText = data[number].author;
}

changeQuoteButton.addEventListener('click', () => {
    getQuotes(lng(languageForQuote));
});
