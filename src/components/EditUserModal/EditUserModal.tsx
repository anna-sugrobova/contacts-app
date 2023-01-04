import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { initialUser, updateUserData } from '../../redux/userSlice';
import './EditUserModal.scss';
import { Button } from '../Buttons/Button/Button';

interface EditUserModalProps {
  userIdToEdit: string;
  closeModal: () => void;
}

export const EditUserModal = ({ userIdToEdit, closeModal }: EditUserModalProps) => {
  const selectUserId = useAppSelector((state) =>
    state.contacts.users.find((user) => user.id === userIdToEdit),
  );
  const [userToEdit, setUserToEdit] = useState(selectUserId || initialUser);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    userToEdit && setUserToEdit({ ...userToEdit, [name]: value });
  };

  const dispatch = useAppDispatch();

  const saveDataHandler = () => {
    dispatch(updateUserData(userToEdit));
    closeModal();
  };

  return (
    <div className="modal-content">
      <div className="edit-modal-header">
        <p className="modal-title">User profile</p>
      </div>
      <div className="modal-body">
        <label htmlFor="Name" className="modal-label">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            className="modal-input"
            value={userToEdit.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Email" className="modal-label">
          Email:
          <input
            type="text"
            id="email"
            name="email"
            className="modal-input"
            value={userToEdit.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Phone" className="modal-label">
          Phone:
          <input
            type="text"
            id="phone"
            name="phone"
            className="modal-input"
            value={userToEdit.phone}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Location" className="modal-label">
          Location:
          <input
            type="text"
            id="location"
            name="location"
            className="modal-input"
            value={userToEdit.location}
            onChange={handleChange}
          />
        </label>
      </div>
      <Button onClick={saveDataHandler} value="Save" isIcon>
        Save
      </Button>
    </div>
  );
};
