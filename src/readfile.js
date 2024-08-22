import { promises as fs } from 'fs';
import path from 'node:path';

async function traverseDirectory(directory, outputFile, extensions) {
  const outputDir = path.dirname(outputFile);

  // Ensure the output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Clear the output file by writing an empty string
  await fs.writeFile(outputFile, '');

  const writeStream = await fs.open(outputFile, 'w');

  async function traverse(dir) {
    try {
      const files = await fs.readdir(dir, { withFileTypes: true });

      for (const file of files) {
        const filePath = path.join(dir, file.name);

        if (file.isDirectory()) {
          await traverse(filePath); // Recurse into the directory
        } else {
          const fileExtension = path.extname(file.name).toLowerCase();
          if (extensions.includes(fileExtension)) {
            await writeStream.write(filePath + '\n'); // Write file path to the output file
          }
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${dir}:`, err);
    }
  }

  // Start traversing from the root directory
  await traverse(directory);

  // Close the write stream when done
  await writeStream.close();
  console.log(`Directory traversal completed. Results saved to ${outputFile}`);
}

export default traverseDirectory;
