import React, { Fragment, useEffect } from "react";

import { Button } from "@material-ui/core";
import { auth } from "../../../config/firebase";
import {
  openModal,
  signUpUser,
  openLoginModal,
} from "../../../actions/login_actions";

import { connect } from "react-redux";

function LoginButtons({ authUser, openModal, openLoginModal, signUpUser }) {
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        signUpUser(authUser);
        if (authUser.displayName) {
          //don't update
        } else {
        }
      } else {
        //logged off
        signUpUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, [signUpUser]);

  return (
    <Fragment>
      {authUser ? (
        <Button onClick={() => auth.signOut()}>Log out</Button>
      ) : (
        <div style={{ marginRight: "15px" }}>
          <Button onClick={() => openLoginModal(true)}>Sign In</Button>
          <Button onClick={(e) => openModal(true)}>Sign Up</Button>
        </div>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  authUser: state.login_reducer.authUser,
});

export default connect(mapStateToProps, {
  openModal,
  signUpUser,
  openLoginModal,
})(LoginButtons);
