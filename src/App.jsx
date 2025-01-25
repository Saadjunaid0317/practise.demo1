import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApiData() {
      try {
        const { data } = await axios.get('https://catfact.ninja/fact');
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      }
    }

    fetchApiData();
  }, []);

  return (
    <div className="App">
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        data && <p> Fact:{data.fact}</p>
      )}
    </div>
  );
}

export default App;
