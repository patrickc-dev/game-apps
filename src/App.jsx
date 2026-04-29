import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TicketToRide from './pages/TicketToRide'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ticket-to-ride" element={<TicketToRide />} />
      </Routes>
    </BrowserRouter>
  )
}
