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
        <p className='userFullName'><b>Name:</b> {name.title} {name.first} {name.last}</p>
        <p className='userGender'><b>Gender:</b> {gender}</p>
        <p><b>Email:</b> {email}</p>
        <p><b>Phone:</b> {phone}</p>
        <p><b>Location:</b> {location.city}, {location.country}, {location.postcode}</p>
      </div>
      <div className="userPhotoWrapper">
        <img src={src} alt="Profile background" className="userImage" />
      </div>
    </div>
  )
}
