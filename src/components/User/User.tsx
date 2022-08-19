interface UserProps {
  username: string;
  name: string;
  bio: string;
  location: string;
  profile: string;
  src: string;
}

export const User: React.FC<UserProps> = ({
  src,
  username,
  name,
  profile,
  bio,
  location,
}) => {
  return (
    <div className="wrapper">
      <div className="personalDesc">
        <p>Username: {username}</p>
        <p>Name: {name}</p>
        <p>Location: {location ? location : "Somewhere"}</p>
        <p>Bio: {bio ? bio : "The user hasn't written a bio 😒"}</p>
      </div>
      <div className="viewProfileWrapper">
        <img src={src} alt="Profile background" className="userImage" />
        <a
          href={`${profile}`}
          target="_blank"
          rel="noreferrer"
          className="profileLink"
        >
          View profile
        </a>
      </div>
    </div>
  );
};
