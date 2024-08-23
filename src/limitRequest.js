import { getOcrData } from './src/api/index.js';

// 创建一个 promiseMaker 函数，用于生成请求的 Promise
const promiseMaker = url => {
  return () => getOcrData(url);
};

// 并发请求的控制函数
export const limitConcurrentRequests = (urls, maxConcurrent) => {
  const result = [];
  let index = 0;

  // 创建一个辅助函数用于递归调用请求
  function next() {
    if (index >= urls.length) {
      // 当所有请求完成后返回结果
      return Promise.resolve();
    }

    // 当前请求索引
    const currentIndex = index++;
    const makeRequest = urls[currentIndex];

    // 执行请求
    return makeRequest()
      .then(response => {
        // 存储请求结果
        result[currentIndex] = response.data;
        // 递归调用，继续处理下一个请求
        return next();
      })
      .catch(error => {
        // 处理请求错误
        result[currentIndex] = error;
        return next();
      });
  }

  // 创建 `maxConcurrent` 个初始并发请求
  const tasks = [];
  for (let i = 0; i < maxConcurrent; i++) {
    tasks.push(next());
  }

  // 等待所有请求完成
  return Promise.all(tasks).then(() => result);
};

// 使用示例
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3',
  'https://api.example.com/data4',
  'https://api.example.com/data5'
].map(url => promiseMaker(url));

limitConcurrentRequests(urls, 2)
  .then(results => {
    console.log('请求结果:', results);
  })
  .catch(error => {
    console.error('请求出错:', error);
  });
