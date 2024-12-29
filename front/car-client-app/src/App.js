import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CarComponent from './components/car/Car';
import ClientComponent from './components/client/Client';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap styles

function App() {
  return (
    <Router>
      <div>
        {/* Bootstrap Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Management</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/cars">Cars</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/clients">Clients</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mt-4">
          <Routes>
            <Route path="/cars" element={<CarComponent />} />
            <Route path="/clients" element={<ClientComponent />} />
            <Route
              path="/"
              element={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh', // Centrer verticalement dans la plupart des écrans
                    textAlign: 'center',
                  }}
                >
                  <h2> Management System</h2>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
