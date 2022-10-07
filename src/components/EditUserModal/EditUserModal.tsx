//@ts-nocheck
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { updateUserData } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/store";
import "./EditUserModal.css";

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("event.target.name: ", event.target.name);
    console.log("event.target.value: ", event.target.value);
    console.log("userToEdit before changing: ", userToEdit);
    setUserToEdit({ ...userToEdit, [name]: value });
    console.log("userToEdit: ", userToEdit);
  };

  const dispatch = useAppDispatch();

  const saveDataHandler = () => {
    closeModal();
    dispatch(updateUserData(userToEdit));
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">User profile</h4>
      </div>
      <div className="modal-body">
        <label htmlFor="Name" className="modalLabel">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            className="modalInput"
            value={userToEdit.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Gender" className="modalLabel">
          Gender:
          <input
            type="text"
            id="gender"
            name="gender"
            className="modalInput"
            onChange={handleChange}
            value={userToEdit.gender}
          />
        </label>
        <label htmlFor="Email" className="modalLabel">
          Email:
          <input
            type="text"
            id="email"
            name="email"
            className="modalInput"
            value={userToEdit.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Phone" className="modalLabel">
          Phone:
          <input
            type="text"
            id="phone"
            name="phone"
            className="modalInput"
            value={userToEdit.phone}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Location" className="modalLabel">
          Location:
          <input
            type="text"
            id="location"
            name="location"
            className="modalInput"
            value={userToEdit.location}
            onChange={handleChange}
          />
        </label>
        <button onClick={saveDataHandler}>Save</button>
      </div>
    </div>
  );
};
