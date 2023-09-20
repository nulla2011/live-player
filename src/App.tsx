import LivePlayer from './components/LivePlayer';
import Congratulations from './components/Congratulations';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/live/:id" Component={LivePlayer} />
        <Route path="/:id" Component={LivePlayer} />
        <Route path="*" Component={Congratulations} />
      </Routes>
    </Router>
  );
}

export default App;
