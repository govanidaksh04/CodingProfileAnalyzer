import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import InputForm from './components/InputForm.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
