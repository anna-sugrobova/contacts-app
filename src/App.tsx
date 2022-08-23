import { Routes, Route, Link } from 'react-router-dom';
import { LoginPage } from './screens/loginPage/LoginPage';
import { ContactsPage } from './screens/ContactsPage';

function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/contacts">Contacts</Link>
      </header>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/contacts' element={<ContactsPage />} />
      </Routes>
    </>
  );
}

export default App;
