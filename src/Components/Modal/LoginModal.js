import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import { Button } from "@material-ui/core";

import "./LoginModal.css";
import { auth } from "../../config/firebase";

//actions
import {
  signUpUser,
  openLoginModal,
  openModal,
} from "../../actions/login_actions";

import { connect } from "react-redux";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function LoginModal({
  signUpUser,
  isOpen,
  closeModal,
  openLoginModalState,
  openLoginModal,
  openModal,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //logged in
        console.log(authUser);
        setUser(authUser);
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
  }, [user, username, signUpUser]);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    openModal(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    openLoginModal(false);
  };

  return (
    <div>
      <Modal open={isOpen} onClose={closeModal}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
              alt=""
              className="login_headerImage"
            />
          </center>
          <form className="login__signup">
            {openLoginModalState ? null : (
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
            )}
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            {user ? (
              <Button onClick={() => auth.signOut()}>Sign out</Button>
            ) : openLoginModalState ? (
              <Button onClick={signIn}>Sign In</Button>
            ) : (
              <Button onClick={signUp}>Sign Up</Button>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  openLoginModalState: state.login_reducer.openLoginModal,
});

export default connect(mapStateToProps, {
  signUpUser,
  openLoginModal,
  openModal,
})(LoginModal);
