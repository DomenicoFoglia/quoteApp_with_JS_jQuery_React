import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('Caricamento citazione...');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getQuote = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://dummyjson.com/quotes/random');
      if (!res.ok) throw new Error('Errore rete');
      const data = await res.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (err) {
      setQuote('Errore nel caricamento della citazione');
      setAuthor('');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);


  return (
    <main className="container flex-grow-1 d-flex flex-column align-items-center py-5">
      <h1 className="text-center mb-4 app-title">Citazioni – React</h1>
      <p className="text-center mb-4 px-3 app-description" style={{ maxWidth: '600px' }}>
        Questa versione dell'app è realizzata con React, usando hook per gestire stato e side effect.
        Clicca il pulsante per generare una nuova citazione.
      </p>

      <div id="quote-box" className="quote-card p-4 shadow w-100">
        <div id="quote-content">
          <p className="fs-5 mb-2 quote-text" style={{ minHeight: '3rem' }}>
            {loading ? 'Caricamento...' : `"${quote}"`}
          </p>
          <p className="text-end fst-italic quote-author">{loading || error ? '' : `- ${author}`}</p>
          {error && (
            <p className="text-danger text-center error-text">Errore nel caricamento della citazione.</p>
          )}
        </div>

        <button
          className="btn btn-primary mt-auto btn-quote"
          onClick={getQuote}
          disabled={loading}
        >
          {loading ? 'Caricamento...' : 'Nuova citazione'}
        </button>
      </div>
  </main>
  );
}

export default App
