import { FC, useEffect, useState } from 'react';
import { User } from '../../components/User/User';
import uniqueId from 'lodash/uniqueId';
import { MAIN_URL, SEARCH_QUERY } from '../../api/api';
import { setUsersData } from '../../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { UserDataFromApiType } from '../../types/userTypes';
import useModal from '../../hooks/useModal';
import Modal from '../../components/Modal/Modal';
import { EditUserModal } from '../../components/EditUserModal/EditUserModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SvgIcon from '@mui/material/SvgIcon';
import { useNavigate } from 'react-router-dom';
import './ContactsPage.scss';
import { Spinner } from '../../components/Spinner/Spinner';

export const ContactsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isShowing, toggleModal } = useModal();
  let navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsFetching(true);
        const requestUrl = `${MAIN_URL}?${SEARCH_QUERY}`;
        const response = await fetch(requestUrl);
        let users = await response.json();
        const formattedUsers = users.results.map((user: UserDataFromApiType) => {
          const { id, name, location } = user;
          const idExists = id.name && id.value;
          const fullLocation = `${location.city} ${location.country} ${location.postcode}`;
          const fullName = `${name.title} ${name.first} ${name.last}`;
          const fullId = idExists ? `${id.name}${id.value}` : uniqueId();

          return {
            ...user,
            id: fullId,
            name: fullName,
            location: fullLocation,
          };
        });
        dispatch(setUsersData(formattedUsers));
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    })();
  }, [dispatch]);

  const users = useAppSelector((state) => state.contacts.users);
  const [userIdToEdit, setUserIdToEdit] = useState('');

  const editHandler = (id: string) => {
    toggleModal();
    setUserIdToEdit(id);
  };

  const handleBackButtonClick = () => {
    navigate('/');
  };

  const countOfUsersToRender = 20;
  const usersToRender = users.slice(0, countOfUsersToRender);

  return (
    <>
      {isFetching && <Spinner />}
      {error ? (
        <div className="errors">
          Something went wrong &#128530;<br></br> Please, try again later
        </div>
      ) : (
        <div className="contacts-page-container">
          <header className="contacts-page-header">
            <button type="button" onClick={handleBackButtonClick} className="back-button">
              <SvgIcon className="arrow-icon">
                <ArrowBackIcon />
              </SvgIcon>
            </button>
            <h1 className="contact-page-title">Contacts</h1>
          </header>
          <div className="users-container">
            {usersToRender.map((user: any) => {
              const {
                id,
                name,
                gender,
                location,
                email,
                phone,
                picture: { large },
              } = user;

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
            <Modal isShowing={isShowing} hide={toggleModal}>
              <EditUserModal userIdToEdit={userIdToEdit} closeModal={toggleModal} />
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};
