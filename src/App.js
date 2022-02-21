import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import YearPage from './components/year/YearPage';
import MonthPage from './components/month/MonthPage';
import WeekPage from './components/week/WeekPage';
import DayPage from './components/day/DayPage';

function App() {
  return (
    <div>
      <Link to="/YearPage">Year &nbsp;</Link>
      <Link to="/MonthPage">Month &nbsp;</Link>
      <Link to="/WeekPage">Week &nbsp;</Link>
      <Link to="/DayPage">Day &nbsp;</Link>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/YearPage" element={<YearPage />} ></Route>
        <Route path="/MonthPage" element={<MonthPage />} ></Route>
        <Route path="/WeekPage" element={<WeekPage />} ></Route>
        <Route path="/DayPage" element={<DayPage />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
