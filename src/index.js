import express from 'express';
import config from '../src/config/config';
import expressConfig from './config/expressconfigs';
import logger from './config/logger';

const ports = config.PORT || 5050;

const app = express();
expressConfig(app);

app.listen(ports);

let info = logger();

info.info(`Parakeet API started on port ${ports}`);

export default app;
