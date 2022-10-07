import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import SvgIcon from "@mui/material/SvgIcon";
import { useCallback } from "react";
import { deleteUser } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/store";
import "./User.css";

interface UserProps {
  id: string;
  name: string;
  gender: string;
  location: { city: string; country: string; postcode: string };
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
  gender,
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
      <button className="deleteUserIcon" onClick={handleDeleteUser}>
        <SvgIcon>
          <ClearIcon />
        </SvgIcon>
      </button>
      <button className="editUserIcon" onClick={() => onEdit(id)}>
        <SvgIcon>
          <EditIcon />
        </SvgIcon>
      </button>
      <div className="personalDesc">
        <p className="userFullName">
          <b>Name:</b> {name}
        </p>
        <p className="userGender">
          <b>Gender:</b> {gender}
        </p>
        <p>
          <b>Email:</b> {email}
        </p>
        <p>
          <b>Phone:</b> {phone}
        </p>
        <p>
          <b>Location:</b> {location.city}, {location.country},{" "}
          {location.postcode}
        </p>
        <div className="userPhotoWrapper">
          <img src={src} alt="Profile background" className="userImage" />
        </div>
      </div>
    </div>
  );
};
