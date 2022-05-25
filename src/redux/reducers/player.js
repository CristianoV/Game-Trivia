const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertion: '',
  score: 0,
  assertions: 0,
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
