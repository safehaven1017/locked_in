import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <div>Home</div>
        <Link to="/MonthPage">Month Page</Link>
    </div>
  )
}

export default Home