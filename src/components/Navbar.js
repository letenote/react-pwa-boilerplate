import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/redux/auth/auth.action";
import NetflixLogo from './icons/NetflixLogo';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <nav style={{ marginBottom: 20 }} className={'nav-wrap'}>
      <div className="logo" onClick={() => history.push("/")}>
        <NetflixLogo/>
      </div>
      <div className="nav-menu">
        <NavLink exact activeClassName={"active"} to="/film">
          Film
        </NavLink>
        <NavLink activeClassName={"active"} to="/film/create">
          Create
        </NavLink>
        <button
          type="button"
          className="btn btn-warning"
          style={{
            marginLeft: 15,
            cursor: "pointer",
          }}
          onClick={() => {
            userLogout(dispatch).then(() => history.push("/login"));
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;