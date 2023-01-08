import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addNewUser, updateUserData } from '../../redux/userSlice';
import './UserModal.scss';
import { Button } from '../Buttons/Button/Button';
import upload from '../../assets/upload.png';
import { UserActions } from '../../types/userTypes';

const saveDataActions = {
  [UserActions.Edit]: updateUserData,
  [UserActions.Add]: addNewUser,
};

interface UserModalProps {
  userIdToEdit?: string;
  closeModal: () => void;
  type: UserActions;
}

const emptyUserData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  picture: {
    large: '',
  },
};

const imageMimeType = /image\/(png|jpg|jpeg)/i;

export const UserModal = ({ userIdToEdit, closeModal, type }: UserModalProps) => {
  const dispatch = useAppDispatch();

  const selectedUser = useAppSelector((state) =>
    state.contacts.users.find((user) => user.id === userIdToEdit),
  );

  const [userData, setUserData] = useState(
    type === UserActions.Edit ? selectedUser || emptyUserData : emptyUserData,
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const [file, setFile] = useState<File | null>(null);
  const [fileDataURL, setFileDataURL] = useState<ArrayBuffer | string | null>(null);

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert('Image mime type is not valid');
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target) {
          const { result } = e.target;
          if (result && !isCancel) {
            setFileDataURL(result);
            setUserData({ ...userData, picture: { large: String(result) } });
          }
        }
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, userData]);

  const saveDataHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(saveDataActions[type]({ ...userData }));

    closeModal();
  };

  const modalTitle = {
    [UserActions.Edit]: 'User profile',
    [UserActions.Add]: 'New User',
  };

  return (
    <div className="modal-content">
      <div className="edit-modal-header">
        <p className="modal-title">{modalTitle[type]}</p>
      </div>
      <div className="modal-body">
        <form onSubmit={saveDataHandler}>
          {type === UserActions.Add &&
            (fileDataURL ? (
              <div className="img-preview-wrapper">
                {<img src={String(fileDataURL)} alt="preview" />}
              </div>
            ) : (
              <label htmlFor="file" className="modal-label upload">
                <img src={upload} alt="Upload avatar" className="upload-image" />
                <input
                  type="file"
                  id="file"
                  name="image"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleUploadFile}
                />
              </label>
            ))}
          <label htmlFor="Name" className="modal-label">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              className="modal-input"
              value={userData.name}
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
              value={userData.email}
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
              value={userData.phone}
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
              value={userData.location}
              onChange={handleChange}
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
