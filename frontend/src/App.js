import { useState, useEffect } from "react";

function App() {
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    fetch('https://localhost:7157/weatherforecast')
    .then(response => response.json())
    .then(data => {
      setForecasts(data);
      setLoading(false);
    })
    .catch(error => {
      console.log('Error fetching data: ', error);
      setLoading(false);
    });
  }, []);

  return(
    <div style={{textAlign: 'center', padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1> Hockey Stats Hub</h1>
      <p>Your source for in-depth hockey stats and news</p>

      <h2>API Connection test</h2>
      {loading ? (
        <p>Loading data from backend...</p>
      ) : forecasts.length > 0 ? (
        <p>Connected! Got {forecasts.length} records from the backend.</p>
      ) : (
        <p>Cound not connect to the backend.</p>
      )}
      </div>
  );
}

export default App;
