import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./screens/loginPage/LoginPage";
import { ContactsPage } from "./screens/ContactsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </>
  );
}

export default App;
