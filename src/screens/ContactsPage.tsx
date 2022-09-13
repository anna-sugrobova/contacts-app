import { useEffect } from "react";
import { User } from "../components/User/User";
import uniqueId from "lodash/uniqueId";
import { MAIN_URL, SEARCH_QUERY } from "../api/api";
import { setUsersData } from "../redux/userSlice";
import { useAppDispatch } from "../redux/store";
import { useAppSelector } from "../redux/hooks";
import { UserDataFromApiType } from "../types/userTypes";
import "../components/User/User.css";

export const UsersComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getUsers() {
      try {
        const request = `${MAIN_URL}?${SEARCH_QUERY}`;
        const response = await fetch(request);
        let users = await response.json();
        dispatch(
          setUsersData(
            users.results.map((user: UserDataFromApiType) => ({
              ...user,
              id: user.id.value,
            }))
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, [dispatch]);

  const users = useAppSelector((state) => state.contacts.users);

  return (
    <div className="usersContainer">
      {users.slice(0, 20).map((user) => {
        const { id, name, gender, location, email, phone, picture } = user;
        const { large } = picture;

        if (!id) {
          return id === uniqueId();
        }

        return (
          <User
            id={id}
            gender={gender}
            key={id}
            name={name}
            src={large}
            email={email}
            phone={phone}
            location={location}
          />
        );
      })}
    </div>
  );
};
