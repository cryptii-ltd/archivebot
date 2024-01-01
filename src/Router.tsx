import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Messages from './pages/messages'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/messages' element={<Messages />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
