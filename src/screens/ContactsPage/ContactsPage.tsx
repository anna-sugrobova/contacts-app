import { FC, useEffect, useState } from 'react';
import { User } from '../../components/User/User';
import uniqueId from 'lodash/uniqueId';
import { MAIN_URL, SEARCH_QUERY } from '../../api/api';
import { setUsersData } from '../../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner/Spinner';
import { UserActions, UserDataFromApiType } from '../../types/userTypes';
import useModal from '../../hooks/useModal';
import Modal from '../../components/Modal/Modal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SvgIcon from '@mui/material/SvgIcon';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { UserModal } from '../../components/UserModal/UserModal';
import './ContactsPage.scss';

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
  const [modalType, setModalType] = useState(UserActions.Edit);

  const editHandler = (id: string) => {
    setModalType(UserActions.Edit);
    setUserIdToEdit(id);
    toggleModal();
  };

  const handleBackButtonClick = () => {
    navigate('/');
  };

  const handleAddNewContact = () => {
    setModalType(UserActions.Add);
    toggleModal();
  };

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
            <div className="buttons-wrapper">
              <button type="button" onClick={handleBackButtonClick} className="back-button">
                <SvgIcon className="arrow-icon">
                  <ArrowBackIcon />
                </SvgIcon>
              </button>
              <button type="button" onClick={handleAddNewContact} className="add-person-button">
                <SvgIcon>
                  <PersonAddIcon />
                </SvgIcon>
              </button>
            </div>
            <h1 className="contact-page-title">Contacts</h1>
          </header>
          <div className="users-container">
            {users.map((user: any) => {
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
            <Modal isShowing={isShowing} hide={toggleModal} onClick={toggleModal}>
              <UserModal userIdToEdit={userIdToEdit} closeModal={toggleModal} type={modalType} />
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};
