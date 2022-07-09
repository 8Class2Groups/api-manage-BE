import { Service } from 'egg';

/**
 * Test Service redis
 */
class DbRedis extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async set<T>(key: string, value: T, seconds?: number) {
    const { redis } = this.app;
    const strValue = JSON.stringify(value);
    if (!seconds) {
      await redis.set(key, strValue);
    } else {
      await redis.set(key, strValue, 'EX', seconds);
    }
  };

  public async get(key) {
    const { redis } = this.app;
    const data = await redis.get(key);

    if (!data) {
      return false;
    };
    return JSON.parse(data);
  }

  public async remove(key) {
    const { redis } = this.app
    return await redis.del(key)
  }
}

export default DbRedis;
