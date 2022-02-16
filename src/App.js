import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MonthPage from './components/MonthPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} ></Route>
      <Route path="/MonthPage" element={<MonthPage />} ></Route>
    </Routes>
  );
}

export default App;
