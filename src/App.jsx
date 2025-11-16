import {useState} from 'react'

import './App.css'
import Planets from './components/Planets'
// import Starships from './components/Starships'
// import People from './components/People'




function App() {
  return (
    <>
      <div>
        {/* 
          The Planets component handles its own data fetching,
          loading, and error states.
        */}
        <Planets />
        {/* <Starships /> */}
        {/* <People /> */}
      </div>
    </>
  )
}

export default App
