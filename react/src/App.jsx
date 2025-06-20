import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('Caricamento citazione...');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const getQuote = async () => {
    setLoading(true);
    setError(false);
    setCopied(false);
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

  const copyQuote = () => {
    const textToCopy = `"${quote}" - ${author}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
    })
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;


  useEffect(() => {
    getQuote();
  }, []);


  return (
    <main className="container-fluid flex-grow-1 d-flex flex-column align-items-center py-5">
      <h1 className="text-center mb-4 app-title">Citazioni – React</h1>
      <p className="text-center mb-4 px-3 app-description" >
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
        <div className="button-group mt-4">
          {/* Pulsanti azione principali */}
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-3">
            <button
              className="btn btn-primary btn-quote"
              onClick={getQuote}
              disabled={loading}>
              {loading ? 'Caricamento...' : 'Nuova citazione'}
            </button>

            <button
              className="btn btn-secondary"
              onClick={copyQuote}
              disabled={loading || error}
              title="Copia citazione">
              {copied ? 'Copiato!' : 'Copia citazione'}
            </button>
          </div>

          {/* Pulsanti social */}
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-3">
            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info text-white"
              title="Condividi su Twitter"
            >
              <i className="bi bi-twitter me-1"></i> Twitter
            </a>

            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              title="Condividi su Facebook"
            >
              <i className="bi bi-facebook me-1"></i> Facebook
            </a>
          </div>

          {/* Torna indietro */}
          <div className="text-center mt-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => window.history.back()}>
              Torna Indietro
            </button>
          </div>
        </div>
        
      </div>
  </main>
  );
}

export default App
