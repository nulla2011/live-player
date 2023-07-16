import Page from './Page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/live/:id" Component={Page} />
      </Routes>
    </Router>
  );
}

export default App;
