import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/auth'
import View from './pages/view/view'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />}></Route>
        <Route path='/view' element={<View />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
