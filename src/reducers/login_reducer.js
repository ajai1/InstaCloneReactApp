import { LOGIN, SIGNUP, OPEN_MODAL, OPEN_LOGIN_MODAL } from "../actions/types";

const initialState = {
  isloggedIn: false,
  openModal: false,
  openLoginModal: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case SIGNUP:
      return {
        ...state,
        isloggedIn: true,
        authUser: payload,
      };
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        openLoginModal: payload,
      };
    case OPEN_MODAL:
      return {
        ...state,
        openModal: payload,
      };
    default:
      return state;
  }
}
