import ClearIcon from "@mui/icons-material/Clear";
import SvgIcon from "@mui/material/SvgIcon";
import { useCallback } from "react";
import { deleteUser } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/store";
import "./User.css";

interface UserProps {
  id: string;
  name: { title: string; first: string; last: string };
  gender: string;
  location: { city: string; country: string; postcode: string };
  src: string;
  email: string;
  phone: string;
}

export const User: React.FC<UserProps> = ({
  id,
  src,
  name,
  location,
  gender,
  email,
  phone,
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
      <div className="personalDesc">
        <p className="userFullName">
          <b>Name:</b> {name.title} {name.first} {name.last}
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
