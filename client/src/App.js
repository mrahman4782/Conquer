import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/landing';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from './pages/home/home';
import Chat from './pages/chat/chat';
import Marketplace from './pages/marketplace/marketplace';
import Layout from './components/layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
