// ---------FETCHING QUOTE FROM OUTSIDE API---------

const quoteText = document.getElementsByClassName("quote");
const quoteAuthor = document.getElementsByClassName("author");
const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote_container')


let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote

function newQuote() {
    showLoadingSpinner()
    // Pick random quote from apiQuotes array
    const TheQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if(!TheQuote.author) {
        quoteAuthor[0].innerHTML = 'unknown'
    } else {
        quoteAuthor[0].innerHTML = TheQuote.author
    }
    //Check Quote length to determine styling
    if(TheQuote.text.length > 100) {
        quoteText[0].classList.add('long_quote');
    } else {
        quoteText[0].classList.remove('long_quote');
    }
    
        quoteText[0].innerHTML = TheQuote.text;
        removeLoadingSpinner()
    
}

// Get quotes from API

async function getQuotes() {
    showLoadingSpinner()
    const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote()
    } catch (error) {
        // Catch error here
        console.log(error, "there is an error")
    }
}

// Tweet Quote

function tweetQuote() {
    const twitterUrl = `https:twitter.com/intent/tweet?text=${quoteText[0].innerHTML} - ${quoteAuthor[0].innerHTML}`;
    window.open(twitterUrl, '_blank');
}

// On load

getQuotes();



// ---------FETCHING QUOTE FROM LOCAL API---------

// function newQuote() {
//     // Pick random quote from apiQuotes array
//     const quote = latestQuote[Math.floor(Math.random() * latestQuote.length)]
//     console.log(quote)
//     return quote;
// }

// newQuote();
