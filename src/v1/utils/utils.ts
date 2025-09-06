import fs from "fs";

export function getFileSize(filePath: string): number {
  const stats = fs.statSync(filePath);
  return stats.size;
}
export function isTokenExpired(expiresAt: string): boolean {
  // Parse the 'expires_at' string into a Date object (assuming it's an ISO 8601 string)
  const expiresAtDate = new Date(expiresAt);

  // Get the current date and time
  const now = new Date();

  // Compare the current date with the expiration date
  if (now > expiresAtDate) {
    return true;
  }
  return false;
}

export const generateAuthChannel = (group: string, user_id: string) =>
  `${group}_${user_id}`;
