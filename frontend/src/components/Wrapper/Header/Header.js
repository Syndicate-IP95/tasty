import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { changeMenuShowing } from "../../../store/uiSlice/uiSlice";
import { onLogOut } from "../../../store/authSlice/authSlice";

import "./header.scss";

import logo from "../../../assets/images/Main/logo.png";

const Header = ({ isMainMode, authState }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = authState.token;
  const onLogOutFunc = () => {
    dispatch(onLogOut());
    history.push("/main");
  };

  return (
    <div className="navbar">
      <div className="subHeader flex">
        {isMainMode && (
          <i
            className="fas fa-filter"
            onClick={() => dispatch(changeMenuShowing(true))}
          />
        )}
        <div className="image">
          <NavLink to="/main">
            <img src={logo} alt="Tasty" />
          </NavLink>
        </div>
        <div className="container flex">
          <div className="flex">
            {isMainMode && (
              <div id="searchBar">
                <input type="text" id="search" />
                <i className="fas fa-search" />
              </div>
            )}
            {isMainMode && isAuth && (
              <button onClick={redirectToCreateRecipe}>
                <i className="fas fa-plus"></i>
                Додати рецепт
              </button>
            )}
          </div>
          <div className="main-auth flex">
            {isAuth && (
              <NavLink
                to="/profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {authState.surname && authState.name && (
                  <p
                    style={{
                      width: "100px",
                      textAlign: "right",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {authState.surname +
                      " " +
                      authState.name[0].toUpperCase() +
                      "."}
                  </p>
                )}
                <i className="fas fa-user" />
              </NavLink>
            )}
            {!isAuth && (
              <>
                <NavLink to="/auth">
                  <button className="hide">Увійти</button>
                </NavLink>
                <div className="divider hide" />
                <NavLink to="/auth">
                  <button className="hide">Зареєструватися</button>
                </NavLink>
              </>
            )}
            {isAuth && (
              <>
                <div className="divider hide" />
                <button onClick={onLogOutFunc} className="hide">
                  Вийти
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function redirectToCreateRecipe() {
    history.push("/add-recipe");
  }
};

const mapState = (state) => ({
  authState: state.auth,
});

export default connect(mapState)(Header);
