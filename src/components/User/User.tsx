import { FC, useCallback } from 'react';
import { deleteUser } from '../../redux/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import { Button } from '../Buttons/Button/Button';
import { CloseButton } from '../Buttons/CloseButton/CloseButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SvgIcon from '@mui/material/SvgIcon';
import './User.scss';

interface UserProps {
  id: string;
  name: string;
  gender: string;
  location: string;
  src: string;
  email: string;
  phone: string;
  onEdit: (id: string) => void;
}

export const User: FC<UserProps> = ({ id, src, name, location, email, phone, onEdit }) => {
  const dispatch = useAppDispatch();

  const handleDeleteUser = useCallback(() => {
    dispatch(deleteUser({ id }));
  }, [id, dispatch]);

  return (
    <div className="card-wrapper">
      <div className="photo-wrapper">
        <img src={src} alt="Profile background" className="user-image" />
      </div>
      <CloseButton onClick={handleDeleteUser} />
      <div className="personal-description">
        <p className="user-name">{name}</p>
        <div className="user-data-container">
          <SvgIcon>
            <PhoneIcon />
          </SvgIcon>
          <p className="user-data-text">{phone}</p>
        </div>
        <div className="user-data-container">
          <SvgIcon>
            <MailOutlineIcon />
          </SvgIcon>
          <p className="user-data-text">{email}</p>
        </div>
        <div className="user-data-container">
          <SvgIcon>
            <LocationOnIcon />
          </SvgIcon>
          <p className="user-data-text">{location}</p>
        </div>
      </div>
      <Button onClick={() => onEdit(id)} value="Edit" isIcon>
        Edit
      </Button>
    </div>
  );
};
