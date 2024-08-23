export const getResult = async ({ fileUrls, access_token }) => {
  // 确保 fileUrls 是一个数组
  if (!Array.isArray(fileUrls)) {
    throw new Error('JSON 文件的内容应为文件路径的数组');
  }
};
