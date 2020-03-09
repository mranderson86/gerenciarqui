// Estado dos Projetos
const INITIAL_STATE = {
  project: {},
  step: {},
  budget: {},
  payment: {}
};

function projectReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_PROJECT': {
      const { project } = action.payload;
      return { ...state, project };
    }
    case 'UPDATE_STEP': {
      const { step } = action.payload;
      return { ...state, step };
    }
    case 'UPDATE_BUDGET': {
      const { budget } = action.payload;
      return { ...state, budget };
    }
    case 'UPDATE_PAYMENT': {
      const { payment } = action.payload;
      return { ...state, payment };
    }
    default:
      return state;
  }
}

export default projectReducer;
