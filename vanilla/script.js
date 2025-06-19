const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");

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