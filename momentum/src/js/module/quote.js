import { getRandomNum } from '../script.js';

const URL_REMOTE_JSON = 'https://type.fit/api/quotes';
const URL_LOCAL_JSON = 'assets/json/data-quote.json';

const quoteOut = document.querySelector('.quote');
const authorOut = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote');

async function getQuotes() {
    const quotes = URL_REMOTE_JSON;
    const res = await fetch(quotes);
    const data = await res.json();

    let number = getRandomNum(0, data.length);

    quoteOut.innerText = data[number].text;
    authorOut.innerText = data[number].author;
}

getQuotes();

changeQuoteButton.addEventListener('click', getQuotes);
