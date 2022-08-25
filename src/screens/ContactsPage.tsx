import { useEffect } from "react";
import { User } from "../components/User/User";
import uniqueId from 'lodash/uniqueId';
import { MAIN_URL, SEARCH_QUERY } from "../api/api";
import { setUsersData } from '../redux/userSlice';
import { useAppDispatch } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import '../components/User/User.css';

export const UsersComponent: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function getUsers() {
      try {
        const request = `${MAIN_URL}?${SEARCH_QUERY}`;
        const response = await fetch(request);
        let resultToUse = await response.json();
        dispatch(setUsersData(resultToUse.results));
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, [dispatch]); 

  const users = useAppSelector(state => state.contacts.users);

  return (
    <div className="usersContainer">
      { users.slice(0, 20).map((user) => {
        const { id, name, gender, location, email, phone, picture } = user;
        const { value } = id;
        const { large } = picture;

        if (!value) {
          return value === uniqueId()
        } 

        return (
          <User
            gender={gender}
            key={value}
            name={name}
            src={large}
            email={email}
            phone={phone}
            location={location}
          />
        )
      })
    }
    </div>
  );
};