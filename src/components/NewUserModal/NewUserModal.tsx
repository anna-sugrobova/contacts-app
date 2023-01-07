import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { addNewUser } from '../../redux/userSlice';
import { Button } from '../Buttons/Button/Button';
import upload from '../../assets/upload.png';
import '../EditUserModal/EditUserModal.scss';

interface NewUserModalProps {
  closeModal: () => void;
}

export const NewUserModal = ({ closeModal }: NewUserModalProps) => {
  const dispatch = useAppDispatch();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    picture: {
      large: '',
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileDataURL, setFileDataURL] = useState<ArrayBuffer | string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const saveDataHandler = () => {
    dispatch(
      addNewUser({
        ...newUser,
        picture: {
          large: fileDataURL,
        },
      }),
    );
    closeModal();
  };
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

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
  }, [file]);

  return (
    <div className="modal-content">
      <div className="edit-modal-header">
        <p className="modal-title">New user</p>
      </div>
      <div className="modal-body">
        <form onSubmit={saveDataHandler}>
          {fileDataURL ? (
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
          )}
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
