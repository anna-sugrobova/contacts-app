import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
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
    <div className="pageStyles">
      <div className="loginWrapper">
        <div className="formWrapper">
          <form className="loginForm" onSubmit={handleSubmit}>
            <h1 className="formHeader">Welcome</h1>
            <div>
              <input
                className="loginFormInput login"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                className="loginFormInput password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <input type="submit" value="Login" className="loginBtn" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
