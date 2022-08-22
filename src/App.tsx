import "./App.css";
import { useEffect, useState } from "react";
import { User } from "./components/User/User";
import uniqueId from 'lodash/uniqueId';
import { MAIN_URL, SEARCH_QUERY } from "./api/api";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      try {
        const request = `${MAIN_URL}?${SEARCH_QUERY}`;
        const response = await fetch(request);
        let resultToUse = await response.json();
        setUsers(resultToUse.results);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  return (
    <div className="App">
      <div className="usersContainer">
        {users.map((user) => {
          const { id, name, gender, location, email, phone, picture } = user;
          const { value } = id;
          const { medium } = picture;

          if (!value) {
            return value === uniqueId();
          }

          return (
            <User
              gender={gender}
              key={value}
              name={name}
              src={medium}
              email={email}
              phone={phone}
              location={location}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
