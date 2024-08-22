import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import traverseDirectory from './src/readfile.js';
import { getAuth, getOcrData } from './src/api/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// 1.数据处理 image => base64
//  递归遍历
// 2.接口请求
// 3.处理返回值

const directoryToTraverse = './demo'; // Replace with your target directory
const outputFilePath = path.join(__dirname, './result/output.txt'); // Replace with your desired output file path
const fileExtensions = ['.png', 'jpeg', 'jpg']; // Replace with the file extensions you want to include

traverseDirectory(directoryToTraverse, outputFilePath, fileExtensions).catch(err =>
  console.error('Error during directory traversal:', err)
);

// 获取auth
// const AuthData = {
//   client_id: CLIENT_ID,
//   client_secret: CLIENT_SECRET,
//   grant_type: 'client_credentials'
// };
// const main = async () => {
//   try {
//     const { access_token } = await getAuth(AuthData);
//   } catch (error) {
//     console.error(error);
//   }
// };

// main();
