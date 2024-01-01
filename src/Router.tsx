import { BrowserRouter, Route, Routes } from 'react-router-dom'
import View from './pages/view'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/view' element={<View />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
