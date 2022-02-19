import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MonthPage from './components/month/MonthPage';
import WeekPage from './components/week/WeekPage';
import DayPage from './components/day/DayPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} ></Route>
      <Route path="/MonthPage/" element={<MonthPage />} ></Route>
      <Route path="/WeekPage" element={<WeekPage />} ></Route>
      <Route path="/DayPage" element={<DayPage />} ></Route>
    </Routes>
  );
}

export default App;
