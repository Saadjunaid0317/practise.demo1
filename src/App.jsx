import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchApiData = async (name) => {
    try {
      const response = await axios.get(`https://api.agify.io?name=${name}`);
      setData(response.data);
      setError(null); // Clear any previous error
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a valid name');
      return;
    }
    fetchApiData(name);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter a name to guess the age" 
        />
        <button type="submit">Guess Age</button>
      </form>
      {error ? (
        <p style={{ color: 'red' }}>Oops! Something went wrong: {error}</p>
      ) : (
        data && (
          <div>
            <p>The age of "{name}" is {data.age} years.</p>
          </div>
        )
      )}
    </>
  );
}

export default App;
