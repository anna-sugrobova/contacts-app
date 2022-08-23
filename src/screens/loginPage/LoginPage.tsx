import "./LoginPage.css";

export const LoginPage: React.FC = (props) => {
  const handleLogIn = (e) => {
    e.preventDefault()
    props.history.push('/')
  }

  return (
    <div className="pageStyles">
      <div className="loginWrapper">
        <div className="formWrapper">
          <form className="loginForm" onSubmit={handleLogIn}>
            <h1 className="formHeader">Welcome!</h1>
            <div>
              <input 
                className="loginFormInput"
                type="email" 
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                className="loginFormInput" 
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
