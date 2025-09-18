import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import InputForm from './components/InputForm.jsx'
import Analysis from "./components/Analysis.jsx"
import { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputForm setData={setData}/>} />
        <Route path="/analysis" element={<Analysis data={data}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
