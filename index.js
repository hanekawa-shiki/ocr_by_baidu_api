import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { traverseDirectory, convertFilesToBase64 } from './src/handleOriginData.js';
import { getAuth } from './src/getAuth.js';
import { getResult } from './src/getResult.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const directoryToTraverse = path.join(__dirname, './demo'); // Replace with your target directory
const outputFilePath = path.join(__dirname, './result/output.json'); // Replace with your desired output file path
const fileExtensions = ['.png', 'jpeg', 'jpg']; // Replace with the file extensions you want to include

const main = async () => {
  try {
    // 1.数据原始处理
    const fileUrls = await traverseDirectory(directoryToTraverse, outputFilePath, fileExtensions);
    await convertFilesToBase64(outputFilePath);
    // 2.批量ocr识别
    const access_token = await getAuth();
    const result = await getResult({ fileUrls, access_token });
  } catch (error) {
    console.log('程序报错：', error);
  }
};

main();
