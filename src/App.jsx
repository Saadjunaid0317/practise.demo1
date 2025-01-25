import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchApiData = async (name) => {
    try {

      const response = await axios.get(`https://api.genderize.io?name=${name}`);
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Turn off loading state
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      fetchApiData(name);
    } else {
      setError('Please enter a valid name');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name to guess the gender"
          aria-label="Enter a name"
        />
        <button type="submit" disabled={!name.trim()}>
          Enter
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        data && (
          <div>
            <p>The gender of "{name}" is {data.gender}.</p>
          </div>
        )
      )}
    </>
  );
}

export default App;
