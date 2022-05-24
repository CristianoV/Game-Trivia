export default actionLogin = (state) => ({
  type: 'CHANGE_LOGIN',
  payload: state,
});

export const actionSetToken = (token) => ({
  type: 'TOKEN',
  payload: token,
});

export const fetchToken = () => async (dispatch) => {
  const request = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  );
  const json = await request.json();
  const result = json.token;
  dispatch(actionSetToken(result));
};
