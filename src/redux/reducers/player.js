const INITIAL_STATE = {
  name: '',
  assertion: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE_LOGIN':
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default player;
