import ClearIcon from "@mui/icons-material/Clear";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SvgIcon from "@mui/material/SvgIcon";
import { useCallback } from "react";
import { deleteUser } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/store";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "./User.scss";

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

export const User: React.FC<UserProps> = ({
  id,
  src,
  name,
  location,
  email,
  phone,
  onEdit,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteUser = useCallback(() => {
    dispatch(deleteUser({ id }));
  }, [id, dispatch]);

  return (
    <div className="wrapper">
      <div className="photo-wrapper">
        <img src={src} alt="Profile background" className="user-image" />
      </div>
      <button className="delete-icon" onClick={handleDeleteUser}>
        <SvgIcon>
          <ClearIcon />
        </SvgIcon>
      </button>
      <div className="personal-description">
        <h3 className="user-name">{name}</h3>
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
      <button className="edit-user-button" onClick={() => onEdit(id)}>
        Edit
        <SvgIcon className="edit-icon">
          <EditOutlinedIcon />
        </SvgIcon>
      </button>
    </div>
  );
};
