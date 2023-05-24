import {Routes, Route} from 'react-router';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './components/Logout';

function App() {
  return (
    <div className='App'>
    <Routes>
      <Route element={<ProtectedRoute/>} >
        <Route path="/home"  element={<Home/>}/>
        <Route path="/logout" element={<Logout/>}/> 
      </Route>

      <Route path="/" element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </div>
  );
}

export default App;
