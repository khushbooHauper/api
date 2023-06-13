import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import EditUsersList from './components/EditUsersList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditTodos from './components/EditTodos';
import ListOfUsers from './components/ListOfUsers';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Users</Link>
            </li>
            <li>
              <Link to="/todos">Todos</Link>
            </li>
            <li>
              <Link to="/list">list</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<EditUsersList />} />
          <Route path="/todos" element={<EditTodos />} />
          <Route path="/list" element={<ListOfUsers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}



function Contact() {
  return <h1>Contact Page</h1>;
}

function NotFound() {
  return <h1>404 Not Found</h1>;
}
   
 
export default App;
