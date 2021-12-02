import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/redux/auth/auth.action";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <nav style={{ marginBottom: 20 }}>
      <h1 className="logo-text" onClick={() => history.push("/")}>
        City News
      </h1>
      <div className="nav-menu">
        <NavLink exact activeClassName={"active"} to="/blogs">
          Blogs
        </NavLink>
        <NavLink activeClassName={"active"} to="/blogs/create">
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