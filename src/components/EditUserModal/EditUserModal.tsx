import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { updateUserData } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/store";
import SvgIcon from "@mui/material/SvgIcon";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import "./EditUserModal.scss";

interface EditUserModalProps {
  userIdToEdit: string;
  closeModal: () => void;
}

export const EditUserModal = ({
  userIdToEdit,
  closeModal,
}: EditUserModalProps) => {
  const [userToEdit, setUserToEdit] = useState(
    useAppSelector(
      (state) =>
        state.contacts.users.filter((user) => user.id === userIdToEdit)[0]
    )
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserToEdit({ ...userToEdit, [name]: value });
  };

  const dispatch = useAppDispatch();

  const saveDataHandler = () => {
    closeModal();
    dispatch(updateUserData(userToEdit));
  };

  return (
    <div className="modal-content">
      <div className="edit-modal-header">
        <h3 className="modal-title">User profile</h3>
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
      <button onClick={saveDataHandler} className="save-user-button">
        Save
        <SvgIcon className="save-icon">
          <SaveOutlinedIcon />
        </SvgIcon>
      </button>
    </div>
  );
};
