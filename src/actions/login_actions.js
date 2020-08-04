import { LOGIN, SIGNUP, OPEN_MODAL, OPEN_LOGIN_MODAL } from "./types";

export const loginUser = () => {};

export const signUpUser = (authUser) => (dispatch) => {
  dispatch({
    type: SIGNUP,
    payload: authUser,
  });
};

export const openModal = (open) => (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    payload: open,
  });
};

export const openLoginModal = (open) => (dispatch) => {
  dispatch({
    type: OPEN_LOGIN_MODAL,
    payload: open,
  });
};

export const logOutUser = () => {};
