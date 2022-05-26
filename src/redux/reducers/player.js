const INITIAL_STATE = {
  name: '',
  assertion: '',
  score: 0,
  hash: '',
  gravatarEmail: '',
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE_LOGIN':
    return { ...state, ...action.payload };
  case 'SET_HASH':
    return { ...state, hash: action.payload };
  case 'SUM_SCORE':
    return { ...state, score: state.score + action.payload };
  default:
    return state;
  }
};

export default player;
