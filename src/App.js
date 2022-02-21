import './App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import YearPage from './components/year/YearPage';
import MonthPage from './components/month/MonthPage';
import WeekPage from './components/week/WeekPage';
import DayPage from './components/day/DayPage';
import styled from 'styled-components';
import { useState } from 'react';

function App() {
  const location = useLocation();
  let dropdownText = "";
  switch (location.pathname) {
    case "/YearPage":
      dropdownText = "Year View";
      break;
    case "/MonthPage":
      dropdownText = "Month View";
      break;
    case "/WeekPage":
      dropdownText = "Week View";
      break;
    case "/DayPage":
      dropdownText = "Day View";
      break;
    default:
      dropdownText = "Year View";
      break;
  }
  const [ dropdown, setDropdown ] = useState(false);
  return (
    <div>
      <ViewDropdown onClick={() => setDropdown(!dropdown)} >
        <SelectedView>{dropdownText}</SelectedView>
        <Dropdown>
          <DropdownContent dropdown={dropdown} >            
            {location.pathname !== "/YearPage" && <StyledLink to="/YearPage">Year View</StyledLink>}
            {location.pathname !== "/MonthPage" && <StyledLink to="/MonthPage">Month View</StyledLink>}
            {location.pathname !== "/WeekPage" && <StyledLink to="/WeekPage">Week View</StyledLink>}
            {location.pathname !== "/DayPage" && <StyledLink to="/DayPage">Day View</StyledLink>}         
          </DropdownContent>
        </Dropdown>
      </ViewDropdown>
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

const ViewDropdown = styled.div`
  display: flex;
  flex-direction: column;
  height: 5vh;
  width: 17vw;
  border-radius: 7px;
  margin: .5vw;
  /* margin-left: 1vw; */
  box-sizing: border-box;
  box-shadow: 0px 0px 2px 1px #00000040;
`
const SelectedView = styled.button`
  border-style: none;
  background-color: white;
  height: inherit;
  width: inherit;
  margin: 0;
  padding: 0;
  padding-bottom: 5px;
  font-size: 1vw;
  border-radius: 7px;
  color: red;
`

const Dropdown = styled.div`
  position: relative;
`
const DropdownContent = styled.div`
  font-size: 1vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  display: ${props => props.dropdown ? 'flex' : 'none'};
  width: 17vw;
  height: 10vh;
  background-color: white;
  /* border-bottom-left-radius: 7px; */
  /* border-bottom-right-radius: 7px; */
  box-shadow: 0px 4px 2px 1px #00000040;
  margin-top: -10px;
`

const StyledLink = styled(Link)`
  color: '#0d53f7';
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33%;
  width: 100%;
  text-decoration: none;
  transition: .3s;
  &:hover {
    color: white;
    background-color: #ff000085;
  }
  &:link {
    color: '#0d53f7';
  }
  &:visited {
    color: '#0d53f7';
  }
`

export default App;
