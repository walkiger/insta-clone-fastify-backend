import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";

export const fileStorageService = {
  async saveImage(
    fileBuffer: Buffer,
    originalFilename: string,
  ): Promise<string> {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileExtension = path.extname(originalFilename);
    const uniqueFilename = `${randomUUID()}${fileExtension}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    await fs.writeFile(filePath, fileBuffer);
    const baseUrl = process.env.PUBLIC_BASE_URL || "http://localhost:3000";
    return `${baseUrl}/uploads/${uniqueFilename}`;
  },
};


