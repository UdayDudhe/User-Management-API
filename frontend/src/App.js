import LoginPage from './Components/LoginPage/LoginPage';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationPage from './Components/RegistrationPage/RegistrationPage';
import ServerErrorPage from './Components/ServerErrorPage/ServerErrorPage';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/registration' element={<RegistrationPage/>}/>
      <Route path='/ServerError' element={<ServerErrorPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
