import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Planets from './pages/Planets'
import Starships from './pages/Starships'
import People from './components/People'

function Home() {
  return (
    <div className="content--container">
      <h1 className="txt-shadow-gold">Welcome to the Star Wars API Explorer</h1>
      <p>Use the navigation above to discover planets and starships from a galaxy far, far away....</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/planets">Planets</Link>
          </li>
          <li>
            <Link to="/people">People</Link>
          </li>
          <li>
            <Link to="/starships">Starships</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/planets" element={<Planets />} />
        <Route path="/people" element={<People />} />
        <Route path="/starships" element={<Starships />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
