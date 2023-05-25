import {Routes, Route} from 'react-router';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './components/ResetPassword';
import NewPassword  from './components/NewPassword';

function App() {
  return (
    <div className='App'>
    <Routes>
      <Route element={<ProtectedRoute/>} >
        <Route path="/home"  element={<Home/>}/>
      </Route>

      <Route path="/" element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/reset/:token" element={<NewPassword/>}/>
    </Routes>
    </div>
  );
}

export default App;
