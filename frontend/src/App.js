import logo from './logo.svg';
import './App.css';
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom'
import LandingPage from './pages/landing'
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeet from './pages/VideoMeet';
import Home from './pages/Home';
import History from './pages/History';

function App() {
  return (
    <div>
      <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/auth' element={<Authentication/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/history' element=<History/>></Route>
          <Route path='/:url' element={<VideoMeet/>}></Route>
        </Routes>
      </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
