import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './screens/loginPage/LoginPage';
import { UsersComponent } from './screens/ContactsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/contacts' element={<UsersComponent />} />
      </Routes>
    </>
  );
}

export default App;
