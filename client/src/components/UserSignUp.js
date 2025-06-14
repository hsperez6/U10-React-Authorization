import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<
import ThemeContext from "../context/ThemeContext";

const UserSignIn = () => {
  const { accentColor } = useContext(ThemeContext);
  const navigate = useNavigate();  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // State
  const name = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // event handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      name: name.current.value,
      username: username.current.value,
      password: password.current.value,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(user),
    };

    try {                   //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      const response = await fetch( "http://localhost:5000/api/users", fetchOptions);
  
      if ( response.status === 201 ) {
        console.log(`${user.username} is successfully signed up and authenticated`)
      } else if ( response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      } else {
        throw new Error();
      };

    } catch (error) {
      console.log(error);   
      navigate("/error");

    };


  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/")
  };

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign up</h1>
        <div>
          {errors.length ? (
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
          <form onSubmit={handleSubmit}>
            <input
              id="name"
              name="name"
              type="text"
              ref={name}
              placeholder="Name"
            />
            <input
              id="username"
              name="username"
              type="text"
              ref={username}
              placeholder="User Name"
            />
            <input
              id="password"
              name="password"
              type="password"
              ref={password}
              placeholder="Password"
            />
            <div className="pad-bottom">
              <button
                className="button"
                type="submit"
                style={{ background: accentColor }}
              >
                Sign up
              </button>
              <button
                className="button button-secondary"
                style={{ color: accentColor }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <p>
          Already have a user account?{" "}
          <Link style={{ color: accentColor }} to="/signin">
            Click here
          </Link>{" "}
          to sign in!
        </p>
      </div>
    </div>
  );
};

export default UserSignIn;
