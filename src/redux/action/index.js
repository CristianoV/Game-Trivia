export const setHash = (payload) => ({
  type: 'SET_HASH',
  payload,
});

export const actionLogin = (payload) => ({
  type: 'CHANGE_LOGIN',
  payload,
});

export const actionSetToken = (payload) => ({
  type: 'SET_TOKEN',
  payload,
});

export const actionSumScore = (payload) => ({
  type: 'SUM_SCORE',
  payload,
});

export const actionSumAcertion = () => ({
  type: 'SUM_ACERTION',
  payload: 1,
});

export const fetchToken = () => async (dispatch) => {
  const request = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  );
  const json = await request.json();
  const result = json.token;
  dispatch(actionSetToken(result));
};
