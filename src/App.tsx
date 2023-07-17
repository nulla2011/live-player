import StaticLivePlayer from './components/StaticLivePlayer';
import Congratulations from './components/Congratulations';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/live/:id" Component={StaticLivePlayer} />
        <Route path="*" Component={Congratulations} />
      </Routes>
    </Router>
  );
}

export default App;
