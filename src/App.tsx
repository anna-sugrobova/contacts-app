import "./App.css";
import { useEffect, useState } from "react";
import { User } from "./components/User/User";
import {
  MAIN_URL,
  SEARCH_USERS_URL,
  API_KEY,
  SEARCH_QUERY,
} from './api/api';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      try {
        const request = `${MAIN_URL}${SEARCH_USERS_URL}?${API_KEY}&${SEARCH_QUERY}`;
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
          const { id, profile_image, username, name, bio, location, links } =
            user;
          const { medium } = profile_image;
          const { html } = links;

          return (
            <User
              key={id}
              username={username}
              name={name}
              bio={bio}
              src={medium}
              location={location}
              profile={html}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
