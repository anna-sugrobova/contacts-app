import './User.css';

interface UserProps {
  name: {title: string, first: string, last: string},
  gender: string,
  location: { city: string, country: string, postcode: string },
  src: string,
  email: string,
  phone: string,
}

export const User: React.FC<UserProps> = ({
  src,
  name,
  location,
  gender,
  email,
  phone
}) => {
  return (
    <div className="wrapper">
      <div className="personalDesc">
        <p>Name: {name.title} {name.first} {name.last}</p>
        <p>Gender: {gender}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Location: {location.city}, {location.country}, {location.postcode}</p>
      </div>
      <div className="viewProfileWrapper">
        <img src={src} alt="Profile background" className="userImage" />
      </div>
    </div>
  );
};
