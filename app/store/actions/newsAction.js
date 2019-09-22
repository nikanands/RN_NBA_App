import axios from 'axios';
import {FIREBASEURL} from '../../utils/urlSchema';

export const getNewsAction = () => {
  const request = axios({
    method: 'GET',
    url: `${FIREBASEURL}/news.json`,
  })
    .then(response => {
      let articles = [];
      for (let key in response.data) {
        articles.push({
          ...response.data[key],
          id: key,
        });
      }
      return articles;
    })
    .catch(err => {
      return false;
    });

  return {
    type: 'GET_NEWS',
    payload: request,
  };
};
