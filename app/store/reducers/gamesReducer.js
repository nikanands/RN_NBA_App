const gamesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_GAMES': 
      return {...state, games: action.payload};
    default:
      return state;
  }
};

export default gamesReducer;