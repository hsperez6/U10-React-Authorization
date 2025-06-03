import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link className="signup" to="/signup">Sign up</Link>
      <Link className="signin" to="/signin">Sign in</Link>
    </nav>
  );
}

export default Nav;