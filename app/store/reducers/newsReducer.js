const newsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_NEWS':
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};

export default newsReducer;