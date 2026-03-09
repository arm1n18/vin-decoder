import './App.css'
import { Route, Routes } from 'react-router-dom'
import { MainPage, VariablesPage, VariablePage } from './pages'
import { Header } from './components/header/Header.component'

export default function App() {
  return (
    <>
      <Header />
      <div className='container'>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/variables" element={<VariablesPage />} />
            <Route path='/variables/:variableId' element={<VariablePage />} />
        </Routes>
      </div>
    </>
  )
}