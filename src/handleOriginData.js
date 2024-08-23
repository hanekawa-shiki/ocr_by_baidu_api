import { promises as fs } from 'fs';
import path from 'node:path';

export const traverseDirectory = async (directory, outputFile, extensions) => {
  const outputDir = path.dirname(outputFile);

  // 确保输出目录存在，不存在创建
  await fs.mkdir(outputDir, { recursive: true });

  let filePaths = [];

  async function traverse(dir) {
    try {
      const files = await fs.readdir(dir, { withFileTypes: true });

      for (const file of files) {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
          await traverse(filePath);
        } else {
          const fileExtension = path.extname(file.name).toLowerCase();
          if (extensions.includes(fileExtension)) {
            filePaths.push(filePath);
          }
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${dir}:`, err);
    }
  }
  // 递归遍历目标文件夹
  await traverse(directory);

  // 结果写入文件
  await fs.writeFile(outputFile, JSON.stringify(filePaths, null, 2));
  console.log(`读取文件目录完成，结果写入：${outputFile}`);

  return Promise.resolve(filePaths);
};

export const convertFilesToBase64 = async jsonFilePath => {
  try {
    // 读取包含文件路径的 JSON 文件
    const data = await fs.readFile(jsonFilePath, 'utf-8');
    const filePaths = JSON.parse(data);

    // 确保 filePaths 是一个数组
    if (!Array.isArray(filePaths)) {
      throw new Error('JSON 文件的内容应为文件路径的数组');
    }

    // 遍历每个文件路径
    for (const filePath of filePaths) {
      try {
        // 读取文件内容
        const fileContent = await fs.readFile(filePath);

        // 将文件内容转换为 Base64
        const base64Content = Buffer.from(fileContent).toString('base64');

        // 构建输出目录和文件路径
        const dirName = path.dirname(filePath);
        const baseName = path.basename(filePath, path.extname(filePath));
        const outputDir = path.join(dirName, 'json');
        const outputFilePath = path.join(outputDir, `${baseName}.json`);

        // 确保输出目录存在
        await fs.mkdir(outputDir, { recursive: true });

        // 准备要写入的 JSON 数据
        const outputData = {
          fileName: path.basename(filePath),
          base64Content
        };

        // 将 Base64 内容写入到 JSON 文件
        await fs.writeFile(outputFilePath, JSON.stringify(outputData, null, 2));
        // console.log(`成功将文件转换并保存到: ${outputFilePath}`);
      } catch (error) {
        return Promise.reject({ msg: `处理文件 ${filePath} 时出错:`, error });
      }
    }
  } catch (error) {
    return Promise.reject({ msg: `读取或解析 JSON 文件 ${jsonFilePath} 时出错:`, error });
  }
};
