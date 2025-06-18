const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");

// function getQuote(){
//     fetch("https://api.quotable.io/quotes/random")
//     .then(response => response.json())
//     .then(data => {
//         quoteText.innerText = `${data.content}`;
//         quoteAuthor.innerText = `${data.author}`;
//     })
//     .catch(error => {
//         quoteText.innerText = `Errore nel caricamento della citazione`;
//         quoteAuthor.innerText = ``;
//     })
// }

async function getQuote(){
    quoteText.textContent = "Caricamento...";
    quoteAuthor.textContent = "";

    try{
        const res = await fetch("https://dummyjson.com/quotes/random");
        if(!res.ok) throw new Error("Errore di rete");
        const data = await res.json();

        quoteText.textContent = `${data.quote}`;
        quoteAuthor.textContent = `${data.author}`;
    }catch(err){
        quoteText.textContent = "Errore nel caricamento";
        quoteAuthor.textContent = "";
    }
}

newQuoteBtn.addEventListener('click', getQuote);
getQuote();