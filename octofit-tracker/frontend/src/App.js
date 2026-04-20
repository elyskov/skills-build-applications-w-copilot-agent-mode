import './App.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Welcome() {
  return (
    <section className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4 p-lg-5">
        <h2 className="display-6 fw-bold text-primary-emphasis mb-3">Welcome</h2>
        <p className="lead mb-3">
          Welcome to OctoFit Tracker. Use the navigation menu to view activities, leaderboard stats,
          teams, users, and workouts.
        </p>
        <Link className="btn btn-primary me-2" to="/activities">Explore Activities</Link>
        <a
          className="btn btn-outline-secondary"
          href="https://react-bootstrap.github.io/"
          target="_blank"
          rel="noreferrer"
        >
          Bootstrap Reference
        </a>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell py-4 py-lg-5">
      <div className="container">
        <header className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
          <div className="d-flex align-items-center gap-3">
            <img
              src="/octofitapp-small.png"
              alt="OctoFit logo"
              className="app-logo"
            />
            <h1 className="display-5 fw-bold text-white mb-0">OctoFit Tracker</h1>
          </div>
          <a
            className="btn btn-light"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            Open GitHub
          </a>
        </header>

      <nav className="navbar navbar-expand-lg navbar-dark app-nav rounded-4 shadow-sm mb-4 px-3 px-lg-4 py-3">
        <ul className="navbar-nav d-flex flex-row flex-wrap gap-2">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" end>
              Welcome
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/activities" className="nav-link">Activities</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/teams" className="nav-link">Teams</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/users" className="nav-link">Users</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/workouts" className="nav-link">Workouts</NavLink>
          </li>
        </ul>
      </nav>

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
