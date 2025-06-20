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

        updateSocialLinks(data.quote, data.author);
        
    }catch(err){
        quoteText.textContent = "Errore nel caricamento";
        quoteAuthor.textContent = "";
    }
}

function updateSocialLinks(quoteText, quoteAuthor) {
    const encoded = encodeURIComponent(`"${quoteText}" - ${quoteAuthor}`);
    document.getElementById('twitter-share').href = `https://twitter.com/intent/tweet?text=${encoded}`;
    document.getElementById('facebook-share').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`;
};

document.getElementById('copy-quote').addEventListener('click', () => {
    const quote = document.getElementById('text').textContent;
    const author = document.getElementById('author').textContent;
    const full = `${quote} ${author}`;
    navigator.clipboard.writeText(full).then(() => {
        const btn = document.getElementById('copy-quote');
        btn.textContent = 'Copiato!';
    });
});

newQuoteBtn.addEventListener('click', getQuote);
getQuote();