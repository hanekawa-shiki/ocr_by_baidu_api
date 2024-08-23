import axios from '../utils/request.js';

export const getAuth = params => {
  return axios({
    method: 'POST',
    url: 'https://aip.baidubce.com/oauth/2.0/token',
    params
  });
};

export const getOcrData = ({ params, data }) => {
  return axios({
    method: 'POST',
    url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/receipt',
    params,
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};
