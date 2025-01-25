import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchApiData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      filterByCountry();
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, data]);

  const fetchApiData = async () => {
    try {
      const response = await axios.get('http://universities.hipolabs.com/search');
      setData(response.data);
      setFilteredData(response.data);  // Set initial filtered data as all universities
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
    }
  };

  const filterByCountry = () => {
    const filtered = data.filter(university =>
      university.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <h1>University List</h1>
      {error ? (
        <p style={{ color: 'red' }}>Oops! Something went wrong: {error}</p>
      ) : (
        <div>
          <label htmlFor="search">
            Search by Country:
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter country name"
              style={{ margin: '10px 0', padding: '5px', width: '250px' }}
            />
          </label>
          {filteredData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Alpha Two Code</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 15).map((university, index) => (
                  <tr key={index}>
                    <td>{university.name}</td>
                    <td>{university.country}</td>
                    <td>{university.alpha_two_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No universities found for the selected country.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
