import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets/1/')
        if (!response.ok) {
          throw new Error(`HTTP error! status response ${response.status} `);

        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  if (loading) return <div>Loading data...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>


      <div className="card">
        <h3>API test:</h3>
        {/* Render your fetched data here */}
        <pre>{JSON.stringify(data, null, 2)}</pre>

      </div>

    </>
  )
}

export default App
