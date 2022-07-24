import React from "react";
import { useHistory } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import HighlightIcon from "@material-ui/icons/Highlight";
// import Logout from '@material-ui/icons/ExitToApp';

function Header() {
  const isLogin = useSelector(state => state.isLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  function hndleClick(){
    window.localStorage.removeItem("Token");
    dispatch({ type: 'LoggedOut' });
    history.push("/");
  }
  return (
    <header>
      <h1 className="keeperLogo">
        <HighlightIcon />
        Keeper
      </h1>
      {isLogin&& <button onClick={hndleClick} className="logoutBtn">Logout</button>}
    </header>
  );
}

export default Header;
