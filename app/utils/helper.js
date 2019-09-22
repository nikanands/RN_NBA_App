import AsyncStorage from '@react-native-community/async-storage';

export const setTokens = (value, redirectFunc) => {
  const dateNow = new Date();
  const expiration = dateNow.getTime() + 3600 * 2000;

  AsyncStorage.multiSet([
    ['@nba_app@token', value.token],
    ['@nba_app@refreshToken', value.refreshToken],
    ['@nba_app@expirationToken', expiration.toString()],
    ['@nba_app@uid', value.uid],
  ]).then(response => {
    return redirectFunc();
  });
};

export const getTokens = getTokensFunc => {
  AsyncStorage.multiGet([
    '@nba_app@token',
    '@nba_app@refreshToken',
    '@nba_app@expirationToken',
    '@nba_app@uid',
  ]).then(values => {
    return getTokensFunc(values);
  });
};

export const convertFirebaseData = data => {
  const newData = [];

  for (let key in data) {
    newData.push({
      ...data[key],
      id: key,
    });
  }
  return newData;
};

export const findTeamData = (id, teams) => {
  const value = teams.find(team => {
    return team.id === id;
  });
  return value;
};