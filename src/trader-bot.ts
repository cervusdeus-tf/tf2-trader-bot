import RedisServer from 'redis-server';
import SteamAPI from 'steamapi';
import 'dotenv/config';

class TraderBot {
    public steamApi;
    public redisServer;
    public port: number;

    constructor(port = 6379) {
        this.steamApi = new SteamAPI(require('process').env.STEAMAPI_TOKEN);
        this.redisServer = new RedisServer(this.port);
        this.port = port;
    }

    private startRedisServer(): void {
        this.redisServer.open().then(err => {
            if (err === null) {
                console.log(`Redis Server listening on http://localhost:${this.port}`);
            }
            else {
                console.error(err.stack);
            }
        });
    }

    private stopRedisServer(): void {
        this.redisServer.close().then(() => {
            console.log('Redis Server shutting down gracefully... Press Ctrl-C to forcefully exit.');
        });
    }

    public start() {
        this.startRedisServer();
    }
}

export default TraderBot;
