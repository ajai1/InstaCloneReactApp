import React, { Fragment } from "react";
import LoginButtons from "./LoginButtons/LoginButtons";

import {
  openModal,
  signUpUser,
  openLoginModal,
} from "../../actions/login_actions";
import LoginModal from "../Modal/LoginModal";
import { connect } from "react-redux";

//css
import "../../App.css";

function HeaderComponent({
  authUser,
  setAuthUser,
  openModal,
  isOpenModal,
  signUpUser,
  openLoginModalState,
  openLoginModal,
}) {
  const closeModal = () => {
    openModal(false);
    openLoginModal(false);
  };
  return (
    <Fragment>
      {isOpenModal || openLoginModalState ? (
        <LoginModal isOpen={true} closeModal={closeModal} />
      ) : null}

      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
          className="app__headerImage"
        />
        <LoginButtons></LoginButtons>
      </div>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  authUser: state.login_reducer.authUser,
  isOpenModal: state.login_reducer.openModal,
  openLoginModalState: state.login_reducer.openLoginModal,
});
export default connect(mapStateToProps, {
  openModal,
  signUpUser,
  openLoginModal,
})(HeaderComponent);
