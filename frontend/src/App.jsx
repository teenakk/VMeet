import './App.css'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './contexts/AuthContext';
import Authentication from './pages/authentication';
import VideoMeetComponent from './pages/VideoMeet';
import HomeComponent from './pages/HomeComponent';
import History from './pages/History';

function App() {
  
  return (
    <>
      <Router>

        <AuthProvider>
          <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/auth' element={<Authentication />} />
              <Route path='/home' element={<HomeComponent />} />
              <Route path='history' element={<History /> } />
              <Route path='/:url' element={<VideoMeetComponent />} />
          </Routes>

        </AuthProvider>
      </Router>
    </>
  )
}

export default App
