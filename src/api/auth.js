const axios = require('axios');

const getAuth = () => {
  const client_id = 'mIELsuwRcUDLGGiqea82olEB';
  const client_secret = 'hxGVQqdls5A35tQSedpF5IzLl6BVDq4U';
  const options = {
    method: 'POST',
    url: `https://aip.baidubce.com/oauth/2.0/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        const { status } = res;
        if (status !== 200) {
          return reject(res);
        }
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = getAuth;
