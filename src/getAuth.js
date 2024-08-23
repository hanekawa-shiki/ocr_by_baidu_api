import { getAuth } from './src/api/index.js';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// 获取auth
const AuthData = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  grant_type: 'client_credentials'
};

export const getAuth = async () => {
  try {
    const { access_token } = await getAuth(AuthData);
    return Promise.resolve(access_token);
  } catch (error) {
    return Promise.reject('getAuth错误', error);
  }
};
