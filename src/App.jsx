import './App.css'
import { Routes, Route, useLocation } from "react-router-dom";

import Adultregular from './components/Adultregular.jsx'

function App() {

  
  return (
    <div>
      <Routes>
      <Route path='/' element={<Adultregular component={Adultregular} />} />
      </Routes>
    </div>
  )
}

export default App
