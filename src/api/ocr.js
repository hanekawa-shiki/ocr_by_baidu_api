const axios = require('axios');

const ocrApi = (access_token = '24.55245969f2880db2a4bed08d91dbc091.2592000.1671457848.282335-28521755',data) => {
  const options = {
    method: 'POST',
    url: `https://aip.baidubce.com/rest/2.0/ocr/v1/receipt?access_token=${access_token}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    },
    data,
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

module.exports = ocrApi;
