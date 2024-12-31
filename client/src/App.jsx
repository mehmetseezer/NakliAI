import './App.css'
import Login from './views/Login';
import Home from './views/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes';
import Register from './views/Register';
import Profile from './views/Profile';
import AddVehicle from './views/AddVehicle';
import NotFound from './views/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/add-vehicle' element={<AddVehicle />} />
          </Route>
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
