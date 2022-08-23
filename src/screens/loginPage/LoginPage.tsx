import "./LoginPage.css";

export const LoginPage: React.FC = () => {
  return (
    <div className="pageStyles">
      <div className="loginWrapper">
        <div className="formWrapper">
          <form className="form">
            <h1 className="formHeader">Welcome!</h1>
            <div className="inputForm">
              <input type="email" placeholder="Email"className="input"/>
              <input type="password" placeholder="Password" className="input"/>
              <input type="submit" value="Login" className="button" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
