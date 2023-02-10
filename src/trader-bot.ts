import {client} from 'infinitymint/dist/client';
import RedisServer from 'redis-server';
import SteamAPI from 'steamapi';
import 'dotenv/config';

class TraderBot {
    public steamApi;
    public redisServer;
    public redisPort: number;
    public port: number;

    constructor() {
        this.steamApi = new SteamAPI(require('process').env.STEAMAPI_TOKEN);
        this.port = port;
        this.redisServer = new RedisServer(this.port);
        this.redisPort = redisPort;
    }

    private startRedisServer(): void {
        this.redisServer.open().then(err => {
            if (err === null) {
                console.log(`Redis Server listening on http://localhost:${this.redisPort}`);
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
        this.server.listen(this.port, () => {
            console.log(`TF2 bot listening in on ${this.port}`);
        });
    }
}

export default TraderBot;
