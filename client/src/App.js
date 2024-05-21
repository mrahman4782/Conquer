import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/landing';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from './pages/home/home';
import Chat from './pages/chat/chat';
import Marketplace from './pages/marketplace/marketplace';
import Friends from './pages/friends/friends';
import Groups from './pages/groups/groups';
import FindHelp from './pages/findhelp/findhelp';
import Scribe from './pages/scribe/scribe';
import Profile from './pages/profile/profile';
import Layout from './components/layout/layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
        <Route path="/friends" element={<Layout><Friends /></Layout>} />
        <Route path="/groups" element={<Layout><Groups /></Layout>} />
        <Route path="/groups/:groupId/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/findhelp" element={<Layout><FindHelp /></Layout>} />
        <Route path="/scribe" element={<Layout><Scribe /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
