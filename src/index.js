import express from 'express';
import config from '../src/config/';
import expressConfig from './config/expressconfigs';

const ports = config.PORT || 5050;

const app = express();
expressConfig(app);

app.listen(ports);

global.logger.info(`Parakeet API started on port ${ports}`);

export default app;
