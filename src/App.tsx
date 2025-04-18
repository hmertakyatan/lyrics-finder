import { useState, useMemo} from 'react';
import './App.css';
import { getLyrics } from './api/lyricsapi';
import { generateNotes } from './utils/notegenerator'
import { typeLyrics, stopTyping } from './utils/typeanimation';



function App() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [_ , setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const notes = useMemo(() => generateNotes(), []);
  const [showModal, setShowModal] = useState(false);
  const [typedLyrics, setTypedLyrics] = useState('');
  const handleCloseModal = () => {
    stopTyping();
    setShowModal(false);
  };
  const fetchLyrics = async () => {
    if (!artist.trim() || !song.trim()) {
      setError('Please enter both artist and song name');
      return;
    }
    setLoading(true);
    setError('');
    setLyrics('');
    try {
      const result = await getLyrics(artist, song);
      setLyrics(result);
      setShowModal(true);
      typeLyrics(result, setTypedLyrics);
    } catch (err: any) {
      setError(err?.message || 'Lyrics could not be fetched.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className='notes'>
        {notes}
      </div>
      {error && (
          <div className="error-box">
            <span>{error}</span>
            <button onClick={() => setError('')} className="close-error">✖</button>
          </div>
        )}
      <div className="form-container">
        <h1>Lyrics Finder</h1>
        <input
          type="text"
          placeholder="Enter artist name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter song name"
          value={song}
          onChange={(e) => setSong(e.target.value)}
        />
        <button onClick={fetchLyrics} disabled={loading}>
          {loading ? 'Loading...' : 'Find Lyrics'}
        </button>
        
      </div>
      {showModal && (
      <div className="modal-overlay" onClick={() => setShowModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>🎶 {artist} - {song}</h2>
          <pre className="typed-text">{typedLyrics}</pre>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      </div>
    )}
    

    </div>
  );
}

export default App;
