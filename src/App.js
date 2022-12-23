import Main from './components/Main';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route exact path="/:page" element={ <Main /> } />
      <Route exact path="/signup" element={ <Signup /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route path="*" element={ <Navigate to="/1" /> } />
    </Routes>
  );
}

export default App;
