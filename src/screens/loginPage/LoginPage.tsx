import { SyntheticEvent, FC } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background from "../../assets/background.jpg";
import "./LoginPage.scss";

export const LoginPage: FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      axios({
        method: "GET",
        url: "http://localhost:3000/login",
      }).then((response) => {
        if (response.data.success) {
          navigate("/contacts");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="page">
      <div className="login-wrapper">
        <img src={background} alt="Login form background" />
        <div className="form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="form-header">Welcome</h1>
            <div>
              <input
                className="form-input login"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                className="form-input password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <input type="submit" value="Login" className="login-button" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
