import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [quote, setQuote] = useState('Citazione qui...');
  const [author, setAuthor] = useState('Autore');

  const getQuote = async () => {
    try{
      const res = await fetch('https://dummyjson.com/quotes/random');
      const data = await res.json();
      setQuote(data.quote);
      setAuthor(data.author);
    }catch(err){
      setQuote("Errore nel caricamento della citazione");
      setAuthor("");
    }
  }

  useEffect(() => {
    getQuote();
  }, []);


  return (
    <>
      <div className="App text-center py-5">
        <div className='card p-4 shadow container'>
          <div className='fs-4 mb-3'>"{quote}"</div>
          <div className='text-muted mb-4'>- {author}</div>
          <button onClick={getQuote} className='btn btn-main'>Nuova Citazione</button>
        </div>
      </div>
    </>
  )
}

export default App
