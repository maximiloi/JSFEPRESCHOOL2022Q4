import { getRandomNum } from '../script.js';

const quoteOut = document.querySelector('.quote');
const authorOut = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote');

// async function getQuotes() {
//     const quotes = 'assets/json/data-quote.json';
//     const res = await fetch(quotes);
//     const data = await res.json();

//     let number = getRandomNum(0, data.length);

//     quoteOut.innerText = data[number].text;
//     authorOut.innerText = data[number].author;
// }

async function getRemoteQuotes() {
    const quotes = 'https://type.fit/api/quotes';
    const res = await fetch(quotes);
    const data = await res.json();

    let number = getRandomNum(0, data.length);

    quoteOut.innerText = data[number].text;
    authorOut.innerText = data[number].author;
}

getRemoteQuotes();

changeQuoteButton.addEventListener('click', getRemoteQuotes);
