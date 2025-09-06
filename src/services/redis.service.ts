import RedisClient from "../v1/config/redis-client";

class RedisService {
  async getFormattedPermissions(userId: string): Promise<string[]> {
    const key = `${process.env.REDIS_USER_PERMISSIONS}${userId}`;
    const data = await RedisClient.get(key);

    if (!data) return [];

    return JSON.parse(data);
  }
}

// Export a single instance
const redisServiceInstance = new RedisService();
export default redisServiceInstance;
