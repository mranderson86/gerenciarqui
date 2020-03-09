// Estado do usuário
const INITIAL_STATE = {
  authenticate: false,
  profissional: false,
  token: '',
  user: {}
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_USER': {
      const { authenticate, profissional, user, token } = action.payload;
      const newState = { ...state, authenticate, profissional, user, token };
      return newState;
    }

    default:
      return state;
  }
}

export default userReducer;
