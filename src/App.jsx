import './App.css'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chaininfo from './components/chain-info.jsx'
import ErrorPage from './components/errorpage.jsx'
import FakeBayc from './components/fakeBayc.jsx'
import FakeBaycTokenUri from './components/fakeBaycTokenUri.jsx'
import FakeNefturians from './components/fakeNefturians.jsx'
import FakeNefturiansUser from './components/fakeNefturiansUser.jsx'
import FakeMeebits from './components/fakeMeebits.jsx'


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<>
          <div>
            <Link to="/chain-info">Chain info</Link>
          </div>
        </>} />
        <Route exact path="/chain-info" element={<Chaininfo />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/fakeBayc" element={<FakeBayc />} />
        <Route path="/fakeBayc/:tokenId" element={<FakeBaycTokenUri />} />
        <Route path="/fakeNefturians" element={<FakeNefturians />} />
        <Route path="/fakeNefturians/:userAddress" element={<FakeNefturiansUser />} />
        <Route path="/fakeMeebits" element={<FakeMeebits />} />
      </Routes>
    </Router>
  )
}

export default App
