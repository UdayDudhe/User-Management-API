import LoginPage from './Components/LoginPage/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavLinks from './Components/NavBar/NavLinks.jsx';
import RegistrationPage from './Components/RegistrationPage/RegistrationPage';
import ServerErrorPage from './Components/ServerErrorPage/ServerErrorPage';
import AdminDashBoard from './Components/Dashboard/Admin/AdminDashBoard';
import UserDashBoard from './Components/Dashboard/User/UserDashBoard';
function App() {
  return (
    <>
    <BrowserRouter>
    <NavLinks />
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/registration' element={<RegistrationPage/>}/>
      <Route path='/ServerError' element={<ServerErrorPage/>}/>
      <Route path='/admindashboard' element={<AdminDashBoard/>}/>
      <Route path='/userdashboard' element={<UserDashBoard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
