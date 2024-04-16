import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Routes, Route, Link} from "react-router-dom";
import Landing from './pages/landing/landing';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from './pages/home/home';
import Chat from './pages/chat/chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/chat' element={<Chat/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
