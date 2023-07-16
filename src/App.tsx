import Page from './Page';
import Congratulations from './Congratulations';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/live/:id" Component={Page} />
        <Route path="*" Component={Congratulations} />
      </Routes>
    </Router>
  );
}

export default App;
