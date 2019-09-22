import axios from 'axios';
import Moment from 'moment';

import {FIREBASEURL} from '../../utils/urlSchema';
import {convertFirebaseData, findTeamData} from '../../utils/helper';

export const gamesAction = () => {
  const promise = new Promise((resolve, reject) => {
    const request = axios({
      method: 'GET',
      url: `${FIREBASEURL}/teams.json`,
    })
      .then(res => {
        const teams = convertFirebaseData(res.data);

        axios({
          method: 'GET',
          url: `${FIREBASEURL}/games.json`,
        }).then(res => {
          const articles = convertFirebaseData(res.data);

          const responseData = [];

          for (let key in articles) {
            responseData.push({
              ...articles[key],
              awayData: findTeamData(articles[key].away, teams),
              localData: findTeamData(articles[key].local, teams),
            });
          }
          resolve(responseData);
        });
      })
      .catch(err => {
        reject(false);
      });
  });
  return {
    type: 'GET_GAMES',
    payload: promise,
  };
};
