import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <h1 className="fw-bold text-center">User Dashboard</h1>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;