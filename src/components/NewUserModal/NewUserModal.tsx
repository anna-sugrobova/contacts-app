import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { addNewUser } from '../../redux/userSlice';
import '../EditUserModal/EditUserModal.scss';
import { Button } from '../Buttons/Button/Button';

interface NewUserModalProps {
  closeModal: () => void;
}

export const NewUserModal = ({ closeModal }: NewUserModalProps) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const dispatch = useAppDispatch();
  const saveDataHandler = () => {
    dispatch(addNewUser(newUser));
    closeModal();
  };

  return (
    <div className="modal-content">
      <div className="edit-modal-header">
        <p className="modal-title">User profile</p>
      </div>
      <div className="modal-body">
        <form onSubmit={saveDataHandler}>
          <label htmlFor="Name" className="modal-label">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              className="modal-input"
              value={newUser.name}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="Email" className="modal-label">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              className="modal-input"
              value={newUser.email}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="Phone" className="modal-label">
            Phone:
            <input
              type="text"
              id="phone"
              name="phone"
              className="modal-input"
              value={newUser.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="Location" className="modal-label">
            Location:
            <input
              type="text"
              id="location"
              name="location"
              className="modal-input"
              value={newUser.location}
              onChange={handleChange}
              required
            />
          </label>
          <Button type="submit" value="Save" isIcon>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};
