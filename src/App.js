import {BrowserRouter, Routes, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* 1. Public Route: Anyone can see the Login page */}
      <Route path="/login" element={<LoginForm />} />

      {/* 2. Protected Route Group: Only logged-in users can see these */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* 3. Fallback: If they type a wrong URL */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App