import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({
    path: path.resolve(__dirname, '../../', '.env')
});

export default {
    tokenKey: process.env.TOKEN_KEY,
    port: process.env.PORT,
    isProdEnv: process.env.NODE_ENV === 'production',
    isTestingEnv: process.env.NODE_ENV === 'testing',
    forceShutdownTimeout: 30000,
    forceSocketTerminationTimeout: 10000,
};
