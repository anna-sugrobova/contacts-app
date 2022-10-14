import { useState, useEffect } from "react";
import { User } from "../../components/User/User";
import uniqueId from "lodash/uniqueId";
import { MAIN_URL, SEARCH_QUERY } from "../../api/api";
import { setUsersData } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { UserDataFromApiType } from "../../types/userTypes";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import { EditUserModal } from "../../components/EditUserModal/EditUserModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SvgIcon from "@mui/material/SvgIcon";
import { useNavigate } from "react-router-dom";
import "./ContactsPage.scss";

export const ContactsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isShowing, toggle } = useModal();
  let navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      try {
        const request = `${MAIN_URL}?${SEARCH_QUERY}`;
        const response = await fetch(request);
        let users = await response.json();
        dispatch(
          setUsersData(
            users.results.map((user: UserDataFromApiType) => {
              const { id, name, location } = user;
              const idExists = id.name && id.value;

              return {
                ...user,
                id: idExists ? `${id.name}${id.value}` : uniqueId(),
                name: `${name.title} ${name.first} ${name.last}`,
                location: `${location.city} ${location.country} ${location.postcode}`,
              };
            })
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, [dispatch]);

  const users = useAppSelector((state) => state.contacts.users);
  const [userIdToEdit, setUserIdToEdit] = useState("");

  const editHandler = (id: string) => {
    toggle();
    setUserIdToEdit(id);
  };

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="contacts-page-container">
        <header className="contacts-page-header">
          <button type="button" onClick={handleClick} className="back-button">
            <SvgIcon className="arrow-icon">
              <ArrowBackIcon />
            </SvgIcon>
          </button>
          <h1 className="contact-page-title">Contacts</h1>
        </header>
        <div className="usersContainer">
          {users.slice(0, 20).map((user) => {
            const { id, name, gender, location, email, phone, picture } = user;
            const { large } = picture;

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
                onEdit={editHandler}
              />
            );
          })}
          <Modal isShowing={isShowing} hide={toggle}>
            <EditUserModal userIdToEdit={userIdToEdit} closeModal={toggle} />
          </Modal>
        </div>
      </div>
    </>
  );
};
