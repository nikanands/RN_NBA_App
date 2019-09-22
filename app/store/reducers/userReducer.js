const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        auth: {
          uid: action.payload.localId || false,
          token: action.payload.idToken || false,
          refreshToken: action.payload.refreshToken || false,
        },
      };
    case 'SIGN_UP':
      return {
        ...state,
        auth: {
          uid: action.payload.localId || false,
          token: action.payload.idToken || false,
          refreshToken: action.payload.refreshToken || false,
        },
      };
    case 'AUTO_SIGN_IN':
      return {
        ...state,
        auth: {
          uid: action.payload.user_id || false,
          token: action.payload.id_token || false,
          refreshToken: action.payload.refresh_token || false,
        },
      };
    default:
      return state;
  }
};

export default userReducer;