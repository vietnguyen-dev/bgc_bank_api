import { createClient,  RedisClientType } from 'redis';
import * as dotenv from 'dotenv';

dotenv.config();

// client vs pool?
const redisClient: RedisClientType = createClient({
    url: process.env.REDIS_URL,
});

// redisClient.connect().catch(console.error)

export default redisClient